import { z } from "zod";

export const informationSchema = z.object({
  title: z
    .string({
      invalid_type_error: "title must be string",
    })
    .trim()
    .optional(),
  subTitle: z
    .string({
      invalid_type_error: "subTitle must be string",
    })
    .trim()
    .optional(),
  email: z
    .string({
      invalid_type_error: "email must be string",
      required_error: "email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  phone: z
    .string({
      invalid_type_error: "Contact Number must be string",
      required_error: "Contact number is required",
    })
    .trim()
    .min(1, "Contact number is required"),
  address: z
    .string({
      invalid_type_error: "address must be string",
      required_error: "address is required",
    })
    .trim()
    .min(1, "address is required"),
  instagram: z
    .string({
      invalid_type_error: "instagram must be a valid URL",
      required_error: "Instagram Link is required"
    })
    .min(1, "Instagram Link is required")
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Instagram link must be a valid URL",
    }),
  facebook: z
    .string({
      invalid_type_error: "facebook link must be a valid URL",
      required_error: "Facebook Link is required"
    })
    .min(1, "Facebook Link is required")
    .trim()
    .refine((val) => val === "" || z.string().url().safeParse(val).success, {
      message: "Facebook link must be a valid URL",
    }),
  age: z
    .string({
      required_error: "Age is required",
      invalid_type_error: "Age must be a string",
    })
    .trim()
    .min(1, "Age is required")
    .refine((val) => Number(val) >= 0, {
      message: "Age can't be negative value",
    }),
});

export const countDownDateSchema = z.object({
  countDownDate: z
    .string({
      invalid_type_error: "title must be string",
      required_error: "Select Date & Time",
    })
    .trim()
    .min(1, "Select Date & Time"),
})



export const updateLocationSchema = z.object({
  distance: z
    .string({
      required_error: "Distance value is required",
      invalid_type_error: "Distance value must be a string",
    })
    .trim()
    .min(1, "Distance value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Distance must be a valid number",
    })
    .refine((val) => Number(val) > 0, { message: "Distance must be positive value" }),
  latitude: z
    .string({
      required_error: "Latitude value is required",
      invalid_type_error: "Latitude value must be a string",
    })
    .trim()
    .min(1, "Latitude value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Latitude must be a valid number",
    })
    .refine(
      (val) => Number(val) >= -90 && Number(val) <= 90,
      { message: "Latitude must be between -90 and 90" }
    ),
  longitude: z
    .string({
      required_error: "Longitude value is required",
      invalid_type_error: "Longitude value must be a string",
    })
    .trim()
    .min(1, "Longitude value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Longitude must be a valid number",
    })
    .refine(
      (val) => Number(val) >= -180 && Number(val) <= 180,
      { message: "Longitude must be between -180 and 180" }
    )
});
