import React, { useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddNews = ({ isModalOpen, setIsModalOpen, closeModal, setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Handle additional image selection
  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter((file) => file.type.startsWith("image/"));
    if (validImages.length > 0) {
      const newImages = validImages.map((file) => URL.createObjectURL(file));
      setAdditionalImages((prev) => [...prev, ...newImages]); // Preview additional images
      setImageFiles((prev) => [...prev, ...validImages]); // Store additional images for upload
    } else {
      toast.error("Please select valid image files.");
    }
  };

  // Submit the form and upload images
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
    if (imageFiles.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    setLoading(true);
    let additionalPhotoUrls = [];

    // Prepare FormData for images
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append("images", file); // Additional images
    });

    // Upload images
    try {
      const uploadResponse = await axios.post(`http://35.88.137.61/api/api/upload`, formData);

      // Log the upload response to check its structure
      console.log("Upload response:", uploadResponse);

      if (uploadResponse?.data?.data) {
        additionalPhotoUrls = uploadResponse.data.data; // Assign URLs to the array
        console.log("Additional photo URLs:", additionalPhotoUrls); // Log the new URLs
      } else {
        console.log("No data received from the image upload");
        toast.error("No data received from the image upload.");
      }
    } catch (error) {
      console.error("Image upload failed:", error); // Log the error
      toast.error("Image upload failed.");
      setLoading(false);
      return;
    }

    // Prepare params for blog post submission
    const params = {
      title,
      content,
      images: additionalPhotoUrls, // Images array from the upload response
    };

    // Submit the blog post
    try {
      const res = await axios.post(`${Base_url}/admin/blog`, params);
      console.log(res);
      
      if (res.status === 201) {
        toast.success(res.data?.message);
        const blogsRes = await axios.get(`${Base_url}/admin/blog`);
        setUsers(blogsRes?.data?.blogs);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Blog post submission failed:", error); // Log the error
      toast.error(error.message);
    } finally {
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
            <form onSubmit={bannerSubmit}>
              <div className="flex gap-5 flex-wrap">
                <div className="md:w-[100%] w-[100%]">
                  <Input
                    label={"Title"}
                    placeholder={"Enter title"}
                    name={"title"}
                    className={"border w-full py-3"}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="my-2 w-full">
                  <label htmlFor="additionalImagesInput" className="block mt-2">
                    Additional Images
                  </label>
                  <input
                    accept="image/*"
                    onChange={handleAdditionalImagesChange}
                    name="additionalImages"
                    type="file"
                    id="additionalImagesInput"
                    className="border bg-lightGray w-full py-3 rounded-md px-3"
                    multiple
                  />
                  <div className="mt-4 flex flex-wrap justify-start">
                    {additionalImages.map((image, index) => (
                      <img key={index} src={image} className="w-20 h-20 rounded-xl m-1" alt={`Additional ${index}`} />
                    ))}
                  </div>
                </div>

                <div className="md:w-[100%] w-[100%]">
                  <label htmlFor="description" className="block mt-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter description"
                    name="description"
                    className="border bg-lightGray w-full py-3 rounded-md px-3"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
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
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7237 75.2124 7.5536C69.5422 4.3835 63.2754 2.54662 56.7378 2.13328C51.7663 1.79038 46.7978 2.57991 42.0637 4.45831C39.7241 5.36619 38.2204 7.87785 38.8576 10.3033C39.4947 12.7288 41.9678 14.1964 44.3732 13.625C48.2273 12.6892 52.2455 12.4558 56.1368 12.9481C60.8911 13.5571 65.4579 15.2143 69.4444 17.8268C73.431 20.4394 76.7381 24.0127 79.0924 28.332C81.1135 31.9041 82.4931 35.8221 83.166 39.8758C83.6313 42.6262 85.9621 44.3779 88.3949 43.7408Z"
                      fill="currentColor"
                    />
                  </svg>
                  Uploading...
                </button>
              ) : (
                <Button className={"w-full bg-primary h-11 mt-4 rounded-md"} label={"Add News"} />
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddNews;
