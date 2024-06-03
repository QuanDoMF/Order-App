"use client";
import { useRouter } from "next/navigation";
function ButtonRedirect() {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/login");
  };
  return <button onClick={handleNavigate}>Chuyển sang trang login</button>;
}

export default ButtonRedirect;
