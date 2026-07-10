import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/AuthStore";

export function LogoutButton() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const user = localStorage.getItem("userName") || "User";
  const userName = user.split(" ")[0];

  return (
    <button
      type="button"
      className="group relative flex h-11 cursor-pointer items-center overflow-hidden rounded-[0.9em] bg-violet-500 py-1.5 pl-5 pr-14 font-medium tracking-wide text-white shadow-[inset_0_0_1.6em_-0.6em_#714da6] transition-all duration-300"
      onClick={() => {
        logout();
        localStorage.removeItem("userName");
      }}
    >
      <span>Hey, {userName}</span>

      <span className="absolute right-[0.3em] flex h-[2.2em] w-[2.2em] items-center justify-center rounded-[0.7em] bg-white text-violet-600 shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] group-active:scale-95">
        <span className="hidden group-hover:inline">{`${token ? "Logout" : "Login"}`}</span>
        <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </button>
  );
}
