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
import { SomethingWentWrong } from "./something-went-wrong";

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

  const token = useAuthStore((state) => state.token);

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: any) => {
      const response = await axios.put(
        `${baseUrl}/customer/update/${customerData.customer._id}`,
        payload,
        { headers: { Authorixarion: `Bearer ${token}` } },
      );
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["customers"],
      });
      toast.success(data.data.message);
      setOpen(false);
    },
  });

  function updateCustomer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    mutate(data);
  }

  if (error) {
    return <SomethingWentWrong />;
  }

  // if (isPending) {
  //   return <OverlayLoader text="Updating Details..." />;
  // }

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
              <div>
                <span className="font-semibold text-red-500">Note</span> -
                Account No. and Adhaar No. cannot be edited
              </div>
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form className="space-y-2" onSubmit={updateCustomer}>
              {/* Customer Information */}
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <h3 className="mb-3 border-b pb-2 text-sm font-semibold text-slate-700">
                    Customer Information
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Name<span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        defaultValue={customerData?.customer.name}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Phone<span className="text-red-600">*</span>
                      </label>
                      <input
                        name="phone"
                        type="text"
                        defaultValue={customerData?.customer.phone}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Account Number
                      </label>
                      <input
                        name="accountNumber"
                        type="text"
                        defaultValue={customerData?.customer.accountNumber}
                        readOnly
                        className="w-full cursor-not-allowed rounded-lg border bg-slate-100 px-3 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium">
                        Aadhaar Number
                      </label>
                      <input
                        name="adhaarNum"
                        type="text"
                        defaultValue={customerData?.customer.adhaarNum}
                        readOnly
                        className="w-full cursor-not-allowed rounded-lg border bg-slate-100 px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="mb-1 block text-sm font-medium">
                        Address
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        defaultValue={customerData?.customer.address}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                      />
                    </div>
                  </div>
                </div>
                {/* Account Details */}
                <div className="">
                  <div>
                    <h3 className="mb-3 border-b pb-2 text-sm font-semibold text-slate-700">
                      Account Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Account Open Date
                        </label>
                        <input
                          type="date"
                          name="accountOpenDate"
                          defaultValue={
                            formatFormData(customerData?.accountOpenDate) ?? ""
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium">
                          Passbook Received
                        </label>
                        <input
                          name="passbookRcvDate"
                          type="date"
                          defaultValue={
                            formatFormData(customerData?.passbookRcvDate) ?? ""
                          }
                          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Schemes */}
                  <div className="mt-3">
                    <h3 className="mb-3 border-b pb-2 text-sm font-semibold text-slate-700">
                      Schemes
                    </h3>

                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          name="pmsby"
                          type="checkbox"
                          defaultChecked={customerData?.pmsby}
                          className="h-4 w-4 accent-violet-600"
                        />
                        PMSBY
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          name="pmjjby"
                          type="checkbox"
                          defaultChecked={customerData?.pmjjby}
                          className="h-4 w-4 accent-violet-600"
                        />
                        PMJJBY
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          name="apy"
                          type="checkbox"
                          defaultChecked={customerData?.apy}
                          className="h-4 w-4 accent-violet-600"
                        />
                        APY
                      </label>
                    </div>
                  </div>

                  {/* Remarks */}
                  <div className="mt-2">
                    <label className="mb-1 block text-sm font-medium">
                      Remarks
                    </label>

                    <textarea
                      name="remarks"
                      rows={4}
                      defaultValue={customerData?.remarks}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-violet-500"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <DialogClose>
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="cursor-pointer bg-violet-600 hover:bg-violet-700"
                  disabled={isPending}
                >
                  {isPending ? "Updating....." : "Update Customer"}
                </Button>
              </div>
            </form>
          </FieldGroup>
        </DialogContent>
      </Dialog>
    </div>
  );
}
