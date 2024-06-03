import { z } from "zod"

export const configSchema = z.object({
    NEXT_PUBLIC_API_ENDPOINT: z.string()
})

// safeParse trả về nếu xác thực process.env đúng với schema và return status và data
const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT
})

if(!configProject.success) {
    console.log(configProject.error.issues);
    throw new Error("Các giá trị khai báo trong file .env không hợp lệ")
}

const envConfig = configProject.data
export default envConfig