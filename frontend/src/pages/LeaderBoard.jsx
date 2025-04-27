import Navbar from "../components/Navbar"
import './leaderboard.css'
import leaderBG from '../assets/leaderBGImage.png'
import gameIcon from '../assets/gameIcon.png';
import gold from '../assets/MedalsGold.png';
import bronze from '../assets/MedalsBronze.png';
import silver from '../assets/MedalsSilver.png';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../slices/authSlice";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";



const LeaderBoard = () => {
    // const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);
    const [allUsers, setAllUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const usersPerPage = 3;
    const [isLoading, setIsLoading] = useState(false);

         // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
//    let API =  'http://localhost:5050/api'


const [fetchedUser, setFetchedUser] = useState({})

  //  console.log(userInfo)

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


   useEffect(() => {
    const fetchUsers = async () => {
        setIsLoading(true)
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userInfo.token}`);
  
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
  
      fetch(`${API}/auth/get-users-for-leaderboard?page=${currentPage}&limit=${usersPerPage}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            setIsLoading(false)
          if (result.message === "All Users sorted by pointsScored") {
            setAllUsers(result.users);
            setTotalUsers(result.totalUsers);
          }
        })
        .catch((error) => console.error(error));
    };
  
    fetchUsers();
  }, [currentPage]);

    const handleNext = () => {
        if (currentPage * usersPerPage < totalUsers) {
          setCurrentPage((prev) => prev + 1);
        }
      };
      
      const handlePrev = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      };


  return (
    <div className="homeContainer">
    {isLoading ? <Loader /> : null}
   <Navbar />

   <div className="homeInnerContainer">

        <div className="leaderboardContainer">

<div style={{display:'flex',  marginTop:window.innerWidth < 960  ?  '-100px'  :  window.innerHeight < 680 ? '-50px' : ""}} className="flex md:flex-row flex-col items-center justify-center gap-2">
<h2 style={{color:'#004C85', fontSize:window.innerWidth < 960 ? '18px' : '32px', fontWeight:900, textAlign:'center', fontFamily:'Open Sans'}} >LEADERBOARD</h2>

{userInfo?.user && fetchedUser?.pointsScored >= 6 ? <Link to='/certification' style={{padding:'7px'}} className="flex items-center justify-center bg-[#004C85] p-2 text-white cursor-pointer">View Certificate</Link> : null }
</div>
          

            <div>
            <img style={{width: window.innerWidth < 960  ?  '90%'  : '100%', height:'100px', objectFit:'cover', margin: "auto"}} src={leaderBG} alt="LeaderBoard Image" />

         <div>
            {
                allUsers?.map((data, index)=>(


                <div key={data._id} style={{backgroundColor: index === 0 ? '#3A2F05' : index === 1 ?  '#292E37'  : index === 2 ?  "#271304"  :  '#0A0A0A'}} className="leaderBoardItemContainer">

                <div className="leaderBoardLeft">

                <img  style={{width:'25px', height:'25px', objectFit:'contain',display:'flex', alignItems:'center', justifyContent:'center' }} src={index === 0  ?  gold : index === 1 ? silver : index === 2 ? bronze : gameIcon } alt="gold" />

                    <div style={{gap:'20px', display:'flex', alignItems:'center', justifyContent:'space-between', width:'50%'}} className="">
                    <img  style={{width:'25px', height:'25px', objectFit:'contain', flex:1}} src={gameIcon} alt="gold" />
                        <div style={{flex:4}}>
                             <p style={{fontSize:window.innerWidth < 960 ? '14px' : '16px'}}>{data?.name}</p> 
                             <p style={{color:'lightgray', fontSize:window.innerWidth < 960 ? '12px' : '14px'}}>{data.department || "Occupation"}</p>
                        </div>

                    </div>

                </div>
              
                <div className="leaderBoardRight">
                      <p>{ data?.pointsScored * 25 }</p>
                         <p>PTS</p>
                </div>

            
            
            </div>
                    
                ))
            }
         </div>


                {/* <div className="leaderBoardItemContainer">

                    <div className="leaderBoardLeft">

                    <img  style={{width:'25px', height:'25px', objectFit:'contain'}} src={gold} alt="gold" />

                        <div style={{gap:'20px'}} className="flex items-center justify-center">
                        <img style={{width:'25px', height:'25px', objectFit:'contain'}} src={gameIcon} alt="gold" />
                            <div>
                                <p>John Dodder</p> 
                                <p style={{color:'lightgray', fontSize:'14px'}}>Occupation</p>
                            </div>

                        </div>

                    </div>

                    <div className="leaderBoardRight">
                        <p>2000</p>
                            <p>PTS</p>
                    </div>



                    </div> */}

                    {/* <div className="leaderBoardItemContainer">

                    <div className="leaderBoardLeft">

                    <img  style={{width:'25px', height:'25px', objectFit:'contain'}} src={gold} alt="gold" />

                        <div style={{gap:'20px'}} className="flex items-center justify-center">
                        <img  style={{width:'25px', height:'25px', objectFit:'contain'}} src={gameIcon} alt="gold" />
                            <div>
                                <p>John Dodder</p> 
                                <p style={{color:'lightgray', fontSize:'14px'}}>Occupation</p>
                            </div>

                        </div>

                    </div>

                    <div className="leaderBoardRight">
                        <p>2000</p>
                            <p>PTS</p>
                    </div>



                    </div> */}

                    {/* <div className="leaderBoardItemContainer">

                    <div className="leaderBoardLeft">

                    <img  style={{width:'25px', height:'25px', objectFit:'contain'}} src={gold} alt="gold" />

                        <div style={{gap:'20px'}} className="flex items-center justify-center">
                        <img  style={{width:'25px', height:'25px', objectFit:'contain'}} src={gameIcon} alt="gold" />
                            <div>
                                <p>John Dodder</p> 
                                <p style={{color:'lightgray', fontSize:'14px'}}>Occupation</p>
                            </div>

                        </div>

                    </div>

                    <div className="leaderBoardRight">
                        <p>2000</p>
                            <p>PTS</p>
                    </div>



                    </div> */}

          

            </div>

          

        </div>


        <div style={{width:'50%', margin:'10px auto', position:'absolute',left:'25%',bottom:window.innerWidth < 600 ? '-80px' : '0px', zIndex:'1000', gap:'80%'}} className="flex items-center justify-end">
              <IoArrowBackCircleOutline 
            //   onClick={()=>navigate(-1)}
            onClick={handlePrev}
             className="cursor-pointer"
               size={25}/>

              <IoArrowForwardCircleOutline 
               onClick={handleNext}
            //    onClick={clickNextAction}
                size={25} className="cursor-pointer"/>
        
              </div>

   </div>
    </div>
  )
}

export default LeaderBoard
