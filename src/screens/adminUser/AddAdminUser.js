import React, { useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddAdminUser = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  setUsers,
}) => {
  const [permissions, setPermissions] = useState([]);
  console.log(permissions);
  
  const [selectedImage, setSelectedImage] = useState(null);
   const [loading,setLoader] = useState(false);
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
      password: formData.get("password"),
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
    } else if (!parms.password) {
      toast.error("Must enter password!");
    } else if (!parms.role) {
      toast.error("Must enter role!");
    } else if (permissions.length === 0) {
      toast.error("Must select at least one permission!");
    } else {

      setLoader(true);
      try {
        const response = await axios.post(`${Base_url}/admin/create`, parms);
        if (response.data.status === "ok") {
          const res = await axios.get(`${Base_url}/adminUser/get`);
          setUsers(res.data.data);
          setIsModalOpen(false);
          toast('user add successfully');
          setLoader(false);
        } else {
          toast(response.data.message);
          setLoader(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
        setLoader(false);
      }
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal} className={' rounded-md'}>
        <div className="">
          <div className="p-3 flex justify-between items-center">
            <h1 className="capitalize h4 font-semibold">Add Admin</h1>
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
                  <Input label={"Password"} name={"password"} className={"border w-full py-3"} />
                </div>
                <div className="w-[48%]">
                  <Input label={"Role"} name={"role"} className={"border w-full py-3"} />
                </div>
                <div className="w-[100%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900">Permission</label>
                  <div className="grid grid-cols-4 gap-3">
                    {["Dashboard", "Admin Users","Customers", "Home Banner", "Blogs", "Contact Us", "Faqs", "Glossary"].map((permission) => (
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
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="w-full h-11 bg-primary border-none outline-none rounded-lg mt-4 shadow-sm cursor-pointer text-lg text-white font-semibold"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <Button
                  label={"Submit"}
                  type={"submit"}
                  className={"bg-primary mt-3 uppercase text-white py-2 w-full"}
                />
              )}

             
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddAdminUser;
