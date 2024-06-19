import authApiRequest from '@/apiRequests/auth'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('accessToken')?.value
  const refreshToken = cookieStore.get('refreshToken')?.value
  cookieStore.delete('accessToken')
  cookieStore.delete('refreshToken')
  if (!accessToken || !refreshToken) {
    return Response.json(
      {
        message: 'Không nhận được access token hoặc refresh token'
      },
      {
        status: 200
      }
    )
  }
  try {
    const result = await authApiRequest.sLogout({
      accessToken,
      refreshToken
    })
    return Response.json(result.payload)
  } catch (error) {
    return Response.json(
      {
        message: 'Lỗi khi gọi API đến server backend'
      },
      {
        status: 200
      }
    )
  }
}
