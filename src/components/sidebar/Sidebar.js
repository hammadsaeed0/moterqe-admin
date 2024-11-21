import { BsSliders } from "react-icons/bs";
import { FaQuestionCircle } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { MdOutlineContacts } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0  shadow-xl ${side} sm:left-0 w-64 overflow-x-auto h-screen bg-[#014aad] z-10 transition-all`}
    >
      <i
        className="bi bi-x-lg absolute text-black top-4 right-4 sm:hidden block cursor-pointer text-lg"
        onClick={closeSidebar}
      ></i>
      <div className="  p-5">
        <h1 className=" text-white text-4xl  font-bold">
          CEAT
        </h1>
      </div>

      <ul className="">
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center  hover:bg-gray-400 hover:text-white">
          <i className="bi bi-speedometer2 mr-2 text-white inline-block text-xl"></i>
          <RxDashboard className=" mr-2" size={20} />
          <Link to="/dashboard" className="text-lg capitalize">
            Dashboard
          </Link>
        </li>


        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-white flex items-center  hover:bg-gray-400 hover:text-white">
          <FiUsers className=" mr-2" size={20}   />
          <Link to="/Admin-user" className="text-lg capitalize">
            Admins
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-gray-400 hover:text-white">
          <BsSliders className=" mr-2" size={20}  />
          <Link to="/home_banner" className="text-lg capitalize">
            Home Banner
          </Link>
        </li>
        <li className="px-4 cursor-pointer  font-semibold  transition-all py-3 text-white flex items-center  hover:bg-gray-400 hover:text-white">
          <FiUsers className=" mr-2" size={20}   />
          <Link to="/customers" className="text-lg capitalize">
            Customers
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-gray-400 hover:text-white">
          
          <BsSliders className=" mr-2" size={20}  />
          <Link to="/blogs" className="text-lg capitalize">
            Blogs
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-gray-400 hover:text-white">
          <MdOutlineContacts  className=" mr-2" size={20}    />
          <Link to="/contact-us" className="text-lg capitalize">
            Contact Us
          </Link>
        </li>

        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-gray-400 hover:text-white">
          <FaQuestionCircle          className=" mr-2" size={20}    />
          <Link to="/faqs" className="text-lg capitalize">
            Faqs
          </Link>
        </li>
        <li className="px-4 cursor-pointer   font-semibold   transition-all py-3 text-white flex items-center hover:bg-gray-400 hover:text-white">
          <MdOutlineContacts  className=" mr-2" size={20}    />
          <Link to="/glossary" className="text-lg capitalize">
            Glossary
          </Link>
        </li>

      </ul>
    </div>
  );
};
export default Sidebar;
