import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { MdSupport } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/customer/getAll`)
      .then((res) => {
        console.log(res);
        setRooms(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`${Base_url}/key/getAll`)
      .then((res) => {
        console.log(res);
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

      axios
      .get(`${Base_url}/key/getAll`)
      .then((res) => {
        console.log(res);
        setSubCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Wrapper>
      <h2 className="main_title">Dashboard</h2>

      {/* <section>
        <div className=" py-4  w-full grid  grid-cols-1  xl:grid-cols-3 md:grid-cols-2 gap-5">
          <div className=" w-full">
            <div className="  bg-primary p-5 rounded-lg flex  justify-between">
              <div>
                <h2 className=" text-white font-bold">User Management</h2>
                <div className=" pt-2 flex items-center gap-3">
                  <p className="text-4xl text-white">{rooms?.length}</p>
                </div>
              </div>
              <div>
                <FaUsers size={80} color="white" />
              </div>
            </div>
          </div>
          <div className=" w-full">
            <div className=" bg-primary  flex justify-between p-5 rounded-lg">
              <div>
                <h2 className=" text-white font-bold">Keys Management</h2>
                <div className=" pt-2 flex items-center gap-3">
                  <p className="text-4xl text-white">{category?.length}</p>
                </div>
              </div>
              <div>
                <MdSupport size={80} color="white" />
              </div>
            </div>
          </div> */}
          {/* <div className=" w-full">
            <div className=" bg-primary flex justify-between p-5 rounded-lg">
              <div>
                <h2 className=" text-white font-bold">Sub Category</h2>
                <div className=" pt-2 flex items-center gap-3">
                  <p className="text-4xl text-white">{subCategory?.length}</p>
                </div>
              </div>
              <div>
                <MdSupport size={80} color="white" />
              </div>
            </div>
          </div> */}
        {/* </div>
      </section> */}

      
    </Wrapper>
  );
};

export default Dashboard;
