import ButtonRedirect from "@/app/components/ButtonRedirect";
import Link from "next/link";
export default function Home() {
  console.log("Home page");
  return (
    <main>
      <ul>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
        <li>
          <Link href={"/register"}>register</Link>
        </li>
      </ul>
      <ButtonRedirect />
    </main>
  );
}
