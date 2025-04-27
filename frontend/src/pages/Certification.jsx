// import React from 'react'
import Navbar from '../components/Navbar'
import './leaderboard.css'
import certificationEmpty from '../assets/CybertalesCertificateEmpty.png'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../slices/authSlice'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'

const Certification = () => {
     const [fetchedUser, setFetchedUser] = useState({})
     // const navigate = useNavigate();
     const userInfo = useSelector(selectUserInfo)
     const [isLoading, setIsLoading] = useState(false);
   
      // eslint-disable-next-line no-constant-binary-expression
      let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5000/api'
   
      console.log(userInfo)
   
     useEffect(()=>{
         const fetchUser = async()=>{
           setIsLoading(true);
               const myHeaders = new Headers();
                 myHeaders.append("Authorization",`Bearer ${userInfo.token}`);
   
                 const requestOptions = {
                 method: "GET",
                 headers: myHeaders,
                 redirect: "follow"
                 };
   
                 fetch(`${API}/auth/get-me`, requestOptions)
                 .then((response) => response.json())
                 .then((result) => {
                   setIsLoading(false);
                     setFetchedUser(result.data.user)
                     console.log(result.data.user)})
                 .catch((error) => console.error(error));
   
         }
   
         fetchUser()
     },[])

  return (
    <div className="homeContainer">
    {isLoading ? <Loader /> : null}
   <Navbar />

   <div className="homeInnerContainer">

    <div className='certificationContainer'>

        <img src={certificationEmpty} alt="Certificate" />
        <p className='certificateName'>{(fetchedUser && fetchedUser.name) ? fetchedUser.name.toUpperCase() : 'Guest User'}</p>

    </div>

    </div>
      
    </div>
  )
}

export default Certification
