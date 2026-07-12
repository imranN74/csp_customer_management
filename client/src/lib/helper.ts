import { type CustomerDetail } from "@/components/customer-table";

export function filterCustomer(data: CustomerDetail[], id: string) {
  const customerData = data.filter((data) => data._id === id);
  return customerData[0];
}

export function formatDate(value: string | null) {
  const date = value?.split("T")[0];
  const reverDate = date?.split("-").reverse().join("-");
  return reverDate;
}

export function formatFormData(value: string | null) {
  const date = value?.split("T")[0];
  return date;
}
