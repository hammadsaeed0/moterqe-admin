import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Base_url } from "../../utils/Base_url";
import axios from "axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Modal from "../../components/modal";
import { MdClose } from "react-icons/md";

const AddCategory = ({ isModalOpen, setIsModalOpen, closeModal, setUsers }) => {
  const bannerSubmit = async (values) => {
    if (values.name.value.length === 0) {
      toast.error("Please Enter category name!");
    } 
    else if (values.image.value.length === 0) {
      toast.error("Please Choose iamge!");
    } 
    else {


      let profilephoto = " ";

      try {
        let param = new FormData();

        param.append("avatars", values.image.files[0]);

        profilephoto = await axios.post(`https://beauty-bridge-a647ece2d453.herokuapp.com/customer/UploadImage`, param);

        console.log(profilephoto.data[0].url, "=====profile photo===");
        // console.log(profilephoto?.data?.response,'=====profile photo2===');
      } catch (error) {
        console.log(error);
      }


      const params = {
        name: values.name.value,
        image:profilephoto.data[0].url,
      };
      await axios
        .post(`${Base_url}/category/create`, params)
        .then((res) => {
          console.log(res);

          if (res.data.success === true) {
            toast.success("Category Add Successfully!");
            setIsModalOpen(false);
            axios
              .get(`${Base_url}/category/getAll`)
              .then((res) => {
                console.log(res.data);

                setUsers(res.data.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="">
          <div className=" p-3 flex justify-between items-center">
            <div></div>
            <h1 className="capitalize h4 font-semibold">Add Category</h1>
            <MdClose onClick={() => setIsModalOpen(false)} size={25} />
          </div>
          <hr />
          <div className=" p-5">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                bannerSubmit(e.target);
              }}
            >
              <div className=" flex gap-5 flex-wrap">
                <div className=" w-full">
                  <Input
                    label={"Name"}
                    placeholder={""}
                    name={"name"}
                    className={"border  w-full  py-3"}
                  />
                  <Input
                    label={"Image"}
                    placeholder={""}
                    type={'file'}
                    name={"image"}
                    className={"border  w-full  py-3"}
                  />
                </div>
              </div>

              <Button
                label={"save"}
                type={"submit"}
                className={
                  "    bg-secondary mt-3 uppercase text-white py-2 w-full"
                }
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddCategory;
