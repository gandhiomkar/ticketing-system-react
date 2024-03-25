import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./hooks/AuthProvider";
import HomePage from "./pages/Home";
import PageNotFound from "./pages/NoPage";
import LoginPage from "./pages/LoginRegister";
import Dash from "./pages/UserDashboard/Dash";
import TicketForm from "./components/CreateTicketForm";
import { UserRoute, TechSupportRoute, AdminRoute } from "./router/PrivateRoute";
import AdminDash from "./pages/admin/Admin";
import { AdminTicketProvider } from "./contexts/AdminTicketContext";
import { TechSupportProvider } from "./contexts/TechSupportContext";
import TechSupportDash from "./pages/techsupport/TechSupportDashboard";
import { UserTicketProvider } from "./contexts/UserTIcketContext";
import { TechSupportTicketProvider } from "./contexts/TechSupportTicketContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <UserTicketProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<UserRoute />}>
                <Route path="/userdash" element={<Dash />} />
                <Route path="/createticket" element={<TicketForm />} />
              </Route>
            </Routes>
          </UserTicketProvider>
          <TechSupportProvider>
            <TechSupportTicketProvider>
              <Routes>
                <Route element={<TechSupportRoute />}>
                  <Route
                    path="/techsupportdash"
                    element={<TechSupportDash />}
                  />
                </Route>
              </Routes>
            </TechSupportTicketProvider>
            <AdminTicketProvider>
              <Routes>
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminDash />} />
                </Route>
              </Routes>
            </AdminTicketProvider>
          </TechSupportProvider>
        </AuthProvider>
        <Routes>{/* <Route path="*" element={<PageNotFound />} /> */}</Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
