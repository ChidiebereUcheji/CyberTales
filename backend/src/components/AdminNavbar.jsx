import { useState, useEffect } from 'react'
import { MdNotifications } from 'react-icons/md'
import { BiNotification } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import logo from '../assets/Logo.png'
import robot from '../assets/gameIcon.png'
import { Link } from 'react-router-dom'
import { selectUserInfo } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux'
import { selectFetchedUsers, setFetchedUsers } from '../slices/userSlice'
import Loader from './Loader'


const AdminNavbar = () => {
  const [openNoti, setOpenNoti] = useState(false)
  const userInfo = useSelector(selectUserInfo)
  const fetchedUsersRed = useSelector(selectFetchedUsers)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
  //  let API =  'http://localhost:5050/api'

  useEffect(() => {
    const fetchUsers =async()=>{

      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNyb3duIEFkbWluIiwidXNlcklkIjoiNjVjNjZlZDIxMGYzZTE0YTQ1YTliYWEzIiwiZW1haWwiOiJhbmR5aGF5bGVAbWFpbC5jb20iLCJpYXQiOjE3MDc1MDMzMTR9.a_0wxQhQw21tV7M1zYbQAyvuy_OeuycnOZGIl9qIU1k");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      setLoading(true)
      fetch(`${API}/auth/all-users`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          const dataWithSerializedDates = result.map(item => {
            const createdAt = item.createdAt instanceof Date ? item.createdAt : new Date(item.createdAt);
            return {
              ...item,
              createdAt: createdAt.toISOString(),
            };
          });
              // Sort the array based on the createdAt property in descending order (from latest to oldest)
              const sortedData =  dataWithSerializedDates.sort((a, b) => b.createdAt - a.createdAt);

          dispatch(setFetchedUsers(sortedData))
          console.log(result)
          setLoading(false)
        })
        .catch(error => console.log('error', error));
          }

    fetchUsers()
  
   
  }, [])

  console.log(fetchedUsersRed)

  return (
    <div className='flex items-center justify-between px-10 py-2 shadow-sm bg-[#6ca4e5b6]'>
      {/* {loading ? <Loader /> : null} */}
   <div>
   <img
        src={logo}
         style={{ width:100, height:70, objectFit:'contain'}}
        alt='welcome image'
    
        />
   </div>

   <div style={{display: window.innerWidth > 500 ? 'flex': 'none'}} className='gap-2 items-center'>

    <MdNotifications onClick={()=>setOpenNoti(!openNoti)} style={{fontSize:25, cursor:'pointer'}} className='text-[#46a0e4] relative' />

   <img
       src={robot}
       style={{objectFit:'cover', width:40, height:40, borderRadius:'100%'}}
      alt='welcome image'

        />
        <div>
            <h2 className='text-sm'>{userInfo?.user?.name}</h2>
            <p style={{paddingRight:'10px'}} className='text-sm ' >{userInfo.user.email}</p>
        </div>
   </div>


{ openNoti &&  <div style={{top:'100px', right:'150px', width:'300px'}} className='shadow-md absolute bg-white p-4'>

    <div className='flex justify-between '>

    <h1 className='text-xl font-bold'>Notifications</h1>
    <p className='bg-sky-50 text-[#46a0e4] p-1'>Latest</p>
    </div>

  
    <div className='flex gap-4 items-center mt-3'>
      <BiNotification style={{fontSize:25, cursor:'pointer'}} className='text-green-700' />
      <div>
        <p className='text-sm'>Welcome to your new account</p>
        <p className='text-sm'>12th November 2022</p>
      </div>
      <AiOutlineClose style={{fontSize:25, cursor:'pointer'}} className='text-green-700' />
    </div>
  
  
   <button onClick={()=>setOpenNoti(false)} className='bg-[#46a0e4] p-3' style={{width:'250px', margin:'18px auto'}}>
   <Link style={{ margin:'auto'}} className=' text-center m-4 text-white font-bold' to='accountActivities'>View All</Link>
   </button>
    
   </div>} 
   
    </div>
  )
}

export default AdminNavbar
