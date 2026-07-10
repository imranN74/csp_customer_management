import { Card } from "@/components/card";
import {
  Users,
  UserCheck,
  ShieldCheck,
  HeartHandshake,
  PiggyBank,
  Puzzle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader } from "@/components/loader";
import { SomethingWentWrong } from "@/components/something-went-wrong";

export function Dashboard() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = localStorage.getItem("token");

  const { data, isPending, error } = useQuery({
    queryKey: ["dahsboardCount"],
    queryFn: async () => {
      const response = await axios.get(`${baseUrl}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    },
  });

  // console.log(data);

  if (isPending) {
    return <Loader />;
  }

  if (error) {
    console.log(error);
    return (
      <div className="">
        <SomethingWentWrong />
      </div>
    );
  }
  return (
    <div className="justify-center md:justify-start flex flex-wrap sm:ml-5 gap-3 p-2">
      <Card
        icon={<Users />}
        title="Total Customers"
        value={data.totalCustomer}
      />
      <Card
        icon={<UserCheck />}
        title="New This Week"
        value={data.currentWeekCount}
      />
      <Card
        icon={<UserCheck />}
        title="New This Month"
        value={data.currentMonthCount}
      />
      <Card
        icon={<ShieldCheck />}
        title="Enrolled in PMSBY"
        value={data.pmsbyEnrolledCount}
        bgColor="bg-violet-100"
      />
      <Card
        icon={<HeartHandshake />}
        title="Enrolled in PMJJBY"
        value={data.pmjjbyEnrolledCount}
        bgColor="bg-green-100"
      />
      <Card
        icon={<PiggyBank />}
        title="Enrolled in APY"
        value={data.apyEnrolledCount}
        bgColor="bg-cyan-100"
      />
      <Card
        icon={<Puzzle />}
        title="Total Enrolled In Scheme"
        value={data.totalSchemeCount}
      />
    </div>
  );
}
