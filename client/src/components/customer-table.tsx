import { SquarePen, Trash, Info } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "./loader";
import { NoDataFound } from "./no-data-found";
import { Pagination } from "./pagination";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { SomethingWentWrong } from "./something-went-wrong";
import { PMJJBY, APY, PMSBY } from "./scheme-button";

export interface Customer {
  _id: string;
  name: string;
  phone: string;
  accountNumber: string;
  adhaarNum: string;
  address: string;
}

export interface CustomerDetail {
  _id: string;
  customer: Customer;
  accountOpenDate: string | null;
  passbookRcvDate: string | null;
  pmsby: boolean;
  pmjjby: boolean;
  apy: boolean;
  remarks: string;
}

export function CustomerTable({
  search,
  scheme,
}: {
  search: string;
  scheme: string;
}) {
  const navigate = useNavigate();
  let { page } = useParams();
  const pageNumber = Number(page) || 1;

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (pageNumber < 1) {
      toast.error("Invalid page");
      navigate("/customer/page/1", { replace: true });
    }
  }, [pageNumber, navigate]);

  const { data, isPending, error } = useQuery({
    queryKey: ["customers", search, scheme, page],
    queryFn: async () => {
      const response = await axios.get(
        `${baseUrl}/customer?page=${pageNumber}&limit=20&q=${search}&scheme=${scheme}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      return response.data;
    },
  });

  console.log(data);

  useEffect(() => {
    if (!data) return;

    if (pageNumber > data.data.totalPage && data.data.totalPage > 0) {
      toast.error("Invalid page");
      navigate("/customer/page/1", { replace: true });
    }
  }, [pageNumber, data, navigate]);

  //__HANDLE ERROR___
  if (error) {
    console.log(error);
    return (
      <div className="">
        <SomethingWentWrong />
      </div>
    );
  }

  const SortIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-3 fill-slate-400"
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <path d="M15.99 28.58h32.02c1.964.073 3.15-2.443 1.81-3.9L33.81 6.08c-.904-1.096-2.716-1.098-3.62 0l-16.01 18.6c-1.334 1.455-.16 3.975 1.81 3.9m32.02 6.84H15.99c-1.964-.073-3.15 2.443-1.81 3.9l16.01 18.6c.904 1.096 2.716 1.098 3.62 0l16.01-18.6c1.334-1.455.16-3.975-1.81-3.9" />
    </svg>
  );

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto px-4 md:px-8 mt-2">
      <table className="w-full max-w-7xl mx-auto">
        <thead className="text-slate-900 text-left text-sm font-semibold border-b border-slate-300 whitespace-nowrap">
          <tr>
            <th scope="col" aria-sort="none" className="pl-0 px-3 py-3.5">
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer"
                aria-label="Sort by name"
              >
                Name <SortIcon />
              </button>
            </th>
            <th scope="col" aria-sort="none" className="px-3 py-3.5">
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer"
                aria-label="Sort by email"
              >
                Phone <SortIcon />
              </button>
            </th>
            <th scope="col" aria-sort="none" className="px-3 py-3.5">
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer"
                aria-label="Sort by job title"
              >
                Adhaar No. <SortIcon />
              </button>
            </th>
            <th scope="col" aria-sort="none" className="px-3 py-3.5">
              <button
                type="button"
                className="flex items-center gap-1 cursor-pointer"
                aria-label="Sort by role"
              >
                Account No. <SortIcon />
              </button>
            </th>
            <th scope="col" className="pr-0 px-3 py-3.5">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-slate-200">
          {data.data.data.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12">
                <NoDataFound />
              </td>
            </tr>
          ) : (
            data.data.data.map((user: CustomerDetail) => (
              <tr key={user.customer._id}>
                <td className="pl-0 px-3 py-4 font-medium text-slate-900 whitespace-nowrap">
                  <div className="flex flex-col gap-1 justify-center items-center">
                    <span>{user.customer.name}</span>
                    <span>
                      {user.pmjjby ? <PMJJBY /> : ""}
                      {user.pmsby ? <PMSBY /> : ""}
                      {user.apy ? <APY /> : ""}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4 text-slate-500">
                  {user.customer.phone}
                </td>
                <td className="px-3 py-4 text-slate-500">
                  {user.customer.adhaarNum}
                </td>
                <td className="px-3 py-4 text-slate-500">
                  {user.customer.accountNumber}
                </td>
                <td className="pr-0 px-2 py-4 flex gap-3">
                  <button
                    type="button"
                    className="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                    aria-label={`Delete ${user.customer.name}`}
                  >
                    <Info color="green" size={17} />
                  </button>
                  <button
                    type="button"
                    className="text-sm text-blue-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    aria-label={`Edit ${user.customer.name}`}
                  >
                    <SquarePen size={17} />
                  </button>
                  <button
                    type="button"
                    className="text-sm text-red-700 cursor-pointer hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded"
                    aria-label={`Delete ${user.customer.name}`}
                  >
                    <Trash color="red" size={17} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={data.data.currentPage}
        totalPages={data.data.totalPage}
        onPrevious={() => {
          navigate(`/customer/page/${data.data.currentPage - 1}`);
        }}
        onNext={() => {
          navigate(`/customer/page/${data.data.currentPage + 1}`);
        }}
      />
    </div>
  );
}
