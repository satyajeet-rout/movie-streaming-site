
// import Featured from '../../components/featured/Featured';
// import List from '../../components/list/List';
// import Navbar from '../../components/navbar/Navbar';
// import './home.scss'
// import { useState, useEffect } from 'react';
// import axios from 'axios'
// function Home({ type }) {
//   const [lists, setLists] = useState([])
//   const [genre, setGenre] = useState(null)

//   useEffect(() => {
//     const getRandomLists = async () => {
//       try {
//         const res = await axios.get(`lists${type ? "?type=" + type : ""}${genre ? "genre=" + genre : ""}`,
//           {
//             headers: {
//             token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2M2ZGVlYzcyMTJlOWU4MjM0YzVhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNDg1MjU4MCwiZXhwIjoxNzI1Mjg0NTgwfQ.ZRbjKOEQ8rnHzjpJLy-zGQqp2JvxhNqHlQRrAzWfRFQ"
//           }}
//         )
        
      
        
//         setLists(res.data)
//       } catch (error) {
//         console.log(error);
        
//       }
//     }
//     getRandomLists();
//   }, [type, genre])
  
  
//   return (
//     <div className='home'>
//       <Navbar />
//       <Featured type={type} />
//       {lists.map((list) => (
//         <List list={list} key={list._id}/>
//       ))}   
//     </div>
//   )
// }

// export default Home



import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);




  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `https://movie-streaming-site-backend.onrender.com/api/lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);


  

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
