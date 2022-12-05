import './category.css'
import Navbar from '../../components/navbar/Navbar';
import { useState } from 'react';
import DoneIcon from '@mui/icons-material/Done'
import axios from 'axios'
import {CircularProgress} from '@material-ui/core'




const Category = () =>{
   const [icon,setIcon] = useState()
   const [name,setName] = useState()
   const [color,setColor] = useState()
   const [loading,setLoading] = useState(false)

  
   const handleClick = async (e) => {
      e.preventDefault();
     setLoading(true)
      const newCategory = {
        name:name,
        color:color,
        icon:  'ic-' + name + '.'  + icon?.type.split('/')[1],
      }
      console.log(newCategory)
      const formData = new FormData();
  
      formData.append('ic-' + name, icon);
      console.log(formData)
      try {
        await axios.post('http://localhost:8080/api/v1/category', newCategory)
        await axios.post('http://localhost:8080/upload', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        setLoading(false)
      } catch (err) {
        console.log(err)
      }
      
    }
   
   return(
      <div className="category">
        <Navbar />
        <div className="homeWrapper">
        <div className="categoryContainer">
          <p className="inputTitle">Add New Category</p>
          <form onSubmit={handleClick} method='post' className='categoryform'>
              <div className="items">
                <label className='title'>Name</label>
                <input type="text" className='input' id='name' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className="items">
                <label className='title'>Color</label>
                <input type="color" className='file' onChange={(e)=>setColor(e.target.value)}/>
              </div>
              <div className="items">
                <label className='title'>Icon</label>
                <div className="file">
                  <input type="file" id='icon'  name='file' onChange={(e) => setIcon(e.target.files[0])} />
                  <span >{icon ? <DoneIcon /> : ''}</span>
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

export default Category;