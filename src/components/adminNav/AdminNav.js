import { FiMenu } from "react-icons/fi";
import Input from "../Input";
import { FaSearch } from "react-icons/fa";
import { MdClose, MdOutlineNotificationsActive } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { IoNotificationsOff } from "react-icons/io5";
import { Base_url } from "../../utils/Base_url";
const AdminNav = ({ openSidebar, side, closeSidebar }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleNotificationClick = () => {
    setModalOpen(!isModalOpen);
  };

  const [myNotification, setMyNotification] = useState([]);
  useEffect(() => {
    axios
      .get(`https://new-motorqe-backend.vercel.app/v1/user/notification`)
      .then((res) => {
        console.log(res.data.data, "dfffffffffffffffffffffff");

        setMyNotification(res.data.data);
      })
      .catch((error) => {});
  }, []);

  const NotificationRead = (id) => {
    axios
      .patch(`${Base_url}/user/read-notification/${id}`)
      .then((res) => {
        console.log(res);

        axios
          .get(`https://new-motorqe-backend.vercel.app/v1/user/notification`)
          .then((res) => {
            console.log(res.data.data, "dfffffffffffffffffffffff");

            setMyNotification(res.data.data);
          })
          .catch((error) => {});
      })
      .catch((error) => {});
  };


    // Filter to get only unread notifications
    const unreadNotifications = myNotification.filter(
      (notification) => notification.status === "unread"
    );

  return (
    <nav
      className={`fixed  z-30 top-0 right-0   ${
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
          <div className=" relative">
            <MdOutlineNotificationsActive
              onClick={handleNotificationClick}
              color="white"
              size={34}
            />

            {/* Notification Modal */}
            {isModalOpen && (
              <div className="   absolute right-0 top-12 flex justify-center items-center z-30">
                <div className="bg-white p-4  rounded shadow-lg w-80">
                  <div className=" flex justify-between items-center">
                    <h2 className="text-xl font-semibold mb-2">
                      Notifications
                    </h2>

                    <MdClose
                      className="  cursor-pointer text-gray-500"
                      onClick={() => setModalOpen(false)}
                      size={25}
                    />
                  </div>
                  <ul className="p-0   justify-between items-center h-72 overflow-y-auto">
                    {myNotification?.length > 0 ? (
                      myNotification?.map((item, index) => {
                        return (
                          <>
                            <li className=" py-2  w-full  gap-4" key={index}>
                              {/* <div className=" ">
                                  <img src={require('../../assets/image/logo.png')}  className=' w-12 h-12 rounded-full' />
                                </div> */}
                              <div>
                                <p className=" m-0"> {item?.message}</p>
                                <div className=" flex pt-2 justify-between items-center">
                                  <span className=" text-[13px]">
                                    {moment(item?.createdAt).format(
                                      "DD-MM-YYYY "
                                    )}
                                  </span>
                                  {item?.status === "unread" ? (
                                    <button
                                      onClick={() =>
                                        NotificationRead(item?._id)
                                      }
                                      className=" bg-primary text-white px-5 py-1 rounded-md"
                                    >
                                      Read
                                    </button>
                                  ) : (
                                    <button className="  bg-gray-300 text-white px-5 py-1 rounded-md">
                                      Read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </li>
                            <hr />
                          </>
                        );
                      })
                    ) : (
                      <div className=" text-center">
                        <IoNotificationsOff
                          size={60}
                          className=" text-secondary text-center mx-auto"
                        />
                        <span className=" font-semibold">No message yet</span>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            )}
             {unreadNotifications.length > 0 && (
              <span className="w-6 h-6 bg-primary absolute -top-2 -right-2 flex justify-center items-center rounded-full">
                <p className="m-0 text-white">{unreadNotifications.length}</p>
              </span>
            )}
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
