import React, { useEffect, useState } from 'react'
import { useForgotPasswordMutation } from '../../Redux/api/userApi'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

const [email,setEmail]= useState("")

const navigate = useNavigate()

const [forgotPassword,{isLoading,error,isSuccess},] = useForgotPasswordMutation();

const {isAuthenticated} = useSelector((state)=>state.auth);

useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  
    if (error) {  // ✅ Only trigger toast if `error` exists
      toast.error(error?.data?.message);
    }


    if (isSuccess) {  // ✅ Only trigger toast if `error` exists
        toast.success('Recovery email sent. Please check your inbox');
      }
  

  }, [error,isAuthenticated,isSuccess]); // ✅ Correct dependency array
  
  
  
    const submitHandler = (e) => {
  
      e.preventDefault();
  
    
  
 forgotPassword({email})
    };
  
  return (
    <div>

<div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
         onSubmit={submitHandler}
        >
          <h2 className="mb-4">Forgot Password</h2>
          <div className="mt-3">
            <label htmlFor="email_field" className="form-label">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <button
            id="forgot_password_button"
            type="submit"
            className="btn w-100 py-2"
            disabled={isLoading}
          >
          {isLoading? "Sending Email" : "Send Verification Link"}
          </button>
        </form>
      </div>
    </div>

        
    </div>
  )
}

export default ForgotPassword