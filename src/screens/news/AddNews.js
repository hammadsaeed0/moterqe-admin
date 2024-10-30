import React, { useState } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddNews = ({ isModalOpen, setIsModalOpen, closeModal, setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [additionalImage, setAdditionalImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subContent, setSubContent] = useState("");

  // Quill editor configuration
  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, { 'font': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'link', 'image', 'video', 'color', 'background', 'align'
  ];

  const handleAdditionalImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAdditionalImage(URL.createObjectURL(file)); // Preview the image
      setImageFile(file); // Store the file for upload
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleContentChange = (value) => {
    setSubContent(value);
  };

  // Submit form and upload image
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
      toast.error("An image is required.");
      return;
    }

    setLoading(true);
    let imageUrl = "";

    // Prepare FormData for the image
    const formData = new FormData();
    formData.append("images", imageFile);

    // Upload image
    try {
      const uploadResponse = await axios.post(`http://35.88.137.61/api/api/upload`, formData);

      if (uploadResponse?.data?.data?.[0]) {
        imageUrl = uploadResponse.data.data[0];
      } else {
        toast.error("No data received from the image upload.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
      setLoading(false);
      return;
    }

   
    const params = {
      title: title,
      content:subContent,
      subContent:content,
      images:imageUrl,
    };

    try {
      const res = await axios.post(`${Base_url}/admin/blog`, params);
      
      if (res.status === 201) {
        toast.success(res.data?.message);
        const blogsRes = await axios.get(`${Base_url}/admin/blog`);
        setUsers(blogsRes?.data?.blogs);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Blog post submission failed:", error);
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

                <div className="md:w-[100%] w-[100%]">
                  <Input
                    label={"Small Description"}
                    placeholder={"Enter Description"}
                    name={"content"}
                    className={"border w-full py-3"}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="my-2 w-full">
                  <label htmlFor="additionalImageInput" className="block mt-2">
                     Blog Image
                  </label>
                  <input
                    accept="image/*"
                    onChange={handleAdditionalImageChange}
                    name="additionalImage"
                    type="file"
                    id="additionalImageInput"
                    className="border bg-lightGray w-full py-3 rounded-md px-3"
                  />
                  {additionalImage && (
                    <div className="mt-4 flex justify-start">
                      <img src={additionalImage} className="w-20 h-20 rounded-xl m-1" alt="Additional" />
                    </div>
                  )}
                </div>

                <div className="md:w-[100%] w-[100%]">
                  <label htmlFor="description" className="block mt-2">
                    Details
                  </label>
                  
                  <ReactQuill 
                    theme="snow" 
                    value={subContent} 
                    onChange={handleContentChange} 
                    placeholder="Start writing your blog post here..."
                    modules={modules}
                    formats={formats}
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
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5533C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7237 75.2124 7.5536C69.5422 4.3835 63.2754 2.54662 56.7378 2.13328C51.7663 1.79038 46.7978 2.57991 42.0635 4.46458C39.5147 5.48402 38.0532 8.01753 38.6903 10.4429C39.3274 12.8683 41.7717 14.2154 44.2557 13.5923C47.8514 12.6986 51.5674 12.5269 55.1917 13.0889C59.7978 13.779 64.1586 15.4017 68.0566 17.8759C71.9545 20.3502 75.2724 23.6395 77.819 27.5723C79.9141 30.6799 81.4443 34.115 82.338 37.7555C82.9636 40.0969 85.5422 41.5531 87.9676 40.9161Z"
                      fill="currentColor"
                    />
                  </svg>
                  Loading...
                </button>
              ) : (
                <Button label={'Upload News'} className={' mt-4 bg-primary'} text="Upload News" />
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddNews;
