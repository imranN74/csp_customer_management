import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/store/AuthStore";
import toast from "react-hot-toast";

export interface ErrorResponse {
  success: boolean;
  message: string;
}

export function CreateForm() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  const today = new Date().toISOString().split("T")[0];

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await axios.post(`${baseUrl}/customer/create`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success(data.message);
      navigate("/customer");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      toast.error(error.response?.data.message ?? "something went wrong!");
    },
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const phone = formData.get("phone");
    // const adhaarNo = formData.get("adhaarNum");

    // if (phone && phone?.toString.length > 10 && phone?.toString.length < 10) {
    //   toast.error("invalid mobile no.!");
    // }

    // if (
    //   adhaarNo &&
    //   adhaarNo?.toString.length > 10 &&
    //   adhaarNo?.toString.length < 10
    // ) {
    //   toast.error("invalid adhaar no.!");
    // }

    const data = Object.fromEntries(formData.entries());
    mutate(data);
  }

  return (
    <div className="my-2 mx-8">
      <div className="text-center text-violet-500 font-bold">
        Create New Customer
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2 px-3 py-5 rounded-xl shadow-2xl"
      >
        <div>
          <label className="mb-1 block text-sm font-medium">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 border-gray-400 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Phone<span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            max={10}
            required
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 border-gray-400 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Account Number
          </label>
          <input
            type="text"
            name="accountNumber"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">CIF Number</label>
          <input
            type="text"
            name="cifNumber"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Aadhaar Number
          </label>
          <input
            type="text"
            name="adhaarNum"
            max={12}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            max={today}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Account Open Date
          </label>
          <input
            type="date"
            max={today}
            name="accountOpenDate"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Passbook Received Date
          </label>
          <input
            type="date"
            max={today}
            name="passbookRcvDate"
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        <div className="md:col-span-2 flex flex-wrap gap-6 border border-gray-400 py-4 px-3 rounded-xl">
          <span className="text-sm font-medium">Scheme</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="pmsby"
              className="h-4 w-4 accent-violet-600"
            />
            <span>PMSBY</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="pmjjby"
              className="h-4 w-4 accent-violet-600"
            />
            <span>PMJJBY</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="apy"
              className="h-4 w-4 accent-violet-600"
            />
            <span>APY</span>
          </label>
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Address</label>
          <textarea
            name="address"
            rows={3}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Remarks</label>
          <textarea
            name="remarks"
            rows={3}
            className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-gray-400"
          />
        </div>

        {/* Schemes */}

        {/* Submit */}
        <div className="md:col-span-2 flex justify-center">
          <button
            disabled={isPending}
            type="submit"
            className="rounded-lg bg-linear-to-r from-indigo-600 to-violet-600 px-6 py-2.5 font-medium text-white transition hover:brightness-110 cursor-pointer"
          >
            {isPending ? "Processing data...." : "Create Customer"}
          </button>
        </div>
      </form>
    </div>
  );
}
