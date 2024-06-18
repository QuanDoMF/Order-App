'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LoginBody, LoginBodyType } from '@/schemaValidations/auth.schema'
import envConfig from '@/config'
import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'

export default function LoginForm() {
  const { toast } = useToast()
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  async function onSubmit(values: LoginBodyType) {
    try {
      const result = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (res) => {
        const payload = await res.json()
        const data = {
          status: res.status,
          payload
        }
        if (!res.ok) {
          throw data
        }
        return data
      })
      toast({
        description: result.payload.message
      })
      const resultFromNextServer = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify(result),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('result', resultFromNextServer)
    } catch (error: any) {
      const errors = error.payload.errors as { field: string; message: string }[]
      const status = error.status as number
      if (status === 422) {
        errors.forEach((error) => {
          form.setError(error.field as 'email' | 'password', {
            type: 'server',
            message: error.message
          })
        })
      } else {
        toast({
          title: 'Lỗi',
          description: error.payload.message,
          variant: 'destructive'
        })
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2 max-w-[600px] flex-shrink-0 w-full' noValidate>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='!mt-8 w-full' type='submit'>
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
