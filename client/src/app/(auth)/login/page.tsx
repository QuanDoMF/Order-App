import LoginForm from '@/app/(auth)/login/loginForm'

export default function LoginPage() {
  return (
    <div>
      <h1 className='text-xl font-semibold text-center'>Đăng nhâp</h1>
      <div className='flex justify-center'>
        <LoginForm />
      </div>
    </div>
  )
}
