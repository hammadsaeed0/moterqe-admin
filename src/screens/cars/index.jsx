import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import Button from "../../components/Button";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
const Cars = () => {
  const [users, setUsers] = useState([]);
  const [activeCars, setActiveCards] = useState([]);

  useEffect(() => {
    axios
      .post(`${Base_url}/admin/all-cars-by-status?status=pending`)
      .then((res) => {
        console.log(res);

        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .post(`${Base_url}/admin/all-cars-by-status?status=active`)
      .then((res) => {
        console.log(res, "active cars");

        setActiveCards(res.data);
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
          .delete(`${Base_url}/admin/delete-plan/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");

              axios
                .get(`${Base_url}/admin/plan`)
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

  const [carStatus, setCarStatus] = useState("pending");

  const UpdateStatus = (id, newStatus) => {
    const params = {
      status: newStatus,
    };
    axios
      .patch(`${Base_url}/admin/update-car-status/${id}`, params)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          toast.success(res.data.message);

          axios
            .post(`${Base_url}/admin/all-cars-by-status?status=pending`)
            .then((res) => {
              console.log(res);

              setUsers(res.data);
            })
            .catch((error) => {
              console.log(error);
            });

          axios
            .post(`${Base_url}/admin/all-cars-by-status?status=active`)
            .then((res) => {
              console.log(res, "active cars");

              setActiveCards(res.data);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      <div className=" flex   justify-between items-center">
        <div>
          <h2 className="main_title"> Cars</h2>
        </div>

        <div className=" flex gap-3">
          <div>
            <Button
              onClick={() => setCarStatus("pending")}
              label={"pending"}
              className={`  ${
                carStatus === "pending" ? "bg-secondary" : " bg-primary"
              } `}
            />
          </div>
          <div>
            <Button
              onClick={() => setCarStatus("approved")}
              label={"approved"}
              className={`  ${
                carStatus === "approved" ? "bg-secondary" : " bg-primary"
              } `}
            />
          </div>
        </div>
      </div>

      {carStatus === "pending" ? (
        <section className="mb-20 mt-7 text-gray-800">
          <div className=" rounded-lg   overflow-x-auto shadow-lg">
            <div className="flex flex-col">
              <div className=" sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
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
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Image
                          </th>

                          <th
                            scope="col"
                            className=" text-sm text-white  font-bold px-6 py-4"
                          >
                            Make
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Price Range
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Model
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Vehicle Category
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Update Status
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-10 py-4"
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
                                    {item?.title}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <div className=" w-14 h-14 rounded-lg overflow-hidden">
                                    <img
                                      src={item?.car_images[0]}
                                      className=" w-full h-full"
                                      alt=""
                                    />
                                  </div>
                                </td>
                                <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                    {item?.make}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.price_range}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.model}
                                  </span>
                                </td>

                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.vehicle_category}
                                  </span>
                                </td>

                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-sm text-white bg-primary   py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.status}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <select
                                    defaultValue={item.status}
                                    onChange={(e) =>
                                      UpdateStatus(item._id, e.target.value)
                                    }
                                    className=" px-3 py-2 bg-gray-200 rounded-lg shadow-md"
                                  >
                                    <option value={"pending"}>Pending</option>
                                    <option value={"active"}>Active</option>
                                    <option value={"reject"}>Reject</option>
                                  </select>
                                </td>

                                <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                                  <div className=" flex items-center justify-center gap-2">
                                    <div>
                                      <FaEye
                                        color=""
                                        size={30}
                                        className=" text-secondary"
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
      ) : (
        <section className="mb-20 mt-7 text-gray-800">
          <div className=" rounded-lg   overflow-x-auto shadow-lg">
            <div className="flex flex-col">
              <div className=" sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full sm:px-6 lg:px-8 ">
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
                            Name
                          </th>
                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Image
                          </th>

                          <th
                            scope="col"
                            className=" text-sm text-white  font-bold px-6 py-4"
                          >
                            Make
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Price Range
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Model
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Vehicle Category
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Status
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-6 py-4"
                          >
                            Update Status
                          </th>

                          <th
                            scope="col"
                            className="text-sm  text-white   font-bold px-10 py-4"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {activeCars?.map((item, index) => {
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
                                    {item?.title}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <div className=" w-14 h-14 rounded-lg overflow-hidden">
                                    <img
                                      src={item?.car_images[0]}
                                      className=" w-full h-full"
                                      alt=""
                                    />
                                  </div>
                                </td>
                                <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline   bg-green-200  rounded-full">
                                    {item?.make}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.price_range}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.model}
                                  </span>
                                </td>

                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-base text-black  py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.vehicle_category}
                                  </span>
                                </td>

                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <span className=" text-sm text-white bg-primary   py-1 px-2.5 leading-none  whitespace-nowrap    bg-green-200  rounded-full">
                                    {item?.status}
                                  </span>
                                </td>
                                <td className="align-middle text-center text-sm font-normal px-6 py-4 whitespace-nowrap text-left">
                                  <select
                                    defaultValue={item.status}
                                    onChange={(e) =>
                                      UpdateStatus(item._id, e.target.value)
                                    }
                                    className=" px-3 py-2 bg-gray-200 rounded-lg shadow-md"
                                  >
                                    <option value={"pending"}>Pending</option>
                                    <option value={"active"}>Active</option>
                                    <option value={"reject"}>Reject</option>
                                  </select>
                                </td>

                                <td className="align-middle  text-sm font-normal px-6 py-4 whitespace-nowrap">
                                  <div className=" flex items-center justify-center gap-2">
                                    <div>
                                      <FaEye
                                        color=""
                                        size={30}
                                        className=" text-secondary"
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
      )}
    </Wrapper>
  );
};

export default Cars;
