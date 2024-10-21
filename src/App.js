import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./screens/dashboard/Dashboard";
import SupporterManagement from "./screens/SupporterManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./screens/Login";
import Customers from "./screens/Customer";
import Brands from "./screens/brands";
import Plans from "./screens/plans";
import Cars from "./screens/cars";
import Dealer from "./screens/dealer";
import ServiceProvider from "./screens/serviceProvider";
import ServiceRequest from "./screens/serviceRequests";
import CreateGarage from "./screens/createGarage";
import UpdateCars from "./screens/cars/UpdateCars";
import Garage from "./screens/garage";
import UpdateGarage from "./screens/garage/UpdateGarage";
import HomeBanner from "./screens/homeBanner";
import News from "./screens/news";
function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/update_garage/:id" element={<UpdateGarage />} />
          <Route path="/update_car/:id" element={<UpdateCars />} />
          <Route path="/service_request" element={<ServiceRequest />} />
          <Route path="/dealer" element={<Dealer />} />
          <Route path="/service_provider" element={<ServiceProvider />} />
          <Route path="/key_management" element={<SupporterManagement />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/home_banner" element={<HomeBanner />} />
          <Route path="/news" element={<News />} />
          
          <Route path="/create_garage/:id" element={<CreateGarage />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}

export default App;
