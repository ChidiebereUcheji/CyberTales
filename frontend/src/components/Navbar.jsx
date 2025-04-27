import {  NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/Logo3.png'
import profile from '../assets/user-circle.png'
// import settings from '../assets/setting-done-02.png'
import settings from '../assets/Logo2.png'
import logout from '../assets/logout-05.png'
import menu from '../assets/vector.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import './navbar.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUserInfo, selectUserInfo } from '../slices/authSlice'

const Navbar = () => {
  const [showButton, setShowButton] = useState(false)

  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const userInfo = useSelector(selectUserInfo)

  const handleLogout=async()=>{
    dispatch(clearUserInfo())
    navigate("/login");
    window.location.reload();
}

  return (<>
  {
    window.innerWidth < 960 
    ?
    <>
    {showButton && <div onClick={()=>setShowButton(false)} className='navSlideContainer'>
        <div style={{marginTop:"0px",paddingTop: '40px'}} className='w-[230px] bg-[#004C85] h-[100vh] flex flex-col gap-8'>

            <NavLink to="/profile" style={{paddingBottom:"20px", marginRight:'30px'}} className='flex gap-5 items-center justify-center text-[#FAFDFF] border-b-1 border-[#FAFDFF] '>
              <img style={{width:'35px', height:'35px', objectFit:'contain'}} src={profile} alt="Profile" />
              <p className='text-xl'>Profile</p>
            </NavLink>
            <NavLink to='/game' style={{paddingBottom:"20px", marginRight:'30px'}}  className='flex gap-5 items-center justify-center text-[#FAFDFF] border-b-1 border-[#FAFDFF]'>
              <img style={{width:'35px', height:'35px', objectFit:'contain'}} src={settings} alt="Profile" />
              <p className='text-xl'>Game</p>
            </NavLink>
            <NavLink to='/leaderboard' style={{paddingBottom:"20px", marginRight:'30px'}}  className='flex gap-5 items-center justify-center text-[#FAFDFF] border-b-1 border-[#FAFDFF]'>
              <img style={{width:'35px', height:'35px', objectFit:'contain'}} src={settings} alt="Profile" />
              <p className='text-xl'>LeaderBoard</p>
            </NavLink>
          {userInfo?.name  && <div onClick={handleLogout} style={{paddingBottom:"20px", marginRight:'30px'}}  className='flex gap-5 items-center justify-center text-[#FAFDFF] border-b-1 border-[#FAFDFF]'>
              <img style={{width:'35px', height:'35px', objectFit:'contain'}} src={logout} alt="Profile" />
              <p className='text-xl'>Logout</p>
            </div>}

        </div>

      </div>}

     <div style={{width:'80%', margin:'10px auto'}} className='flex items-center justify-between pr-2 pl-2 '>
      
      <div onClick={()=>setShowButton(true)} style={{width:'23px', height:'15px', cursor:'pointer'}}>
        <img style={{width:'100%', height:'100%', objectFit:'contain'}} src={menu} alt="MENU" />
      </div>

      <div style={{width:'23px', height:'15px'}}>
       <IoIosNotificationsOutline size={30} />
      </div>

    </div> 

    </>
    : 
    <div style={{backgroundColor:'white'}} className='navOutsideContainer'>

    <div className='navInnerContainer'>

    <NavLink to="/" style={{width:'200px', height:'80px'}}>

      <img 
      style={{width:'200px', height:'80px', objectFit:'contain'}} 
      src={logo} alt="Logo" />

      </NavLink>

  <div className='flex items-center justify-center gap-[45px]'>
  <NavLink to='/game' className=' text-[#004C85] '  >Game</NavLink>
 {userInfo?.user &&  <NavLink to='/profile' className='text-[#004C85] open-sans-font'>Profile</NavLink>}
  <NavLink to='/leaderboard' className='text-[#004C85] open-sans-font'>LeaderBoard</NavLink>
  {/* <Link to='/settings' className='text-[#004C85]'>Settings</Link> */}
  <div className='flex items-center justify-center gap-1'>

 {userInfo?.user && <div  onClick={handleLogout}  className=' bg-[#004C85] text-[#FAFDFF]' style={{borderRadius:'90px', padding:'15px 32px'}}>Logout</div>}
  <NavLink to='/#'>
  <IoIosNotificationsOutline size={30} />
  </NavLink>

  </div>
 



  </div>

    </div>



  </div>
  }
   

    </>
  )
}

export default Navbar
