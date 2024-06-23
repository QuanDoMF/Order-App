import authApiRequests from "@/apiRequests/auth";
import { LoginBodyType } from "@/schemaValidations/auth.schema";
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import  { HttpError } from "@/lib/http";

export async function POST(request: Request){
    const body = (await request.json()) as LoginBodyType

    // set cookie dùng của next
    const cookieStore = cookies()

    try{
        console.log('check');
        const { payload} = await authApiRequests.serverLogin(body)
        const { accessToken, refreshToken } = payload.data
        const decodedAccessToken = jwt.decode(accessToken) as {exp: number}
        const decodedRefreshToken = jwt.decode(refreshToken) as {exp: number}

        cookieStore.set('accessToken', accessToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            expires: decodedAccessToken.exp * 1000
        })
        cookieStore.set('refreshToken', refreshToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            expires: decodedRefreshToken.exp * 1000
        } )
        return Response.json(payload)
    } catch (error){
        if(error instanceof HttpError){
            return Response.json(error.payload, {
                status: error.status
            })
        }else{
            return Response.json({
                message: 'Có lỗi xảy ra',
                status: 500,
            })
        }
    }
}