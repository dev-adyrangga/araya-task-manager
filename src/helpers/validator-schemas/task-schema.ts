import z from 'zod'

export const taskSchema = z.object({
  title: z.string().trim().nonempty('Title field is required'),
  status: z.string().trim().nonempty('staus field is required'),
})
