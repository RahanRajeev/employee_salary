import React,{ useState, useEffect } from 'react'
import './Editprofile.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Editprofile = ({name,email,phone,gender,image,setname,setemail,setgender,setphone,setimage}) => {
    const nav=useNavigate()
    const editprofile=async(e)=>{
      e.preventDefault()
      const uid=sessionStorage.getItem('uid')
      const response=await axios.post("http://localhost:7000/user/editprofile",
      {name,email,gender,phone,uid,image},
      {headers:{'Content-Type':'multipart/form-data'}}
      
      )
      console.log(response.data.status)
      if(response.data.status==='edit'){
        alert('update successfully')
        nav('/viewprofile')
        
      }
    }

   
  return (
    <div>
       <div className="container">
            <h1>Edit Profile</h1>
            <form className="edit-profile-form" onSubmit={editprofile}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e)=>setname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>setemail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={gender}
                        onChange={(e)=>setgender(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e)=>setphone(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profile-pic">Profile Picture</label>
                    <input
                        type="file"
                        id="profile-pic"
                        name="profilePic"
                        accept="image/*"
                        onChange={(e)=>setimage(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-btn">Save Changes</button>
            </form>
        </div>


    </div>
  )
}

export default Editprofile