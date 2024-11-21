import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(8, "Minimum 8 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.post(
          "https://seat-backend-2f085bcbc5b8.herokuapp.com/admin/login",
          values
        );

        if (response.data.status === "success") {
          const { token, data } = response.data;
          localStorage.setItem("token", token);
          localStorage.setItem("ceat_admin_user", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          setError(response.data.message || "Login failed");
        }
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="bg-LoginBg bg-no-repeat bg-cover h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-85 w-full h-full flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-2xl bg-white p-5 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 flex flex-col gap-5 rounded"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold">CEAT</h1>
            <h3 className="mb-3 text-primary capitalize pt-3 font-semibold text-2xl">
              Welcome
            </h3>
            <p className="font-semibold text-gray-400">Login to CTM360</p>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-3 font-semibold">
              {error}
            </div>
          )}

          <div>
            <label className="text-gray-400 font-semibold py-3">Username</label>
            <input
              type="email"
              name="email"
              className={`w-full border ${
                formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-white mt-2 p-4 rounded-lg outline-none text-black`}
              placeholder="Enter email..."
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <label className="text-gray-400 font-semibold py-3">Password</label>
            <input
              type="password"
              name="password"
              className={`w-full border ${
                formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-gray-300"
              } bg-white mt-2 p-4 rounded-lg outline-none text-black`}
              placeholder="Enter password..."
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mt-2 w-full">
            {loading ? (
              <button
                disabled
                type="button"
                className="bg-primary w-full text-center p-4 rounded-lg text-white uppercase font-semibold cursor-pointer"
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
              <button
                type="submit"
                className="bg-primary w-full text-center p-4 rounded-lg text-white uppercase font-semibold cursor-pointer"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
