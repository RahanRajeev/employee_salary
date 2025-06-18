import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Complaint = () => {
    const comnav=useNavigate()
    const[complaint,setcomplaint]=useState('')
    const complaintpost=async(e)=>{
        e.preventDefault()
        const uid=sessionStorage.getItem('uid')
        const res=await axios.post("http://localhost:7000/user/complaint",{complaint,uid})
        
        if(res.data.status==='ok'){
            comnav('/userhome')
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

          .complaint-form-container {
            width: 50%;
            margin: 50px auto;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
            background: #ffffff;
            text-align: center;
          }

          .complaint-label {
            font-size: 20px;
            font-weight: bold;
            color: #333;
            display: block;
            margin-bottom: 15px;
          }

          .complaint-input {
            width: 100%;
            padding: 12px;
            font-size: 18px;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .complaint-submit {
            margin-top: 15px;
            padding: 12px 25px;
            font-size: 18px;
            color: #fff;
            background: #007bff;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background 0.3s;
          }

          .complaint-submit:hover {
            background: #0056b3;
          }
        `}
      </style>
      <div className="complaint-form-container">
        <form onSubmit={complaintpost}>
        <label className="complaint-label">Enter your complaint:</label>
        <input type="text" className="complaint-input" placeholder="Type your complaint here..." onChange={(e) => setcomplaint(e.target.value)}/>
        <button className="complaint-submit" type='submit'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Complaint