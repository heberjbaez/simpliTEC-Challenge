import { z } from "zod"

export const formSchema = z.object({
    brand: z.string().min(2).max(50),
    name: z.string().min(2).max(50),
    downPayment: z.string().min(2).max(50),
    year: z.string().min(2).max(50),
    transmission: z.string().min(2).max(50),
    doors: z.string().min(1),
    engine: z.string().min(2).max(50),
    price: z.string().min(2).max(50),
    type: z.string().min(2).max(50),
    color: z.string().min(2).max(50),
    condition: z.string().min(2).max(50),
    isPublish: z.boolean()
})
