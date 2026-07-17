import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useAuthStore } from "@/store/AuthStore";
import { formatFormData } from "@/lib/helper";
import toast from "react-hot-toast";
import axios from "axios";
import { type CustomerDetail } from "@/components/customer-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function EditDialog({
  open,
  setOpen,
  customerData,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  customerData: CustomerDetail;
}) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const queryClient = useQueryClient();

  const today = new Date().toISOString().split("T")[0];

  const token = useAuthStore((state) => state.token);

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await axios.put(
        `${baseUrl}/customer/update/${customerData.customer._id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      toast.success(data.message);
      setOpen(false);
    },
    onError: (error: any) => {
      console.log(error.response);
      toast.error(error.response?.data?.message ?? "something went wrong!");
    },
  });

  function updateCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    mutate(data);
  }

  return (
    <div className="">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger></DialogTrigger>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            Edit Details
            <DialogDescription>
              Fields marks with <span className="text-red-500">*</span> cannot
              be blank.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form
              className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto"
              onSubmit={updateCustomer}
            >
              {/* Customer Information Section */}
              <div className="rounded-lg p-4 shadow-sm border">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-5 bg-blue-600 rounded"></div>
                  <h3 className="text-sm font-semibold text-blue-900">
                    Customer Information
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-700">
                      Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      defaultValue={customerData?.customer.name}
                      className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-700">
                      Phone<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      name="phone"
                      type="text"
                      defaultValue={customerData?.customer.phone}
                      className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-700">
                      Account Number
                    </label>
                    <input
                      name="accountNumber"
                      type="text"
                      defaultValue={customerData?.customer.accountNumber}
                      className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-blue-700">
                      Aadhaar Number
                    </label>
                    <input
                      name="adhaarNum"
                      type="text"
                      defaultValue={customerData?.customer.adhaarNum}
                      className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-blue-700">
                      Address
                    </label>
                    <textarea
                      name="address"
                      rows={2}
                      defaultValue={customerData?.customer.address}
                      className="w-full rounded-md border border-blue-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Account Details & Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-green-600 rounded"></div>
                    <h3 className="text-sm font-semibold text-green-900">
                      Account Details
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-green-700">
                        Account Open Date
                      </label>
                      <input
                        type="date"
                        name="accountOpenDate"
                        max={today}
                        defaultValue={
                          formatFormData(customerData?.accountOpenDate) ?? ""
                        }
                        className="w-full rounded-md border border-green-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-green-700">
                        Passbook Received
                      </label>
                      <input
                        name="passbookRcvDate"
                        type="date"
                        max={today}
                        defaultValue={
                          formatFormData(customerData?.passbookRcvDate) ?? ""
                        }
                        className="w-full rounded-md border border-green-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Schemes Section */}
                <div className="rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-purple-600 rounded"></div>
                    <h3 className="text-sm font-semibold text-purple-900">
                      Schemes
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        name="pmsby"
                        type="checkbox"
                        defaultChecked={customerData?.pmsby}
                        className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                      />
                      <span className="text-xs font-medium text-purple-700 group-hover:text-purple-900">
                        PMSBY
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        name="pmjjby"
                        type="checkbox"
                        defaultChecked={customerData?.pmjjby}
                        className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                      />
                      <span className="text-xs font-medium text-purple-700 group-hover:text-purple-900">
                        PMJJBY
                      </span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input
                        name="apy"
                        type="checkbox"
                        defaultChecked={customerData?.apy}
                        className="h-4 w-4 accent-purple-600 rounded cursor-pointer"
                      />
                      <span className="text-xs font-medium text-purple-700 group-hover:text-purple-900">
                        APY
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Operational & Remarks */}
              <div className="grid grid-cols-2 gap-4">
                {/* Operational Section */}
                <div className="rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-amber-600 rounded"></div>
                    <h3 className="text-sm font-semibold text-amber-900">
                      Operational
                    </h3>
                  </div>

                  <select
                    className="w-full rounded-md border border-amber-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                    name="isOperational"
                    defaultValue={
                      customerData?.customer?.isOperational ? "yes" : "no"
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                {/* Remarks Section */}
                <div className="rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-5 bg-indigo-600 rounded"></div>
                    <h3 className="text-sm font-semibold text-indigo-900">
                      Remarks
                    </h3>
                  </div>
                  <textarea
                    name="remarks"
                    rows={2}
                    defaultValue={customerData?.remarks}
                    className="w-full rounded-md border border-indigo-300 bg-white px-2.5 py-2 text-xs transition-all outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer px-4 py-2 text-xs rounded-md font-medium transition-all hover:bg-slate-100"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="cursor-pointer px-4 py-2 text-xs rounded-md font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md"
                  disabled={isPending}
                >
                  {isPending ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
