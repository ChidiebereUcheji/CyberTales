import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import './home.css'
// import cybertales from '../assets/cybertales.png'
import { Link } from "react-router-dom"
import { selectUserInfo } from "../slices/authSlice"
import { useSelector } from "react-redux"
import Loader from "../components/Loader"

const Home = () => {

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

      <div className="flex flex-col items-center justify-center gap-0.5">
        <h1 style={{fontWeight:800}} className="text-[#004C85] text-[40px]">{(fetchedUser && fetchedUser.name) ? fetchedUser.name.toUpperCase() : 'Guest'}</h1>
        <p style={{fontWeight:700}} className="text-[#004C85] text-[34px]">Cybertales</p>
        {/* <img style={{width:'100px', height:'50px', objectFit:'contain'}} src={cybertales} alt="Cybertales" /> */}
      </div>

      <Link
      style={{width:'80%',padding:'20px', fontStyle:'italic', fontWeight:'bold', margin:'auto'}}
      className="bg-[#004C85] text-center text-[#CDE9FF]"
      to='/game' >PLAY GAME</Link>
      <Link 
       style={{width:'80%',padding:'20px', fontStyle:'italic', fontWeight:'bold', margin:'auto'}}
      className="bg-[#004C85] text-center text-[#CDE9FF]"
      to='/login'>QUIT</Link>

     </div>

    </div>
  )
}

export default Home
