import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddBannerAds = ({ isModalOpen, setIsModalOpen, closeModal, getData, setUsers }) => {
  const [loading, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImages, setSelectedImages] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [position, setPosition] = useState("banner");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImages(file);

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const bannerSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    // Validation for image selection
    if (!selectImages) {
      toast.error("Image is required");
      setLoader(false);
      return;
    }

    let imageUrl = getData?.imageUrl;
    if (selectImages) {
      try {
        let param = new FormData();
        param.append("images", selectImages);

        const uploadResponse = await axios.post(`http://35.88.137.61/api/api/upload`, param);
        if (uploadResponse?.status === 200) {
          imageUrl = uploadResponse?.data?.data[0];
        }
      } catch (error) {
        toast.error("Error uploading the image");
        setLoader(false);
        return;
      }
    }

    try {
      const params = {
        imageUrl,
        redirectUrl,   // New field for redirect URL
        position       // New field for position (enum)
      };

      const response = await axios.post(`${Base_url}/user/create-ads`, params);

      if (response.status === 201) {
        toast.success("Banner ad created successfully!");
        setLoader(false);
        setIsModalOpen(false);

        axios
        .get(`${Base_url}/user/ads`)
        .then((res) => {
          console.log(res);
  
          setUsers(res.data.bannerAds);
        })
        .catch((error) => {
          console.log(error);
        });
        
      } else {
        toast.error(response.data.message);
        setLoader(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
      setLoader(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className="p-3 flex justify-between items-center">
            <h1 className="capitalize h4 font-semibold">Create Banner Ad</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className="p-5">
            <div className="text-center my-2">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="mx-auto w-28 h-28 rounded-xl"
                  alt="Selected"
                />
              ) : (
                <img
                  src={require("../../assets/image/profile.jpg")}
                  className="mx-auto w-28 h-28 rounded-xl"
                  alt="Default"
                />
              )}
              <div className="my-5">
                <label
                  htmlFor="fileInput"
                  className="px-12 py-2 bg-white font-semibold text-primary border border-gray-200 rounded-lg cursor-pointer"
                >
                  Browse File
                </label>
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  name="profileImage"
                  type="file"
                  id="fileInput"
                  className="hidden"
                />
              </div>
            </div>

            <form onSubmit={bannerSubmit}>
              <div className="flex gap-5 mb-5 flex-wrap">
                {/* Input for redirect URL */}
                <div className="w-[100%]">
                  <Input
                    type="text"
                    className="w-full border"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    label="Redirect URL"
                    placeholder="Enter redirect URL"
                  />
                </div>

                {/* Dropdown for position selection */}
                <div className="w-[100%]">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Position
                  </label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                  >
                    <option>Select..</option>
                    <option value="side">Side</option>
                    <option value="banner">Banner</option>
                    <option value="special">Special</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <button
                  disabled
                  type="button"
                  className="bg-[#FB5722] w-full text-center mt-3 py-2.5 rounded-lg text-white uppercase font-semibold"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5733 10.4718 44.049 10.1079C47.8864 9.50375 51.7922 9.47893 55.6171 10.0401C60.8261 10.7915 65.8352 12.6341 70.2666 15.4652C74.698 18.2962 78.4293 22.0659 81.1718 26.555C83.3874 29.9732 85.0597 33.7302 86.1142 37.6864C86.8046 40.0431 89.3423 41.6781 91.7676 41.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <Button
                  label="Submit"
                  className="bg-[#FB5722] w-full text-center mt-3 py-2.5 rounded-lg text-white uppercase font-semibold"
                />
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddBannerAds;
