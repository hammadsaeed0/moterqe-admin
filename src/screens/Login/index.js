import { Link, useNavigate } from "react-router-dom";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoader] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
    setLoader(true);

    navigate('dashboard');
  
  }
  return (
    <div className="         bg-white   h-screen flex justify-center items-center">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e.target);
      }} className=" bg-[#e5e7eb] shadow-2xl p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col gap-5 rounded">
        <div className=" text-center">
          <img
            src={require("../../assets/image/logo.png")}
            className=" w-44 mx-auto"
            alt=""
          />
          <h3 className="mb-4  text-gray-500 capitalize pt-3 font-semibold text-lg">dashboard login</h3>
        </div>

        <div className="">
          <label className=" text-gray-400 font-semibold  py-3">Username</label>
          <input
            type="email"
            name="email"
            className="w-full  border-white border    bg-white mt-2 p-4  rounded-lg outline-none text-white"
            placeholder="Enter email..."
          />
        </div>
        <div className="">
          <label className="  text-gray-400 font-semibold py-3">Password</label>
          <input
            type="password"
            name="password"
            className="w-full mt-2  border-white  border  bg-white rounded-lg  p-4  outline-none text-black"
            placeholder="Enter password..."
          />
        </div>
        <div className="mb-4    mt-2 w-full">
         
          {loading === true ? (
                <button
                  disabled
                  type="button"
                  class=" bg-[#FB5722]   w-full text-center p-4 rounded-lg text-white uppercase font-semibold cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
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
                <button

                type="submit"
                value={"sign in"}
                className="  bg-[#FB5722]   w-full text-center p-4 rounded-lg text-white uppercase font-semibold cursor-pointer"
              >
                Login
              </button>
              )}
        </div>
      </form>
    </div>
  );
};
export default AdminLogin;
