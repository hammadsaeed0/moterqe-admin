import { Link } from "react-router-dom";
const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0  shadow-xl ${side} sm:left-0 w-64 h-screen bg-[#e5e7eb] z-10 transition-all`}
    >
      <i
        className="bi bi-x-lg absolute text-black top-4 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className="  p-5">
        <h1 className=" text-white text-4xl font-medium">
          <img
            src={require("../../assets/image/logo.png")}
            className="  w-40  mx-auto"
            alt=""
          />
          {/* Logo */}
        </h1>
      </div>

      <ul className="">
        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-black flex items-center  hover:bg-primary hover:text-white">
          <i class="bi bi-grid-fill  mr-2 inline-block text-xl"></i>
          <Link to="/dashboard" className="text-lg capitalize">
            Dashboard
          </Link>
        </li>
        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-black flex items-center  hover:bg-primary hover:text-white">
          <i class="bi bi-grid-fill  mr-2 inline-block text-xl"></i>
          <Link to="/customers" className="text-lg capitalize">
            Private Seller
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/dealer" className="text-lg capitalize">
            Dealer
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/service_provider" className="text-lg capitalize">
            Service Provider
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold  transition-all py-3 text-black flex items-center  hover:bg-primary hover:text-white">
          <i class="bi bi-grid-fill  mr-2 inline-block text-xl"></i>
          <Link to="/plans" className="text-lg capitalize">
            Plan
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/cars" className="text-lg capitalize">
            Cars
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/service_request" className="text-lg capitalize">
            Service Request
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/garage" className="text-lg capitalize">
            Garage
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-black flex items-center hover:bg-primary hover:text-white">
          <i className="bi bi-people mr-2 inline-block text-xl"></i>{" "}
          <Link to="/home_banner" className="text-lg capitalize">
            Home Banner
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
