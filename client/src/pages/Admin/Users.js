import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import  {URL} from "../../utils/constants";

const Users = () => {
  const [AllUsers, setAllUsers] = useState([]);

  //getall products
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(URL+"/api/v1/user/get-allUser");
      setAllUsers(data.users);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Users</h1>
          <div className="d-flex flex-wrap">
            {AllUsers?.map((u) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{u.name}</h5>
                    <p className="card-text">{u.email}</p>
                  </div>
                </div>
        
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
