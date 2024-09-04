// import React from 'react'
// import "./app.scss"
// import Home from './pages/home/Home'
// import Watch from './pages/watch/Watch.jsx'
// // import Watch from './pages/watch/Watch.jsx'
// // import Register from './pages/register/Register.jsx'
// import Login from './pages/login/Login.jsx'
// import Layout from './Layout.jsx';
// import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'





// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//  <Route path="/" element={<Layout />}>
//       <Route path='' element={<Home />} />
//       <Route path='/movies' element={<Home type="movies" />} />
//       <Route path='/series' element={<Home type="series" />} />
     
      
     

//     </Route>
//     <Route>
//          <Route path='/watch' element={<Watch />} />
//     </Route>
//     </Route>
   
    
//   )
// )



// const App = () => {
//   return (
//      <RouterProvider router={router} />

//   )
// }

// export default App


import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import Admin from "./pages/addMovie/Admin";
import { AuthContext } from "./context/authContext/AuthContext";

const App = () => {
  const { user } = useContext(AuthContext);
  
  let isAdmin = user ? user.isAdmin : false;



  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        {user && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch/:id" element={<Watch />} />
          </>
        )}


        {isAdmin && (
          <>
            <Route path="/movies" element={<Home type="movie" />} />
            <Route path="/addmovies" element={<Admin/>} />
            <Route path="/series" element={<Home type="series" />} />
            <Route path="/watch/:id" element={<Watch />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

