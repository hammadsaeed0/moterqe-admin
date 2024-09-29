import { FiMenu } from "react-icons/fi";
import Input from "../Input";
import { FaSearch } from "react-icons/fa";
import { MdOutlineNotificationsActive } from "react-icons/md";
const AdminNav = ({ openSidebar, side, closeSidebar }) => {
  return (
    <nav
      className={`fixed  top-0 right-0   ${
        side === "left-0 md:-left-64" ? "left-0" : "left-0 md:left-64"
      }`}
    >
      <div className="   bg-[#0c0cb8] w-full flex justify-between  items-center p-4">
        <div className=" flex items-center gap-4">
          {side === "left-0 md:-left-64" ? (
            <FiMenu size={30} onClick={closeSidebar} color="white" />
          ) : (
            <FiMenu size={30} color="white" onClick={openSidebar} />
          )}

          <div className=" hidden md:block w-96">
            <Input
              placeholder={`Search...`}
              Icon={<FaSearch />}
              className={" w-full"}
            />
          </div>
        </div>

        <div className=" flex items-center gap-5">
          <div>
            <MdOutlineNotificationsActive color="white" size={30} />
          </div>
          <div>
            <img
              src={require("../../assets/image/profile.jpg")}
              className=" w-12 h-12 rounded-full"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default AdminNav;
