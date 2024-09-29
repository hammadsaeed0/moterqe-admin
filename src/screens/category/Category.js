import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import Button from "../../components/Button";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import UpdateSupporter from "../SupporterManagement/UpdateSupporter";
import AddCategory from "./addCategory";

const Category = () => {
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
      .get(`${Base_url}/category/getAll`)
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
          .delete(`${Base_url}/category/delete/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              axios
                .get(`${Base_url}/category/getAll`)
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
          <h2 className="main_title">Category</h2>
          {/* <p className="param">Showing 8 to 20</p> */}
        </div>
        <UpdateSupporter
          singleUser={singleUser}
          isModalOpen={isUpdateOpen}
          setIsModalOpen={setIsUpdateOpen}
          setUsers={setUsers}
        />
        <AddCategory
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setUsers={setUsers}
        />
        <div>
          <Button
            className={"  bg-secondary py-3"}
            label={`Add Category`}
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
                    <thead className="  bg-secondary">
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          Image
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
                                  className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center"
                                >
                                  
                                    <p className="mb-0.5 font-medium text-black text-center">
                                      #{index+1}
                                    </p>
                                  
                                </th>
                                <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                    {item?.name}
                                  </span>
                                </td>
                                <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                                  
                                   <img src={item?.image}  className=" w-14 h-14 mx-auto rounded-full object-cover" alt="" />
                                  
                                </td>
                               

                                <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                                  <div className=" flex gap-2 justify-center">
                                    {/* <Button
                                      onClick={() => {
                                        setSingleUser(item);

                                        UpdateModal();
                                      }}
                                      label={`Edit User`}
                                      className={`   bg-secondary py-1`}
                                    /> */}
                                    <Button
                                      onClick={() => removeFunction(item._id)}
                                      label={`Delete`}
                                      className={` bg-red`}
                                    />
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

export default Category;
