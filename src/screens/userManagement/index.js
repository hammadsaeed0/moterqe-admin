import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import Button from "../../components/Button";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";
import EditUsers from "./EditUsers";
import { Link } from "react-router-dom";
import AddUsers from "./AddUsers";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isUpdateOpen2, setIsUpdateOpen2] = useState(false);
  const [singleUser, setSingleUser] = useState({});
  const UpdateModal = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };


  const UpdateModal2 = () => {
    setIsUpdateOpen2(true);
  };

  const closeUpdateModal2 = () => {
    setIsUpdateOpen2(false);
  };

  console.log(isUpdateOpen);

  const [deleteUser, setDeleteUser] = useState({});

  console.log(deleteUser, "deleteUser");

  useEffect(() => {
    axios
      .get(`${Base_url}/adminUser/get`)
      .then((res) => {
        console.log(res);

        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(users);

  const removeFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A47ABF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${Base_url}/adminUser/delete/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              axios
                .get(`${Base_url}/adminUser/get`)
                .then((res) => {
                  console.log(res.data);

                  setUsers(res.data.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <Wrapper>
      <div className=" flex   justify-between items-center">
        <div>
          <h2 className="main_title">Admin User</h2>
        </div>


        <div>
          <Button
            className={"  bg-primary py-2.5"}
            label={`Add User`}

            onClick={()=>setIsUpdateOpen(true)}
           
          />
        </div>
       
      </div>

      <AddUsers
        isModalOpen={isUpdateOpen}
        setIsModalOpen={setIsUpdateOpen}
        setUsers={setUsers}
      />
      <EditUsers
        singleUser={singleUser}
        isModalOpen={isUpdateOpen2}
        setIsModalOpen={setIsUpdateOpen2}
        setUsers={setUsers}
      />

      <section className="mb-20 mt-7 text-gray-800">
        <div className="block rounded-lg shadow-lg">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full mb-0">
                    <thead className=" bg-primary">
                      <tr className=" rounded-lg whitespace-nowrap ">
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          First Name
                        </th>
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          Last Name
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Email
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Phone Number
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                        Role
                        </th>
                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Password
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {users?.map((item, index) => {
                        return (
                          <>
                            <tr className="bg-white border-t   rounded-md ">
                              <th
                                scope="row"
                                className="text-sm font-normal px-6 py-4   whitespace-nowrap "
                              >
                                <p className="mb-0.5 font-medium text-black">
                                  #1
                                </p>
                              </th>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap  text-center">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.firstName}
                                </span>
                              </td>
                              <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.lastName}
                                </span>
                              </td>
                              <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                  {item?.email}
                                </span>
                              </td>
                              <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                  {item?.phone}
                                </span>
                              </td>

                              <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                  {item?.role}
                                </span>
                              </td>
                              <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                  {item?.password}
                                </span>
                              </td>

                              <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                                <div className=" flex justify-center gap-2">
                                  <div>
                                    <img
                                      onClick={() => {
                                        setIsUpdateOpen2(true);
                                        setSingleUser(item)
                                      }}
                                      src={require("../../assets/image/edit.png")}
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <img
                                      onClick={() => removeFunction(item._id)}
                                      src={require("../../assets/image/del.png")}
                                      alt=""
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default UserManagement;
