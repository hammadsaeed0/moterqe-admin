import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import Button from "../../components/Button";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Add_trips_tricks from "./Add_trips_tricks";

const Trips_tricks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log(isModalOpen);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const UpdateModal = () => {
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateOpen(false);
  };

  console.log(isUpdateOpen);

  const [users, setUsers] = useState([]);

  const [singleUser, setSingleUser] = useState({});

  useEffect(() => {
    axios
      .get(`https://autoproapp-1537b3ac9acb.herokuapp.com/admin/tips/getAll`)
      .then((res) => {
        console.log(res.data);

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
          .delete(`https://autoproapp-1537b3ac9acb.herokuapp.com/admin/tips/delete/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              axios
                .get(`https://autoproapp-1537b3ac9acb.herokuapp.com/admin/tips/getAll`)
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
          <h2 className="main_title">Tips & Tricks</h2>
          {/* <p className="param">Showing 8 to 20</p> */}
        </div>
       
        <Add_trips_tricks
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setUsers={setUsers}
        />
        <div>
          <Button
            className={"  bg-primary py-3"}
            label={`Add `}
            onClick={openModal}
          />
        </div>
      </div>

      <section className="mb-20 mt-7 text-gray-800">
        <div className="block  rounded-lg shadow-lg bg-white">
          <div className="flex flex-col overflow-x-auto">
            <div className=" sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full mb-0">
                    <thead className="  bg-primary">
                      <tr className=" rounded-lg  whitespace-nowrap ">
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
                          Title
                        </th>

                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          Image
                        </th>
                        <th
                          scope="col"
                          className="text-sm text-white   font-bold px-6 py-4"
                        >
                         category
                        </th>
                        {/* <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Vehicle
                        </th> */}
                      
                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Video Url
                        </th>
                  
  
                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                         description
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
                            <tr className="bg-white border-t  rounded-md">
                              <th
                                scope="row"
                                className="text-sm font-normal px-6 py-4   whitespace-nowrap "
                              >
                                <div className="flex flex-row items-center">
                                  <p className="mb-0.5 font-medium text-black">
                                    #{index +1}
                                  </p>
                                </div>
                              </th>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.title}
                                </span>
                              </td>
                              <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <img
                                  className="rounded-full w-12"
                                  src={item?.images[0]}
                                  alt="Avatar"
                                />
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.category}
                                </span>
                              </td>
                              {/* <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.ver}
                                </span>
                              </td> */}
                              
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.url}
                                </span>
                              </td>
                              <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                  {item?.description}
                                </span>
                              </td>

                             

                             

                              <td className="align-middle text-right text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                <div className=" flex gap-2">
                                  
                                    <div>
                                    <img  onClick={() => removeFunction(item._id)} src={require('../../assets/image/del.png')} alt=""  />
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

export default Trips_tricks;
