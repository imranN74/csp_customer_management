import { CustomerTable } from "@/components/customer-table";
import { Filter } from "@/components/filter-bar";
import { useState } from "react";

export function Customer() {
  const [search, setSearch] = useState("");
  const [scheme, setScheme] = useState("");

  return (
    <div>
      <Filter onSearch={setSearch} onScheme={setScheme} />
      <CustomerTable search={search} scheme={scheme} />
    </div>
  );
}
