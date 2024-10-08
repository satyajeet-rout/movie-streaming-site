// import { useRef, useState } from "react"
// import "./register.scss"

// function Register() {
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const emailRef = useRef()
//     const passwordRef = useRef()
    
//     const handleStart = () => {
//         setEmail(emailRef.current.value)
//     }
//     const handleFinish = () => {
//         setPassword(passwordRef.current.value)
//     }

//   return (
//     <div className="register">
//           <div className="top">
//               <div className="wrapper">
//               <img className="logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
//                   <button className="loginButton">Sign In</button>
//                   </div>
//           </div>
//           <div className="container">
//               <h1>Unlimited movies, TV shows, and more.</h1>
//               <h2>Watch anywhere. Cancel anytime.</h2>
//               <p>Ready to watch? Enter your email to create or restart your membership.
//               </p>
//               {
//                   !email ? (
//                     <div className="input">
//                         <input type="email" placeholder="email address" ref={emailRef}/>
//                         <button className="registerButton" onClick={handleStart}>Get Started</button>
//                     </div>
//                   ) : (
//                     <form className="input">
//                         <input type="password" placeholder="password" ref={passwordRef}/>
//                         <button className="registerButton" onClick={handleFinish}>Start</button>
//                     </form>
//                   )
//               }
              
//           </div>
//     </div>
//   )
// }

// export default Register


// import axios from "axios";
// import { useRef } from "react";
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import "./register.scss";

// export default function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [username, setUsername] = useState("");
//   const navigate = useNavigate();

//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const usernameRef = useRef();

//   const handleStart = () => {
//     setEmail(emailRef.current.value);
//   };

//   const handleFinish = async (e) => {
//     e.preventDefault();
//     setPassword(passwordRef.current.value);
//     setUsername(usernameRef.current.value);
//     try {
//       await axios.post("https://movie-streaming-site-backend.onrender.com/api/auth/register", { email, username, password });
//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="register">
//       <div className="top">
//         <div className="wrapper">
//           <img
//             className="logo"
//             src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
//             alt=""
//           />
//           <Link to="/login">
//           <button className="loginButton" >
//             Login
//           </button>
//           </Link>
         
//         </div>
//       </div>
//       <div className="container">
//         <h1>Unlimited movies, TV shows, and more.</h1>
//         <h2>Watch anywhere. Cancel anytime.</h2>
//         <p>
//           Ready to watch? Enter your email to create or restart your membership.
//         </p>
//         {!email ? (
//           <div className="input">
//             <input type="email" placeholder="email address" ref={emailRef} />
//             <button className="registerButton" onClick={handleStart}>
//               Get Started
//             </button>
//           </div>
//         ) : (
//           <form className="input" onSubmit={handleFinish}>
//             <input type="text" placeholder="username" ref={usernameRef} />
//             <input type="password" placeholder="password" ref={passwordRef} />
//             <button className="registerButton" type="submit">
//               Start
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }



import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./register.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axios.post("https://movie-streaming-site-backend.onrender.com/api/auth/register", { email, username, password });
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          {/* <Link to="/login">
            <span className="loginButton">
              Login
            </span>
          </Link> */}
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input" onSubmit={handleFinish}>
            <input type="text" placeholder="username" ref={usernameRef} />
            <input type="password" placeholder="password" ref={passwordRef} />
            <button className="registerButton" type="submit">
              Start
            </button>
          </form>
        )}
       
            <span className="signup">
            Already have an account   
            <Link to="/login">
            <span className="loginButton">Login</span>
            </Link>
            
            </span>
         
      </div>
    </div>
  );
}
