import React, { useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddUsers = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  setUsers,
}) => {
  const [permissions, setPermissions] = useState([]);
  console.log(permissions);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePermissionChange = (e, permissionName) => {
    const { checked } = e.target;
    if (checked) {
      // Add permission to the array
      setPermissions([...permissions, permissionName]);
    } else {
      // Remove permission from the array
      setPermissions(permissions.filter((perm) => perm !== permissionName));
    }
  };

  const bannerSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const parms = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      country: formData.get("country"),
      role: formData.get("role"),
      permission: permissions, // Include the permission array here
    };

    console.log("Permissions:", permissions);
    console.log("Parms:", parms);


    if (!parms.firstName) {
      toast.error("Must enter first Name!");
    } else if (!parms.lastName) {
      toast.error("Must enter last Name!");
    } else if (!parms.email) {
      toast.error("Must enter email!");
    } else if (!parms.phone) {
      toast.error("Must enter phone!");
    } else if (!parms.password) {
      toast.error("Must enter password!");
    } else if (!parms.role) {
      toast.error("Must enter role!");
    } else if (permissions.length === 0) {
      toast.error("Must select at least one permission!");
    } else {
      try {
        const response = await axios.post(`${Base_url}/adminUser/create`, parms);
        if (response.data.status === "ok") {
          const res = await axios.get(`${Base_url}/adminUser/get`);
          setUsers(res.data.data);
          setIsModalOpen(false);
          toast('user add successfully');
        } else {
          toast(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className="p-3 flex justify-between items-center">
            <h1 className="capitalize h4 font-semibold">Add User</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className="p-5">
            <form onSubmit={bannerSubmit}>
              <div className="flex gap-5 flex-wrap">
                <div className="w-[48%]">
                  <Input label={"First Name"} name={"firstName"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Last Name"} name={"lastName"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Email Address"} name={"email"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Phone Number"} name={"phone"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Password"} name={"password"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Role"} name={"role"} className={"border w-full py-3"} />
                </div>
                <div className="w-[100%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Permission</label>
                  <div className="grid grid-cols-4 gap-3">
                    {["Dashboard","Customer", "Admin Users", "Calculate Rate", "Master Status", "Customer Orders", "Create Orders", "Brands"].map((permission) => (
                      <div key={permission} className="flex gap-2 items-center">
                        <Input
                          className="w-4 h-4"
                          type="checkbox"
                          value={permission}
                          onChange={(e) => handlePermissionChange(e, permission)}
                        />
                        <p className="m-0 pt-2 text-sm font-medium text-gray-900">{permission}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button
                label={"Submit"}
                type={"submit"}
                className={"bg-primary mt-3 uppercase text-white py-2 w-full"}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddUsers;
