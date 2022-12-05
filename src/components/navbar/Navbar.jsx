import './navbar.css'
import { Link } from 'react-router-dom';


const Navbar = () => {
   return(
      <div className="navContainer">
         <h1 className='siteName'>VISUAL DICTIONARY</h1>
      <div className="navbar">
                <Link to='/' className='link'>
                    <span className='navItem'>Home</span>
                </Link>
                <Link to='/add' className='link'>
                    <span className='navItem'>Add New Word</span>
                </Link>
                <Link to='/category' className='link'>
                    <span className='navItem'>Add Category</span>
                </Link>
              </div>
              </div>
   )
}

export default Navbar;