import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/dashboard/Dashboard";
import UserManagement from "./screens/userManagement";
import SupporterManagement from "./screens/SupporterManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./screens/Login";
import Category from "./screens/category/Category";
import SubCategory from "./screens/subCategory/SubCategory";
import Vehicle from "./screens/Vehicle/Vehicle";
import VehicleModel from "./screens/VehicleModel/VehicleModel";
import VehicleYear from "./screens/VehicleYear/VehicleYear";
import VehicleOverview from "./screens/VehicleOverview/VehicleOverview";
import Trips_tricks from "./screens/Trips_tricks/Trips_tricks";
import VehiclePart from "./screens/VehiclePart/VehiclePart";
import Add_Calculate from "./screens/calculator/Add_Calculate";
import Calculator from "./screens/calculator";
import CreateOrders from "./screens/createOrders";
import ViewForm from "./screens/orders/ViewForm";
import Customers from "./screens/Customer";
import Brands from "./screens/brands";
import ViewCustomersOrders from "./screens/Customer/ViewCustomersOrders";
import Plans from "./screens/plans";
import Cars from "./screens/cars";
import Dealer from "./screens/dealer";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user_management" element={<UserManagement />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/dealer" element={<Dealer />} />
          <Route path="/key_management" element={<SupporterManagement />} />
          <Route path="/category" element={<Category />} />
          <Route path="/sub_category" element={<SubCategory />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/vehicle_model" element={<VehicleModel />} />
          <Route path="/vehicle_year" element={<VehicleYear />} />
          <Route path="/vehicle_overview" element={<VehicleOverview />} />
          <Route path="/trips_tricks" element={<Trips_tricks />} />
          <Route path="/vehicle_part" element={<VehiclePart />} />
          <Route path="/add_calculate" element={<Add_Calculate />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/create-orders" element={<CreateOrders />} />
          <Route path="/view-forms" element={<ViewForm />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/viewCustomersOrders/:id" element={<ViewCustomersOrders />} />
          <Route path="/brands" element={<Brands />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
