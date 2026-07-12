import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DetailItem } from "./detail-item";
import { type CustomerDetail } from "@/components/customer-table";
import { PMJJBY, PMSBY, APY } from "./scheme-button";
import { formatDate } from "@/lib/helper";
import { SquarePen } from "lucide-react";
import { EditDialog } from "./edit-dialog";
import { useState } from "react";

export function InfoDialog({
  open,
  setOpen,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: CustomerDetail;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>View customer information.</DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3 text-sm">
            <DetailItem label="Name" value={data?.customer?.name || "-"} />
            <DetailItem label="Phone" value={data?.customer?.phone || "-"} />
            <DetailItem
              label="Account No."
              value={data?.customer?.accountNumber || "-"}
            />
            <DetailItem
              label="Aadhaar No."
              value={data?.customer?.adhaarNum || "-"}
            />
            <DetailItem label="Address" value={data?.customer?.address} />
            <DetailItem
              label="Account Opened"
              value={formatDate(data?.accountOpenDate) || "-"}
            />
            <DetailItem
              label="Passbook Received"
              value={formatDate(data?.passbookRcvDate) || "-"}
            />

            <DetailItem
              label="Schemes"
              value={
                <div className="flex flex-wrap gap-2">
                  {data?.pmsby && <PMSBY />}
                  {data?.pmjjby && <PMJJBY />}
                  {data?.apy && <APY />}
                  {!data?.pmsby && !data?.pmjjby && !data?.apy && "-"}
                </div>
              }
            />
          </div>

          <DialogFooter>
            <DialogClose>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <button
              onClick={() => {
                setEditDialogOpen(!editDialogOpen);
              }}
              type="button"
              className="group flex cursor-pointer items-center gap-2 rounded-lg border border-blue-200 bg-white px-4 text-sm font-medium text-blue-600 shadow-sm transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md active:scale-95"
            >
              <SquarePen
                size={18}
                className="transition-transform duration-200 group-hover:rotate-6 group-hover:scale-110"
              />
              Edit
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <EditDialog
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
        customerData={data}
      />
    </div>
  );
}
