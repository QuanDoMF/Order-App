import RegisterForm from "@/app/(auth)/register/registerForm";
export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-xl text-center font-semibold">Đăng ký</h1>
      <div className="flex justify-center">
        <RegisterForm />
      </div>
    </div>
  );
}
