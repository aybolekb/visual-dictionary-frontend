import { MainUrl } from "../../url"

const Add = () =>{
   const PF = MainUrl+ '/file'
   const img = MainUrl +'/audio/about-info.jpg'
   return(
      <div className="add">
        <audio src={PF}></audio>
        <img src={img} alt="" />
      </div>
   )
}

export default Add;