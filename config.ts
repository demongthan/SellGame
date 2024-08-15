import { z } from 'zod'

const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_PAGE_SIZE:z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET:z.string(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:z.string(),
  NEXT_PUBLIC_VNP_TMNCODE:z.string(),
  NEXT_PUBLIC_VNP_HASHSECRET:z.string(),
  NEXT_PUBLIC_VNP_URL:z.string(),
  NEXT_PUBLIC_VNP_RETURNURL:z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  NEXT_PUBLIC_PAGE_SIZE:process.env.NEXT_PUBLIC_PAGE_SIZE,
  NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NEXT_PUBLIC_VNP_TMNCODE: process.env.NEXT_PUBLIC_VNP_TMNCODE,
  NEXT_PUBLIC_VNP_HASHSECRET: process.env.NEXT_PUBLIC_VNP_HASHSECRET,
  NEXT_PUBLIC_VNP_URL: process.env.NEXT_PUBLIC_VNP_URL,
  NEXT_PUBLIC_VNP_RETURNURL: process.env.NEXT_PUBLIC_VNP_RETURNURL,
})

if (!configProject.success) {
  console.error(configProject.error.issues)
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig