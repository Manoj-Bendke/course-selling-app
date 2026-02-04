import * as z from "zod";

const emailSchema = z.string().email({ message: "Invalid email address" });
const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(20, { message: "Name must not exceed 20 characters" });

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" })
  .regex(/[!@#$%^&*()_+={}\[\]:;"'<,>.?\/\\|~-]/, {
    message: "Password must contain at least one special character",
  });

const validatorSchema = z.object({
  email: emailSchema,
  firstName: nameSchema,
  lastName: nameSchema,
  password: passwordSchema,
});
const validator = (req, res, next) => {
  const result = validatorSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
    });
  }
  next();
};
export { validator };
