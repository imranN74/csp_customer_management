import { Login } from "./page/Login";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MasterPage } from "./page/MasterPage";
import { Customer } from "./page/Customer";
import { Dashboard } from "./page/Dashboard";
import { ProtectedRoute } from "./page/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<MasterPage />}>
              <Route index element={<Dashboard />} />
              <Route path="customer/page?/:page?" element={<Customer />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;
