import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MasterPage } from "./page/MasterPage";
import { Customer } from "./page/Customer";
import { Dashboard } from "./page/Dashboard";
import { ProtectedRoute } from "./page/ProtectedRoute";
import { PublicRoute } from "./page/PublicRoute";
import { PageNotFound } from "./components/page-not-found";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/login" element={<PublicRoute />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MasterPage />}>
              <Route index element={<Dashboard />} />
              <Route path="customer/page?/:page?" element={<Customer />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
