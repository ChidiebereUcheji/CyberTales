
import './profilePage.css';
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import dummpProfile from '../assets/dummyProfile.png';
import starsImage from '../assets/stars.png';
import starImage from '../assets/star.png';
import medalStarImage from '../assets/MedalStar.png';
import icon1 from '../assets/paint-board.png';
import icon2 from '../assets/smart-phone-04.png';
import icon3 from '../assets/store-add-01.png';
import icon4 from '../assets/grid-view.png';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../slices/authSlice';
import Loader from '../components/Loader';



const ProfilePage = () => {
    const [fetchedUser, setFetchedUser] = useState({})
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo)
    const fileInputRef = useRef(null);
    const [profileImage, setProfileImage] = useState('')
    const [isLoading, setIsLoading] = useState(false);

      // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
   
 


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

    const clickFile =()=>{

        fileInputRef.current.click();

    }

    const handleFileChange = async(event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('File selected:', file.name);
            console.log('File selected:', file);
          await uploadImage(file);
            // Optionally reset the file input after selection
            fileInputRef.current.value = '';
        }
    };

    const uploadImage=(file)=>{

        setIsLoading(true);
        const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${userInfo.token}`);

const formdata = new FormData();
formdata.append("profilePic", file, "testi3.jpg");

const requestOptions = {
  method: "PATCH",
  headers: myHeaders,
  body: formdata,
  redirect: "follow"
};

fetch(`${API}/auth/update-image`, requestOptions)
  .then((response) => response.json())
  .then((result) =>{
    setIsLoading(false)
    if(result.message === 'User updated successfully'){
        setProfileImage(result.user.profilePic.url);
    }
    
    console.log(result)})
  .catch((error) => console.error(error));
    }



  return (
    <div className='profilePageContainer'>
        {isLoading ? <Loader /> : null}
        <Navbar />

{ Object.keys(fetchedUser).length  === 0 
        
        ?  <div className='profilePageInnerContainer'>

            <h5 className='text-2xl font-bold text-[#004C85] text-center'>Register or Sign up to see your profile and keep a record of your progress</h5>
            <Link style={{padding:'10px'}} className='bg-[#004C85] text-white font-bold p-2 hover:bg-[#004b857b] rounded-lg' to='/login'>Login</Link>

                    </div>     
                    : 
                    <div className='profilePageInnerContainer'>

                    <h1 style={{marginTop:window.innerWidth < 960 ? '-30px'  :'10px'}} className='text-center text-xl font-extrabold text-[#004C85]'>Profile</h1>

                    <div  style={{padding:10, fontWeight:400,minHeight:'120px'}} className='w-[100%] bg-[#004C85] text-[#FFFFFF] flex justify-between p-2 rounded-sm text-xm '>
                        <p>My Profile</p>
                        <Link to='/profile-update'>Edit</Link>
                    </div>



                    <div className='profileColumnContainer'>

                    <div className='profile-left'>
                    <div className='w-full flex items-center justify-between'>
                        <img style={{width:'100px', height:'100px', borderRadius:'100%',objectFit:'cover'}} 
                        src={profileImage ? profileImage: fetchedUser?.profilePic?.url ? fetchedUser?.profilePic?.url : dummpProfile} alt="Profile Image"  />

                        <input 
                            type="file" 
                            name="profileImage" 
                            id="profileImage" 
                            ref={fileInputRef} 
                            onChange={handleFileChange}
                            style={{ display: 'none' }} 
                        />

                        <button onClick={clickFile} style={{padding:'5px 7px'}} className='rounded-xl text-[#004C85] bg-[#8bbbe0e2] text-sm cursor-pointer'>Upload Photo</button>
                    </div>

                    <div style={{padding:'20px', margin:'10px 0px'}} className='border-1 border-gray-200 rounded-md'>
                        <p style={{fontSize:'12px'}} className='text-gray-400'>Your Name</p>
                        <p style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>{fetchedUser.name}</p>
                        <p style={{fontSize:'12px', marginTop:'10px'}} className='text-gray-400'>Email</p>
                        <p style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>{fetchedUser.email}</p>
                        {/* {!fetchedUser.phoneNumber  && <> */}
                            <p style={{fontSize:'12px',  marginTop:'10px'}} className='text-gray-400'>Phone Number</p>
                            <p style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>{fetchedUser.phoneNumber}</p>
                        {/* </>} */}

                    </div>

                        <div style={{padding:'10px', margin:'10px 0px', maxHeight:'150px', width:'100%'}} className='border-1 border-gray-200 rounded-md'>
                            <div className='w-full flex items-center justify-between'>
                            <h5 className='text-gray-400'>About {fetchedUser.name}</h5>
                            <button style={{padding:'3px 7px'}} className='rounded-xl text-[#004C85] bg-[#8bbbe0e2] text-[12px] cursor-pointer'>Edit</button>
                            </div>
                        
                            <p style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>{fetchedUser.about}</p>
                        </div>



                    </div>
                    <div className='profile-right'>

                    <div style={{padding:'10px', margin:'20px 0px', maxHeight:'150px', width:'100%', display:'flex', alignItems:'center', justifyContent:'center'}} className='border-1 border-gray-200 rounded-md'>

                    <div >
                    <h5 style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>Personal Details</h5>
                    <p style={{fontSize:'12px', fontWeight:'300px'}} className='text-gray-400'>This are the professional details shown to users in the app.</p>
                    </div>

                    <img style={{width:'50px', height:'50px', objectFit:'contain'}} src={starsImage} alt="Stars" />

                    </div>

                    <div>
                    <h6 style={{fontWeight:'bold', fontSize:'12px', padding:'10px'}}>Expertise in</h6>

                    <div style={{display:'flex', gap:'10px', flexWrap:'wrap', margin:'auto'}}>

                    <div style={{display:'flex', gap:'10px', padding:'5px',color:'lightgray', border:'1px solid lightgray', borderRadius:'15px', width:'max-content', fontSize:'13px', fontWeight:'bold'}}>
                        <img src={icon1} alt="Icon" />
                        <p>{fetchedUser.department}</p>
                    </div>

                    {/* <div style={{display:'flex', gap:'10px', padding:'5px',color:'lightgray', border:'1px solid lightgray', borderRadius:'15px', width:'max-content', fontSize:'13px', fontWeight:'bold'}}>
                        <img src={icon2} alt="Icon" />
                        <p>Designing</p>
                    </div> */}

                    {/* <div style={{display:'flex', gap:'10px', padding:'5px',color:'lightgray', border:'1px solid lightgray', borderRadius:'15px', width:'max-content', fontSize:'13px', fontWeight:'bold'}}>
                        <img src={icon3} alt="Icon" />
                        <p>Communication</p>
                    </div> */}

                    {/* <div style={{display:'flex', gap:'10px', padding:'5px',color:'lightgray', border:'1px solid lightgray', borderRadius:'15px', width:'max-content', fontSize:'13px', fontWeight:'bold'}}>
                        <img src={icon4} alt="Icon" />
                        <p>Management</p>
                    </div> */}

                    </div>


                    </div>

                    <div>
                    <h6 style={{fontWeight:'bold', fontSize:'12px', padding:'10px', marginBottom:'-20px'}}>Total Experience</h6>

                    <div style={{ margin:'20px 0px', maxHeight:'150px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', overflow:'hidden'}} className='border-1 border-gray-200 rounded-lg'>

                        <div style={{flex:'2', paddingLeft:'10px'}}>
                            <h6 style={{fontSize:'12px', color:'lightgray', }}>{fetchedUser.experience} Years </h6>
                            <p style={{fontSize:'12px', color:'lightgray', }}>of working in the company</p>
                        </div>

                        <div style={{flex:'1', backgroundColor:'lightblue', width:'80px',display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <img style={{width:'50px', height:'50px'}} src={medalStarImage} alt="Medal Star" />
                        </div>

                    </div>
                    </div>

                    <div>
                    <h6 style={{fontWeight:'bold', fontSize:'12px', padding:'10px', marginBottom:'-20px'}}>Leaderboard</h6>

                    <div style={{ margin:'20px 0px', maxHeight:'150px', width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',overflow:'hidden'}} className='border-1 border-gray-200 rounded-lg'>

                        <div style={{flex:'2', paddingLeft:'10px'}}>
                            <h6 style={{fontSize:'12px', color:'lightgray', }}>1st Position </h6>
                            <p style={{fontSize:'12px', color:'lightgray', }}>With 2000 points</p>
                        </div>

                        <div style={{flex:'1', backgroundColor:'#004C85', width:'80px',display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <img style={{width:'50px', height:'50px'}} src={starImage} alt="Medal Star" />
                        </div>

                    </div>
                    </div>

                    </div>


                    </div>

                    </div>

}

       

        

        <div onClick={()=>navigate(-1)} style={{margin:'30px', position: window.innerWidth < 960 ?  'relative' : 'fixed', bottom:'50px', left:'50px'}}>
        <IoArrowBackCircleOutline size={25}/>
        </div>
      
    </div>
  )
}

export default ProfilePage
