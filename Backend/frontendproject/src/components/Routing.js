import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Mainhome from "./Mainhome";
import Userhome from './User/Userhome';
import User from './User/User';
import Login from './Login';
import Viewprofile from './User/Viewprofile';
import Editprofile from './User/Editprofile';
import Complaint from './User/Complaint';
import Changepassword from './User/Changepassword';
import Adminhome from './Admin/Adminhome';
import AdminChangepassword from './Admin/Changepassword';
import Viewcomplaint from './Admin/Viewcomplaint';
import Viewuser from './Admin/Viewuser';
import Viewreply from './User/Viewreply';
import Managecatagory from './Admin/Managecatagory';
import Viewcategory from './Admin/Viewcategory';
import Addbudget from './User/Addbudget';
import Addexpense from './User/Addexpense';
import Viewexpense from './User/Viewexpense';
import Addreview from './User/Addreview';
import Viewreview from './Admin/Viewreview';
import Admin from './Admin/Admin';

const Routing = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Mainhome/>}></Route>
            <Route path='/userhome' element={<Userhome/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/viewprofile' element={<Viewprofile/>}></Route>
            <Route path='/viewprofile' element={<Viewprofile/>}></Route>
            <Route path='/editprofile' element={<Editprofile/>}></Route>
            <Route path='/complaint' element={<Complaint/>}></Route>
            <Route path='/changepassword' element={<Changepassword/>}></Route>
            <Route path='/adminhome' element={<Adminhome/>}></Route>
            <Route path='/admin' element={<Admin/>}></Route>
            <Route path='/adminchangepass' element={<AdminChangepassword/>}></Route>
            <Route path='/viewcomplaint' element={<Viewcomplaint/>}></Route>
            <Route path='/viewuser' element={<Viewuser/>}></Route>
            <Route path='/viewreply' element={<Viewreply/>}></Route>
            <Route path='/managecatagory' element={<Managecatagory/>}></Route>
            <Route path='/viewcategory' element={<Viewcategory/>}></Route>
            <Route path='/addbudget' element={<Addbudget/>}></Route>
            <Route path='/addexpense' element={<Addexpense/>}></Route>
            <Route path='/viewexpense' element={<Viewexpense/>}></Route>
            <Route path='/addreview' element={<Addreview/>}></Route>
            <Route path='/viewreview' element={<Viewreview/>}></Route>
            <Route path='/user' element={<User/>}></Route>


            
        </Routes>

    </div>
  )
}

export default Routing