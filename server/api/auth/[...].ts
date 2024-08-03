import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../database/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { RESPONSE_CODE } from "~/server/app/common/code";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    jwt: ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.fullname = user.fullname;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    session: ({ session, token }: { session: any; token: any }) => {
      session.user.id = token.id;
      session.user.fullname = token.fullname;
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
  secret: process.env.NUXT_AUTH_ORIGIN,
  pages: {
    signIn: "/sign-in",
  },
  providers: [
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

        const correctPassword = await bcrypt.compare(
          credentials.password,
          user.password
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
    // @ts-expect-error
    GoogleProvider.default({
      clientId: useRuntimeConfig().googleId,
      clientSecret: useRuntimeConfig().googleSecret,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
});
