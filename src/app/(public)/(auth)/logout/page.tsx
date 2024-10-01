'use client'
import { useRef, useEffect } from "react"
import { useLogoutMutation } from "@/queries/useAuth"
import { useRouter, useSearchParams } from "next/navigation"
import { getRefreshTokenToLocalStorage, getAccessTokenFromLocalStorage } from "@/lib/utils"
export default function LogoutPage() {
    
    const { mutateAsync } = useLogoutMutation()
    const router = useRouter()
    const ref = useRef<any>(null)
    const searchParams = useSearchParams()
    const refreshTokenFromUrl = searchParams.get('refreshToken')
    const accessTokenFromUrl = searchParams.get('accessToken')  

    useEffect(() => {
        if (ref.current || (refreshTokenFromUrl !== getRefreshTokenToLocalStorage()) || (accessTokenFromUrl && accessTokenFromUrl !== getAccessTokenFromLocalStorage())) {
            return
        } 
        ref.current = mutateAsync
        mutateAsync().then((res) => {
            setTimeout(() => {
                ref.current = null
            }, 1000)
            router.push('/login')
        })
    }, [mutateAsync, router, refreshTokenFromUrl, accessTokenFromUrl])

    return (
        <div>Log out ...</div>
    )
}