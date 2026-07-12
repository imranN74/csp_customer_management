import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-8xl font-extrabold text-violet-600">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-slate-900">Page Not Found</h2>

      <p className="mt-3 max-w-md text-slate-600">
        The page you're looking for doesn't exist, may have been moved, or the
        URL might be incorrect.
      </p>

      <div className="mt-8 flex gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-700"
        >
          <Home size={18} />
          Go Home
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>
      </div>
    </div>
  );
}
