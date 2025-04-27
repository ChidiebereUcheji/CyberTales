import { useEffect} from 'react'
import imageOne from '../assets/good1.png'
import imageTwo from '../assets/good2.png'
import './goodAnimation.css'
import { useNavigate } from 'react-router-dom'

const GoodAnimation = ({showGood, setShowGood, navigateTo, text}) => {

    // const [showGood, setShowGood] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
            setTimeout(()=>{
                setShowGood(true);
            },500)
    },[])
  return (
    <div className='goodAnimationContainer'>

        <div className='goodAnimationInnerContainer'>

            <div className='goodImagesContainer'>
            <div>
                    <img style={{width:'100px', height:'100px', objectFit:'contain'}} src={imageOne} alt="Good One" />
                </div>

               {showGood && <div style={{marginLeft:'-60px', marginTop:'-60px', animation: 'easeInAnimation 1s ease-in'}}>
                    <img style={{width:'60px', height:'60px', objectFit:'contain'}} src={imageTwo} alt="Good One" />
                </div>}
            </div>



            <div style={{marginBottom: '-20px'}} className='text-center text-[#CDE9FF] text-xl w-[75%]'>{text}</div>
              

                <div onClick={()=>{navigate(`/${navigateTo}`);setShowGood(false)}} style={{padding:'15px 30px', borderRadius:'10px', marginTop:'50px', cursor:'pointer',marginBottom:'100px'}} className='bg-[#CDE9FF] text-[#004C85]'>
                    <button>Continue</button>
                </div>

        </div>


    </div>
  )
}

export default GoodAnimation
