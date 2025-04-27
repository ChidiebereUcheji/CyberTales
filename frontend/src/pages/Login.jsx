import './home.css'
// import Navbar from '../components/Navbar'
import LoginComponent from '../components/LoginComponent'
import cybertales from '../assets/Frame 33.png'
import welcomeImage from '../assets/Frame 27.png'

const Login = () => {
  return (
    <div className="homeContainer">
    {/* <Navbar /> */}
    <div className="homeInnerContainer">
    {window.innerWidth < 960 && <div style={{marginBottom:'0px', marginTop:'100px'}} className='flex flex-col gap-2 items-center justify-center'>
      
      <img style={{width:'120px', height:'120px', objectFit:'contain'}} src={cybertales} alt="Logo" />
       <img style={{width:'250px', height:'40px', objectFit:'contain'}} src={welcomeImage} alt="Logo" />
      </div>}
    <LoginComponent />
    </div>
  
   </div>
  )
}

export default Login
