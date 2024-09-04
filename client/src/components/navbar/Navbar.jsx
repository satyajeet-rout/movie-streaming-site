import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../context/authContext/AuthActions'
import { AuthContext } from "../../context/authContext/AuthContext";
 
const Navbar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  
   const { dispatch } = useContext(AuthContext);
    const [isScrolled, setIsScrolled] = useState(false)
    
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
  // if (isAdmin) {
  //     return (
  //   <div className={isScrolled? "navbar scrolled":"navbar"}>
  //       <div className="container">
  //             <div className="left">
  //                 <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt="" />
                  
  //                 <Link to='/' className='link'>
  //                  <span>Homepage</span>
  //                 </Link>
  //                 <Link to='/series' className='link'>
  //                   <span>Series</span>
  //                 </Link>
  //                 <Link to='/movies' className='link'>
  //                   <span>Movies</span>
  //                 </Link>
                
  //                  <span>New and Popular</span>
                  
                 
  //                   <span>My List</span>
                 
                  
                  
  //             </div>
  //             <div className="right">
  //                 <SearchIcon className='icon'/>
  //                 <span>KID</span>
  //                 <NotificationsIcon className='icon'/>
  //                 <img src='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg' alt='' />
  //                 <div className="profile">
  //                     <ArrowDropDownIcon className='icon' />
  //                     <div className="options">
  //                 <span>Settings</span>
  //                 <Link to="/addmovies">
  //                   <span>Add Movie</span>
  //                 </Link>
                         
  //                         <span onClick={() => dispatch(logout())}>Logout</span>
  //                      </div>
  //                 </div>
                 
  //             </div>
  //       </div>
  //   </div>
  // )
  //   }
  if (user.isAdmin === true) {
     return (
    <div className={isScrolled? "navbar scrolled":"navbar"}>
        <div className="container">
              <div className="left">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt="" />
                  
                  <Link to='/' className='link'>
                   <span>Homepage</span>
                  </Link>
                  <Link to='/series' className='link'>
                    <span>Series</span>
                  </Link>
                  <Link to='/movies' className='link'>
                    <span>Movies</span>
                  </Link>
              </div>
              <div className="right">
                  <SearchIcon className='icon'/>
                 
                  <NotificationsIcon className='icon'/>
                  <img src='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg' alt='' />
                 
                  <div className="profile">
                      <ArrowDropDownIcon className='icon' />
                      <div className="options">
                          <span>Settings</span>
                          <Link to="/addmovies">
                            <span className='addmovie'>Add Movie</span>
                          </Link>
                          <Link to="/addlist">
                            <span className='addlist'>Add List</span>
                          </Link>
      
                          <span onClick={() => dispatch(logout())}>Logout</span>
                       </div>
                  </div>
                 
              </div>
        </div>
    </div>
  )

   }

  return (
    <div className={isScrolled? "navbar scrolled":"navbar"}>
        <div className="container">
              <div className="left">
                  <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt="" />
                  
                  <Link to='/' className='link'>
                   <span>Homepage</span>
                  </Link>
                  <Link to='/series' className='link'>
                    <span>Series</span>
                  </Link>
                  <Link to='/movies' className='link'>
                    <span>Movies</span>
                  </Link> 
              </div>
              <div className="right">
                  <SearchIcon className='icon'/>
                  <span>KID</span>
                  <NotificationsIcon className='icon'/>
                  <img src='https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg' alt='' />
                 
                  <div className="profile">
                      <ArrowDropDownIcon className='icon' />
                      <div className="options">
                          <span>Settings</span>
      
                          <span onClick={() => dispatch(logout())}>Logout</span>
                       </div>
                  </div>
                 
              </div>
        </div>
    </div>
  )
}

export default Navbar
