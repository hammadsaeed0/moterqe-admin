import React, { useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddNews = ({
  isModalOpen,
  setIsModalOpen,
  closeModal,
  setUsers,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the image
      setImageFile(file); // Store the file for upload
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const bannerSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!content.trim()) {
      toast.error("Content is required.");
      return;
    }
    if (!imageFile) {
      toast.error("Image is required.");
      return;
    }

    setLoading(true);
    let profilePhotoUrl = "";

    // Upload image
    try {
      const param = new FormData();
      param.append("images", imageFile);

      const profilePhotoResponse = await axios.post(
        `http://35.88.137.61/api/api/upload`,
        param
      );

      if (profilePhotoResponse?.data?.data[0]) {
        profilePhotoUrl = profilePhotoResponse.data.data[0];
      }
    } catch (error) {
      toast.error("Image upload failed");
      setLoading(false);
      return;
    }

    // Prepare params for blog post
    const params = {
      title,
      content,
      image: profilePhotoUrl
    };

    // Submit the blog post
    try {
      const res = await axios.post(`${Base_url}/admin/blog`, params);

      console.log(res);
      
      if (res.status === 201) {
        toast.success(res.data?.message);
       
        axios
          .get(`${Base_url}/admin/blog`)
          .then((res) => {
            setUsers(res?.data?.blogs);
          })
          .catch((error) => {
            console.log(error);
          });

          setIsModalOpen(false);
          setLoading(false);
  

      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div>
          <div className="p-3 flex justify-between items-center">
            <h1 className="capitalize h4 font-semibold">Upload News</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className="p-5">
            <div className="text-center my-2">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  className="mx-auto w-28 h-28 rounded-xl"
                  alt=""
                />
              ) : (
                <img
                  src={require("../../assets/image/profile.jpg")}
                  className="mx-auto w-28 h-28 rounded-xl"
                  alt=""
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
              <div className="flex gap-5 flex-wrap">
                <div className="md:w-[100%] w-[100%]">
                  <Input
                    label={"Title"}
                    placeholder={""}
                    name={"title"}
                    className={"border w-full py-3"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="md:w-[100%] w-[100%]">
                  <Input
                    label={"Description"}
                    placeholder={""}
                    name={"description"}
                    className={"border w-full py-3"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
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
                  label={"Add"}
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

export default AddNews;
