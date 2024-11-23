import React, { useEffect, useState } from "react";
import Wrapper from "../Wrapper";
import Button from "../../components/Button";
import axios from "axios";
import { Base_url } from "../../utils/Base_url";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import AddBannerAds from "./AddBannerAds";
const BannerAds = () => {
  const [users, setUsers] = useState([]);
  const [singleData, setSingleData] = useState({});
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isUpdateOpen2, setIsUpdateOpen2] = useState(false);
  const [singleUser, setSingleUser] = useState({});
  const UpdateModal = () => {
    setIsUpdateOpen(true);
  };

  const [deleteUser, setDeleteUser] = useState({});

  useEffect(() => {
    axios
      .get(`${Base_url}/user/ads`)
      .then((res) => {
        console.log("--->>>", res);

        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(users);

  const removeFunction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#A47ABF",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${Base_url}/user/ads/${id}`)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
  
              // Update the state by filtering out the deleted ad
              setUsers((prevUsers) => ({
                ...prevUsers,
                bannerAds: prevUsers.bannerAds.filter((ad) => ad._id !== id),
                sideAds: prevUsers.sideAds.filter((ad) => ad._id !== id),
                special: prevUsers.special.filter((ad) => ad._id !== id),
              }));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };
  

  return (
    <Wrapper>
      <AddBannerAds
        setIsModalOpen={setIsUpdateOpen}
        isModalOpen={isUpdateOpen}
        setUsers={setUsers}
        getData={singleUser}
      />
      <div className=" flex   justify-between items-center">
        <div>
          <h2 className="main_title">Banner Ads</h2>
        </div>

        <div>
          <Button
            className={"  bg-primary py-2.5"}
            label={`Add Banner Ads`}
            onClick={() => setIsUpdateOpen(true)}
          />
        </div>
      </div>

      <section className="mb-20 mt-7 text-gray-800">
        <div className="block rounded-lg shadow-lg">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full mb-0">
                    <thead className=" bg-primary">
                      <tr className=" rounded-lg whitespace-nowrap ">
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          No
                        </th>
                        <th
                          scope="col"
                          className=" text-sm text-white  font-bold px-6 py-4"
                        >
                          Image
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Position
                        </th>

                        <th
                          scope="col"
                          className="text-sm  text-white   font-bold px-6 py-4"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Mapping bannerAds */}
                      {users?.bannerAds && users?.bannerAds.length > 0 && users?.bannerAds.map((item, index) => (
                        <tr key={`banner-${index}`} className="bg-white border-t rounded-md">
                          <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <p className="mb-0.5 font-medium text-black">Banner #{index + 1}</p>
                          </th>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                            <img src={item.imageUrl} className="w-20 h-20 rounded-md mx-auto" alt="" />
                          </td>
                          <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                            <span className="text-base text-black py-1 px-2.5 leading-none bg-green-200 rounded-full">
                              {item.position}
                            </span>
                          </td>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center gap-2">
                           
                              <button onClick={() => removeFunction(item._id)} className="text-red-500">
                                <img src={require("../../assets/image/del.png")} alt="Delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Mapping sideAds */}
                      {users?.sideAds && users?.sideAds.length > 0 && users?.sideAds.map((item, index) => (
                        <tr key={`side-${index}`} className="bg-white border-t rounded-md">
                          <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <p className="mb-0.5 font-medium text-black">Side Ad #{index + 1}</p>
                          </th>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                            <img src={item.imageUrl} className="w-20 h-20 rounded-md mx-auto" alt="" />
                          </td>
                          <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                            <span className="text-base text-black py-1 px-2.5 leading-none bg-green-200 rounded-full">
                              {item.position}
                            </span>
                          </td>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center gap-2">
                            
                              <button onClick={() => removeFunction(item._id)} className="text-red-500">
                                <img src={require("../../assets/image/del.png")} alt="Delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {/* Mapping special ads */}
                      {users?.special && users?.special.length > 0 && users?.special.map((item, index) => (
                        <tr key={`special-${index}`} className="bg-white border-t rounded-md">
                          <th scope="row" className="text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <p className="mb-0.5 font-medium text-black">Special #{index + 1}</p>
                          </th>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap text-center">
                            <img src={item.imageUrl} className="w-20 h-20 rounded-md mx-auto" alt="" />
                          </td>
                          <td className="text-sm font-normal text-center px-6 py-4 whitespace-nowrap">
                            <span className="text-base text-black py-1 px-2.5 leading-none bg-green-200 rounded-full">
                              {item.position}
                            </span>
                          </td>
                          <td className="align-middle text-sm font-normal px-6 py-4 whitespace-nowrap">
                            <div className="flex justify-center gap-2">
                          
                              <button onClick={() => removeFunction(item._id)} className="text-red-500">
                                <img src={require("../../assets/image/del.png")} alt="Delete" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default BannerAds;
