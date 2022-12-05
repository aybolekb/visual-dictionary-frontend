import { useEffect } from 'react';
import { useState } from 'react';
import './home.css'
import Navbar from '../../components/navbar/Navbar';
import DoneIcon from '@mui/icons-material/Done'
import {CircularProgress} from '@material-ui/core'

import axios from 'axios'

const Home = () => {
   const PF = 'http://localhost:8080/file/'
   console.log(PF)

  const [data, setData] = useState({
    english: '',
    turkmen: '',
    enTrans: '',
    tmTrans: '',
    img: '',
    example:'',

  })
  const [enAudio, enSetAudio] = useState()
  const [tmAudio, tmSetAudio] = useState()
  const [categories,setCategories] = useState()
  const [categoryId,setCategoryId] = useState()
  const [audio, setAudio] = useState()
  const [img, setImg] = useState()
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    const getAllCategory =async () =>{
       try {
         const {data} = await axios.get('http://localhost:8080/api/v1/category')
         
         setCategories(data)
       } catch (error) {
        
       }
    }
    
    getAllCategory()
    
  },[data])
  console.log(categories)

  const selectCategory = (e) =>{
      setCategoryId(e.target.value)
  }
  console.log(categoryId)

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    

    const newWord = {
      ...data,
      categoryId:categoryId,
      enAudio: data.english + '-en' + '.mpeg',
      tmAudio:  data.english + '-tm' + '.mpeg',
      img: data.english + '.' + img?.type.split('/')[1],
    }
    console.log(newWord)
    console.log(img)
    const formData = new FormData();

    formData.append(data.english + '-tm', tmAudio);
    formData.append(data.english + '-en', enAudio)
    formData.append(data.english, img)
    console.log(formData)
    try {
      await axios.post('http://localhost:8080/api/v1/words', newWord)
      await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      console.log(data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)

  }
  
  return (
    <div className='home'>
      <Navbar />
      <div className="homeWrapper">
        <div className="newContainer">
          <p className="inputTitle">Add New Word</p>
          <form onSubmit={handleClick} method='post' className='form'>
            <div className="lang">
              <p className="dil">English</p>
              <p className="dil">Turkmen</p>
            </div>
            <div className="row">
              <div className="items">
                <label className='title'>Word</label>
                <input type="text" className='input' id='english' onChange={handleChange} />
                <input type="text" className='input' id='turkmen' onChange={handleChange} />
              </div>
              <div className="items">
                <label className='title'>Transcription</label>
                <textarea type="text" className='input' id='enTrans' onChange={handleChange} />
                <textarea type="text" className='input' id='tmTrans' onChange={handleChange} />
              </div>
              <div className="items">
                <label className='title'>Audio</label>
                <div className="file">
                  <label htmlFor='en' className='sayla' >Ses sayla(EN)</label>
                  <input type="file" id='en' style={{ display: "none" }} name='file' onChange={(e) => enSetAudio(e.target.files[0])} />
                  <span >{enAudio ? <DoneIcon /> : ''}</span>
                </div>
                <div className="file">
                  <label htmlFor='tm' className='sayla'>Ses sayla(TM)</label>
                  <input type="file" id='tm' style={{ display: "none" }} accept='.mp3' name='file' onChange={(e) => tmSetAudio(e.target.files[0])} />
                  <span >{tmAudio ? <DoneIcon /> : ''}</span>
                </div>
              </div>
              <div className="items">
                  <label className='title'>Category</label>
                  <select id="category" className='select file' onChange={selectCategory}>
                    {categories && categories.map((item) =>(
                        <option key={item._id} value={item._id}>{item.name}</option>
                    ))}
                  </select>
                  <input type="text" placeholder='Example'  className='input' id='example' onChange={handleChange} />
                </div>
                <div className="items">
                <label className='title'>Image</label>
                <input type='file' className='file' onChange={(e) => setImg(e.target.files[0])} />
                  <img src={'./surat/Animal/' + img?.name} alt="" className='img '/>

                </div>
            </div>
            <div className="buttonContainer">
              <button className='btn' type='submit' disabled={loading}>{loading ? <CircularProgress color='white' size='25px'/>:'Add'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home;