import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";

const SubCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [users, setUsers] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    axios
      .get(`${Base_url}/order/get`)
      .then((res) => {
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
        console.log(res);
        
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${Base_url}/user/get`)
      .then((res) => {
        setCustomer(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to filter users by date and customer
  const filterByDateAndCustomer = () => {
    const filtered = users.filter((user) => {
      const orderDate = new Date(user.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);

      const matchesCustomer =
        selectedCustomer === "" || user.userId?._id === selectedCustomer;

      return orderDate >= start && orderDate <= end && matchesCustomer;
    });
    setFilteredUsers(filtered);
  };

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
          .delete(`${Base_url}/subcategory/delete/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              axios
                .get(`${Base_url}/subcategory/getAll`)
                .then((res) => setUsers(res.data.data))
                .catch((error) => console.log(error));
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <Wrapper>
      <div className="flex w-full justify-between items-center">
        <h2 className="main_title">Customer Orders</h2>
      </div>

      {/* Date Filters */}
      <div className="flex gap-4 mt-4">
        <div className="w-60">
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="w-full p-3 border"
          >
            <option value="">Select customer</option>
            {customer?.map((item, index) => {
              return (
                <option key={index} value={item?._id}>
                  {`${item?.firstName} ${item?.lastName}`}
                </option>
              );
            })}
          </select>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={filterByDateAndCustomer}
          className="text-base cursor-pointer bg-primary text-white py-2.5 px-5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-md"
        >
          Filter
        </button>
      </div>

      <section className="mb-20 mt-7 text-gray-800">
        <div className="block rounded-lg shadow-lg bg-white">
          <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full mb-0">
                    <thead className="bg-[#A36A2D]">
                      <tr className="rounded-lg whitespace-nowrap">
                        <th className="text-sm text-white font-bold px-6 py-4">
                          Order ID
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-4">
                          Product Name
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-4">
                          Product Image
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-4">
                          Quantity
                        </th>
                        <th className="text-sm text-white font-bold px-6 py-4">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers?.map((item) => (
                        <tr
                          className="bg-white border-t rounded-md"
                          key={item._id}
                        >
                          <th className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <p className="mb-0.5 font-medium text-black">
                              {item?._id}
                            </p>
                          </th>
                          <td className="text-sm text-center font-normal px-6 py-4 whitespace-nowrap">
                            <span className="text-base text-black py-1 px-2.5 leading-none text-center bg-green-200 rounded-full">
                              {item?.productName}
                            </span>
                          </td>
                          <td className="text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                            {item?.image ? (
                              <img
                                src={item?.image}
                                className="mx-auto w-14 rounded-md h-14"
                                alt="product"
                              />
                            ) : (
                              <img
                                src={require("../../assets/image/cart_image.png")}
                                className="mx-auto w-14 rounded-md h-14"
                                alt="default"
                              />
                            )}
                          </td>
                          <td className="text-right text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <span className="text-base text-black py-1 px-2.5 leading-none text-center bg-green-200 rounded-full">
                              {item?.quantity}
                            </span>
                          </td>
                          <td className="text-right text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-white py-1 px-3 bg-primary rounded-full">
                              {item?.status}
                            </span>
                          </td>
                        </tr>
                      ))}
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

export default SubCategory;
