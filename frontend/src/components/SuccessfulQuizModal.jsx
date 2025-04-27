import './successfulQuizModal.css'
import owlImage from '../assets/Owl 1.png'
import successChatImage from '../assets/successChatImage1.png';
import { useNavigate } from 'react-router-dom';

const SuccessfulQuizModal = ({showSuccessModal, setShowSuccessModal, image1, image2, navigateTo}) => {

    const navigate = useNavigate();

  return (
    <div className='successfulQuizModalContainer'>

        <div className='successfulQuizInnerContainer'>

            <div className='successfulQuiz-left'>
                <img style={{width:'120px', height:'120px'}} src={image1} alt="Owl Image" />
            </div>
            <div className='successfulQuiz-right'>
                <img style={{width:window.innerWidth < 960 ? '180px' : '200px', height:'130px', objectFit:'contain'}} src={image2} alt="Chat Image" />
                <button onClick={()=>{ navigate(`/${navigateTo}`); setShowSuccessModal(false) }} style={{padding:'10px 12px', width:'60%', backgroundColor:'#CDE9FF', textAlign:'center', margin:'auto', borderRadius:'15px', cursor:'pointer'}}>Continue</button>
            </div>

        </div>
      
    </div>
  )
}

export default SuccessfulQuizModal
