import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./component/main-layout/MainLayout";
import Home from "./container/home/Home";
import Login from "./container/login/Login";
import Signup from "./container/signup/Signup";
import ProtectedRoute from "./component/protected-route/ProtectedRoute";
import VendorCustomer from "./container/vendor-customer/VendorCustomer";
import Item from "./container/item/Item";
import Stock from "./container/stock/Stock";
import Purchase from "./container/purchase/Purchase";
import Sale from "./container/sale/Sale";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<MainLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="/dashboard/purchase" element={<Purchase />} />
            <Route path="/dashboard/sales" element={<Sale />} />
            <Route path="/dashboard/stock" element={<Stock />} />
            <Route path="/dashboard/item" element={<Item />} />
            <Route path="/dashboard/vendor-customer" element={<VendorCustomer />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
