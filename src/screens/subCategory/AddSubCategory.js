import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddSubCategory = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  setUsers,
  getData,
}) => {
  const bannerSubmit = async (values) => {
    // Get the previous allStatus array
    const previousAllStatus = getData?.allStatus || [];

    // Create the new status object
    const newStatus = {
      name: values.status.value,
      date: Date.now(),
    };

    // Push the new status to the allStatus array
    const updatedAllStatus = [...previousAllStatus, newStatus];

    const params = {
      status: values.status.value,
      allStatus: updatedAllStatus,
    };

    try {
      const res = await axios.put(
        `${Base_url}/book/update/${getData?._id}`,
        params
      );
      toast.success("Update Successfully!");
      setIsModalOpen(false);
      const usersRes = await axios.get(`${Base_url}/book/get`);
      setUsers(usersRes.data.data);
    } catch (error) {
      toast.error("An error occurred while updating.");
      console.error(error);
    }
  };

  const [status, setStatus] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_url}/master/get`)
      .then((res) => {
        setStatus(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className="p-3 flex justify-between items-center">
            <div></div>
            <h1 className="capitalize h4 font-semibold">Order Status Update</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className="p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                bannerSubmit(e.target);
              }}
            >
              <div className="flex gap-5 flex-wrap">
                <div className="w-full">
                  <label
                    htmlFor="status"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Update Status
                  </label>
                  <select
                    defaultValue={getData?.status}
                    name="status"
                    className="outline-none bg-lightGray border w-full py-3 p-2.5 text-black placeholder:text-primary rounded-md"
                  >
                    <option value="">Select...</option>
                    {status?.map((item, index) => {
                      return (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <Button
                label="Update Status"
                type="submit"
                className="bg-secondary mt-3 uppercase text-white py-2 w-full"
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddSubCategory;
