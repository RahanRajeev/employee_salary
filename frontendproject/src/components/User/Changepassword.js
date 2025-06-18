import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Changepassword = () => {
    const [currentpass,setcurrentpass]=useState('')
  const [newpass,setnewpass]=useState('')
  const [confirmpass,setconfirmpass]=useState('')
  const changenav=useNavigate()
  const changepass=async()=>{
    const uid=sessionStorage.getItem('uid')
    const res=await axios.post('https://employee-salary-1.onrender.com/user/userchangepassword',{currentpass,newpass,confirmpass,uid})
    console.log(uid);

    if(res.data.status==='change'){
      changenav('/')
    }else{
        changenav('/userhome')
    }
  }
  return (
    <>
    <style>
        {`
          body {
            background-color: #f4f7fc;
            font-family: Arial, sans-serif;
          }

          .password-form-container {
            width: 40%;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            background: #ffffff;
            text-align: center;
          }

          .password-label {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            display: block;
            margin-bottom: 10px;
            text-align: left;
          }

          .password-input {
            width: 100%;
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            margin-bottom: 15px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .password-submit {
            margin-top: 10px;
            padding: 12px 25px;
            font-size: 18px;
            color: #fff;
            background: #007bff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .password-submit:hover {
            background: #0056b3;
          }
        `}
      </style>
      <div className="password-form-container">
        <form onSubmit={changepass}>
        <label className="password-label">Current Password:</label>
        <input type="password" className="password-input" placeholder="Enter current password" onChange={(e) => setcurrentpass(e.target.value)} />
        
        <label className="password-label">New Password:</label>
        <input type="password" className="password-input" placeholder="Enter new password" onChange={(e) => setnewpass(e.target.value)}/>
        
        <label className="password-label">Confirm Password:</label>
        <input type="password" className="password-input" placeholder="Confirm new password" onChange={(e) => setconfirmpass(e.target.value)}/>
        
        <button className="password-submit">Change Password</button>
        </form>
      </div>
    </>
  )
}

export default Changepassword