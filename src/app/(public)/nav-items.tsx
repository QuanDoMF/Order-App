'use client'

import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { use } from 'react'

const menuItems = [
  {
    title: 'Món ăn',
    href: '/menu' //auth not required = undifined
  },
  {
    title: 'Đơn hàng',
    href: '/orders' //auth not required = undifined
  },
  {
    title: 'Đăng nhập',
    href: '/login',
    authRequired: false // chưa đăng nhập thì hiển thị
  },
  {
    title: 'Quản lý',
    href: '/manage/dashboard',
    authRequired: true // đăng nhập rồi thì hiển thị
  }
]


export default function NavItems({ className }: { className?: string }) {

  const [ isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(Boolean(getAccessTokenFromLocalStorage()))
  },[])

  return menuItems.map((item) => {
    // const isAuth = Boolean(getAccessTokenFromLocalStorage()) // check if user is authenticated
    if(item.authRequired === false && isAuth || item.authRequired === true && !isAuth) {
      return null
    }
    return (
      <Link href={item.href} key={item.href} className={className}>
        {item.title}
      </Link>
    )
  })
}
