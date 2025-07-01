import {BrowserRouter, Routes, Route} from "react-router-dom"

import Signup from "./Pages/users/Signup";
import Login from "./Pages/users/Login";
import Update from "./Pages/users/Update";
import Dashboard from "./Pages/dashboard/Dashboard";
import Nopage from "./Pages/users/Nopage";
import Loading from "./Pages/users/Loading";
import Profile from "./Pages/profile/Profile";
import ProfileHome from "./Pages/profile/ProfileHome";
import UpdateProfile from "./Pages/profile/UpdateProfile";
import Market from "./Pages/NavbarLink/Market";
import Video from "./Pages/NavbarLink/Video";
import Clock from "./Pages/NavbarLink/Clock";
import Nofeature from "./Pages/users/Nofeature";


import Protected from "./Utils/Protected";
import Owner from "./Utils/Owner";

import Contact from "./Pages/profile/Contacts";
import Person from "./Pages/profile/Person";



import "./Styles/ReusableForm.css";
import "./Styles/ReuseAll.css";
import "./App.css";


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/profile/:userId" element = {<Protected><Profile /></Protected>} />
                <Route path="/" element = {<Dashboard />} />
                <Route path="/login" element = {<Login />} />
                <Route path="/signup" element = {<Signup />} />
                <Route path="/update/password" element = {<Update />} />
                <Route path="*" element = {<Nopage />} />
                <Route path="/loading" element = {<Loading />} />
                <Route path="/profile/:userId/home" element = {<Owner><ProfileHome /></Owner>} />
                <Route path="/profile/:userId/update/profile" element ={<Protected><UpdateProfile /></Protected>} />
                <Route path="/marketplace" element= {<Market />} />
                <Route path="/video" element= {<Video/>} />
                <Route path="/clock" element = {<Clock />} />
                <Route path="/under/development" element = {<Nofeature />} />

                <Route path="/person/:userId" element= {<Person />}></Route>


                <Route path="/profile/:userId/search/users" element =  {<Contact />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;