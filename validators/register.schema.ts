import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const registerSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(5, { message: "Needs to be at least 5 characters" }),
      username: z
        .string()
        .min(5, { message: "Needs to be at least 5 characters" })
        .max(20)
        .regex(/^\S+$/, "Username should not contain spaces"),
      email: z
        .string()
        .email()
        .min(1, { message: "Needs to be at least 1 characters" }),
      password: z
        .string()
        .min(5, { message: "Needs to be at least 5 characters" })
        .regex(/[0-9]/, "Password must contain at least one digit")
        .regex(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Password must contain at least one symbol"
        )
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
      confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"], // path of error
    })
);

// export type registerValidator = z.infer<typeof registerSchema>;
