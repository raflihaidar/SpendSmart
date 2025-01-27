import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NuxtAuthHandler } from "#auth";
import { prisma } from "../../database/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { RESPONSE_CODE } from "~/server/app/common/code";
import { compare } from "bcrypt";

const runtime = useRuntimeConfig();
const prismaAdapter = PrismaAdapter(prisma);

// @ts-ignore
prismaAdapter.createUser = (data) => {
  return prisma.user.create({
    data: {
      ...data,
      financial_record: {
        create: {
          income: 0,
          expense: 0,
          balance: 0,
        },
      },
    },
  });
};

export default NuxtAuthHandler({
  adapter: prismaAdapter,
  secret: useRuntimeConfig().authSecret,
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        console.log("user : ", user);
        token.id = user.id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }: { session: any; token: any }) => {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: runtime.googleId,
      clientSecret: runtime.googleSecret,
      profile(profile: any) {
        return {
          id: profile.sub,
          name: profile.name,
          username: profile.given_name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    FacebookProvider.default({
      clientId: process.env.NUXT_FACEBOOK_ID,
      clientSecret: process.env.NUXT_FACEBOOK_SECRET,
      profile(profile: any) {
        console.log("profile :", profile);
        const { string: url } = profile.picture.data;
        return {
          id: profile.id,
          name: profile.name,
          username: profile.name.split(" ")[0],
          email: profile.email,
          image: url,
        };
      },
    }),
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "credentials",
      credentials: {},
      async authorize(credentials: { email: string; password: string }) {
        // // Check apakah email dan password kosong,
        if (!credentials?.email || !credentials?.password) {
          throw createError({
            statusCode: RESPONSE_CODE.EMPTY_EMAIL_OR_PASSWORD.code,
            statusMessage: RESPONSE_CODE.EMPTY_EMAIL_OR_PASSWORD.msg,
          });
        }

        // //jika tidak gunakan prisma untuk mencari input email user di db
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // //check apakah user ada di db
        // //jika tidak ada akan error, dan sebaliknya
        if (!user || !user.password) {
          // Any object returned will be saved in `user` property of the JWT
          throw createError({
            statusCode: RESPONSE_CODE.INVALID_SIGNIN.code,
            statusMessage: RESPONSE_CODE.INVALID_SIGNIN.msg,
          });
        }

        if (!user.emailVerified) {
          throw createError({
            statusCode: RESPONSE_CODE.UNAUTHORIZED.code,
            statusMessage:
              "Your account has not been verified yet. Please check your email and follow the instructions to verify your account before attempting to log in.",
          });
        }

        const correctPassword = await compare(
          credentials.password,
          user.password,
        );

        if (!correctPassword) {
          throw createError({
            statusCode: RESPONSE_CODE.INVALID_SIGNIN.code,
            statusMessage: RESPONSE_CODE.INVALID_SIGNIN.msg,
          });
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Hanya aktifkan secure di production
        sameSite: "lax",
        path: "/",
      },
    },
    callbackUrl: {
      name: "next-auth.callback-url",
      options: {
        secure: process.env.NODE_ENV === "production", // Hanya aktifkan secure di production
        sameSite: "lax",
        path: "/",
      },
    },
    csrfToken: {
      name: "next-auth.csrf-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Hanya aktifkan secure di production
        sameSite: "lax",
        path: "/",
      },
    },
  },
});
