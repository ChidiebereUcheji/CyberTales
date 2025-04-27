import  { useState } from 'react'
import { BiSolidDashboard } from 'react-icons/bi'
import { BiSolidRightArrow } from 'react-icons/bi'
import { BiSolidDownArrow } from 'react-icons/bi'
import { BiMoneyWithdraw } from 'react-icons/bi'
// import { SiWebmoney } from 'react-icons/si'
import { AiFillSetting } from 'react-icons/ai'
// import { BsFillSendFill } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearUserInfo } from '../slices/authSlice'
import { CiMenuKebab } from "react-icons/ci";

const AdminSidebar = () => {
  const dispatch = useDispatch()
  const [openInvestments, setOpenInvestments] = useState(false)
  const [openUsers, setOpenUsers] = useState(false)


  const handleLogout=()=>{
    dispatch(clearUserInfo())
    window.location.reload();
  }

  return (
    <div style={{zIndex:55}} className="drawer">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
      {/* Page content here */}
     
      <label style={{ border:'none', color:'white', position:'absolute', top:-60,left:150, height:40, width:40, display:'flex', alignItems:'center',justifyContent:'center'}} htmlFor="my-drawer" className="btn btn-primary drawer-button bg-[#46a0e4] hover:bg-[#46a0e47e]" >
        {/* <FiMenu /> */}
        {/* <img
         src={robot}
         style={{ width:'100%', height:30, objectFit:'cover'}}
        alt='welcome image'
          /> */}
          <CiMenuKebab size={25} />
        </label>
    </div> 
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul style={{display: 'flex', flexDirection:'column', gap:'10px', fontWeight:'bold'}} className="menu p-4 w-60 min-h-full bg-base-200 text-base-content">
        {/* Sidebar content here */}
        <li>
        <img
            src={logo}
            style={{objectFit:'contain', width:200, height:100}}
           alt='welcome image'
  
          />
        </li>
        <li className='flex gap-4 mt-10' ><Link className='flex gap-3' to='/dashboard'> <BiSolidDashboard style={{color:'rgb(58, 135, 224)',fontSize:28}} /> Dashboard  </Link> </li>


        <li className='flex gap-4 ' >
          <div onClick={()=>setOpenUsers(!openUsers)} className='flex justify-between items-center'>

          <div className='flex gap-3 items-center'  > 
        <CgProfile  style={{color:'rgb(58, 135, 224)', fontSize:28}} /> All Users </div>
        {!openUsers ? <BiSolidRightArrow /> : <BiSolidDownArrow />}

          </div>
         
         </li>

         { openUsers &&  <div  className='bg-[#46a0e4] '>
         <li className='flex gap-4 ' ><Link  style={{padding:'10px', paddingLeft:'30px'}}  className='flex gap-3'  to='/usersAccount'> Users Account </Link> </li>
        {/* <li className='flex gap-4 ' ><Link className='flex gap-3'  to='/usersFundManagement'>  Users Fund Management </Link> </li>
        <li className='flex gap-4 ' ><Link className='flex gap-3'  to='/usersAccessManagement'>  Users Access Management  </Link> </li> */}
        <li  className='flex gap-4 ' ><Link style={{padding:'10px', paddingLeft:'30px'}} className='flex gap-3'  to='/usersExport'>  Export Users Email  </Link> </li>
         </div>}
      
       

      


         <li className='flex gap-4 ' >
          <div onClick={()=>setOpenInvestments(!openInvestments)} className='flex justify-between items-center'>

          <div className='flex gap-3 items-center'  > 
        < BiMoneyWithdraw   style={{color:'rgb(58, 135, 224)', fontSize:28}} /> Quiz</div>
        {!openInvestments ? <BiSolidRightArrow /> : <BiSolidDownArrow />}

          </div>
         
         </li>

         { openInvestments &&  <div  className='bg-[#46a0e4]'>
         <li className='flex gap-4 ' ><Link style={{padding:'10px', paddingLeft:'30px'}}  className='flex gap-3'  to='/all-quiz'> All Quizes </Link> </li>
        <li className='flex gap-4 ' ><Link style={{padding:'10px', paddingLeft:'30px'}}  className='flex gap-3'  to='/create-Quiz'>  Create Quiz  </Link> </li>
         </div>}

       
        

        <li onClick={handleLogout} className='flex gap-4 ' ><button className='flex gap-3'  > <AiFillSetting style={{color:'rgb(58, 135, 224)', fontSize:28}} /> Log out  </button> </li>
      
        
      </ul>
    </div>
  </div>
  )
}

export default AdminSidebar
