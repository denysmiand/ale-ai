import { z } from "zod";

export const schema = z.object({
  name: z.string().trim().min(1, { message: "Name is required." }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required." })
    .email({ message: "Email must be a valid email address." }),
  assignment: z.string().min(10, {
    message: "Assignment description must be at least 10 characters.",
  }),
  github: z
    .string()
    .trim()
    .min(1, { message: "Github repository URL is required." })
    .includes("github.com/", { message: "Github repository URL is invalid." }),
  level: z
    .string({
      required_error: "Candidate level is required.",
    })
    .trim()
    .min(1, { message: "Candidate level is required." }),
});
