// import Navbar from '../components/Navbar'
import cybertales from '../assets/Frame 33.png'
import welcomeImage from '../assets/Frame 28.png'
import SignupComponent from '../components/SignupComponent'

const Signup = () => {
  return (
    <div className="homeContainer">
    {/* <Navbar /> */}
    <div className="homeInnerContainer">
    {window.innerWidth < 960 && <div style={{marginBottom:'20px'}} className='flex flex-col gap-2 items-center justify-center'>
       
        <img style={{width:'100px', height:'100px', objectFit:'contain', }} src={cybertales} alt="Logo" />
         <img style={{width:'250px', height:'40px', objectFit:'contain'}} src={welcomeImage} alt="Logo" />
        </div>}
    <SignupComponent />
    </div>
   </div>
  )
}

export default Signup
