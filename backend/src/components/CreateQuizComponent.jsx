import  { useState } from 'react'
import Loader from './Loader';
import styles from './login.module.css'
import { FaRegTimesCircle } from 'react-icons/fa'


const CreateQuizComponent = () => {

      // eslint-disable-next-line no-constant-binary-expression
   let API =   'https://cybertales.onrender.com/api' || 'http://localhost:5050/api'
// let API =  'http://localhost:5050/api'

    const[loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        answer:'',
        answerCharacter: '',
        category: '',
      
      });

      const [imageFiles, setImageFiles] = useState([]); 
    
      const categories = ["categoryOne", "categoryTwo", "categoryThree", "categoryFour", "categoryFive", "categorySix", "categorySeven", "categoryEight", "categoryNine"];
      const answerOptions = ["A", "B", "C",];
      const [popUp, setPopUp] = useState('')
      const [showPopupModal, setShowPopupModal] = useState(false)
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
        console.log(formData)
      };
    
      const handleSizeChange = (e) => {
        const { options } = e.target;
        const selectedSizes = [];
        for (let i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            selectedSizes.push(options[i].value);
          }
        }
        setFormData({
          ...formData,
          sizes: selectedSizes,
        });
      };
    
    


  const handleSubmit = (e) => {
    e.preventDefault();

    if(!formData.question || !formData.optionA || !formData.optionB || !formData.optionC || !formData.answer || !formData.answerCharacter){
        setPopUp('Fill in all required columns to continue')
                setShowPopupModal(true)
                return
    }
    
    const formdata = new FormData();
    formdata.append("question", formData.question);
    formdata.append("optionA", formData.optionA);
    formdata.append("optionB", formData.optionB);
    formdata.append("optionC", formData.optionC);
    formdata.append("answer", formData.answer);
    formdata.append("answerCharacter", formData.answerCharacter);
    formdata.append("category", formData.category);

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNyb3duIEFkbWluIiwidXNlcklkIjoiNjVjNjZlZDIxMGYzZTE0YTQ1YTliYWEzIiwiZW1haWwiOiJhbmR5aGF5bGVAbWFpbC5jb20iLCJpYXQiOjE3MDc1MDMzMTR9.a_0wxQhQw21tV7M1zYbQAyvuy_OeuycnOZGIl9qIU1k");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    setLoading(true);

    fetch(`${API}/quiz/create`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setLoading(false);
        if(result.message === 'Quiz created successfully'){
            // show success
            setPopUp('Quiz Created Successfully')
                setShowPopupModal(true)
        }
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  };
  const handleClosePopup =()=>{
    setShowPopupModal(false)
     setPopUp('')
    }

  return (
    <div style={{width:'80%', margin:'100px auto', padding:'10px'}} className='bg-[#004b8544]'>
        {loading ? <Loader /> : null}
        { showPopupModal && 
   <div className={styles.popContainer}>
       
        <div className={styles.innerPopContainer}>
            < FaRegTimesCircle onClick={()=>setShowPopupModal(false)} className={styles.popClose} />
             <p className={styles.popText}>{popUp}</p>
            <button className={styles.popButton} onClick={handleClosePopup}>Ok</button>
        </div>
      
    
    </div>
        }
   {/* popup ends */}
        <h1 className='text-2xl text-center font-bold p-2 text-[#004C85]'>CREATE QUIZ</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 p-2'>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>Question:</label>
        <input style={{height:'40px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} placeholder='Question' type="text" name="question" value={formData.question} onChange={handleInputChange} required />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>OptionA:</label>
        <textarea style={{height:'50px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} placeholder='A. Spelling mistakes and urgent language' name="optionA" value={formData.optionA} onChange={handleInputChange} required />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>OptionB:</label>
        <textarea style={{height:'50px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} placeholder='B. A friendly greeting from IT' name="optionB" value={formData.optionB} onChange={handleInputChange} required />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>OptionC:</label>
        <textarea style={{height:'50px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} placeholder='C. An email from a trusted friend' name="optionC" value={formData.optionC} onChange={handleInputChange} required />
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>Answer</label>
        <textarea style={{height:'50px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} placeholder='✅ Correct Answer: A) Spelling mistakes and urgent language' name="answer" value={formData.answer} onChange={handleInputChange} required />
      </div>
      
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>Category:</label>
        <select style={{height:'40px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} name="category" value={formData.category} onChange={handleInputChange} required>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-1'>
        <label className='text-[#004C85]'>Answer Character:</label>
        <select style={{height:'100px', padding:'7px', outline:'none', borderBottom:'2px solid lightblue'}} name="answerCharacter" value={formData.answerCharacter} onChange={handleSizeChange} required>
          {answerOptions.map((answerCharacter) => (
            <option key={answerCharacter} value={answerCharacter}>{answerCharacter}</option>
          ))}
        </select>
      </div>

      <button className='bg-gray-300 p-2 m-2 hover:bg-gray-200' disabled={loading} type="submit">{loading ? 'Submitting...' : 'Submit'}</button>
    </form>
    </div>
  )
}

export default CreateQuizComponent
