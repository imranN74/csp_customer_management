import { LoginForm } from "@/components/login-form";

export function Login() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full md:w-1/3 mx-3">
        <LoginForm />
      </div>
    </div>
  );
}
