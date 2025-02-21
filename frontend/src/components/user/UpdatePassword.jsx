import React, { useEffect, useState } from 'react'
import { useUpdatePasswordMutation } from '../../Redux/api/userApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UserLayout from '../layout/UserLayout';

const UpdatePassword = () => {

const[oldPassword,setOldPassword] = useState("");
const [password,setPassword] = useState("");
const navigate = useNavigate();
const [updateProfile,{isLoading,error,isSuccess}]=useUpdatePasswordMutation();


useEffect(() => {
    if (error) {
      console.log("Error Response:", error); // Log full error to debug structure
  
      const errorMessage = error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorMessage);
    }
  
    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);
  

const submitHandler = (e) => {

    e.preventDefault();

    const userData = {

      oldPassword, password

    };

    updateProfile(userData)
  };


  return (
    <UserLayout>
    <div className="row wrapper">
    <div className="col-10 col-lg-8">
      <form className="shadow rounded bg-body" onSubmit={submitHandler}>
        <h2 className="mb-4">Update Password</h2>
        <div className="mb-3">
          <label htmlFor="old_password_field" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            id="old_password_field"
            className="form-control"
            value={oldPassword}
            onChange={(e)=>setOldPassword(e.target.value)}
          />    
        </div>

        <div classNameName="mb-3">
          <label htmlFor="new_password_field" className="form-label">
            New Password
          </label>
          <input
            type="password"
            id="new_password_field"
            className="form-control"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn update-btn w-100" disabled={isLoading}>
         {isLoading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  </div>
  </UserLayout>
  )
}

export default UpdatePassword