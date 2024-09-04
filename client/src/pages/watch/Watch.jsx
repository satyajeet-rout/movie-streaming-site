import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import './watch.scss' 
import {  Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";

function Watch() {
  const { id } = useParams();
  const [movie, setMovie] = useState("");
//   console.log(id);
  
  // const movie = useLocation().state.movie
  // console.log(location)
  // const movie = location.movie


    useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(`https://movie-streaming-site-backend.onrender.com/api/movies/find/${id}`,  {
           headers: {
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        
        
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getMovie()
  }, [id])
  // console.log(movie);
  

    if (!movie) {
    // Handle the case where object is null or undefined
      return (
      


       <div className='watch'>
      <Link to="/">
      <div className="back">
              <ArrowBackOutlinedIcon />
              Home
      </div></Link>
     
          <video
              className='video'
              autoPlay
              progress
            controls
        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamJ3cDB5azlwcnRucnZiOWZubnN2dzJlZmJ0Y2g4eHFwaDM2MmphcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7bu3XilJ5BOiSGic/giphy.webp"
      />
      <div className='title'>Movie: {movie.title}</div>
    </div>)
    }
  
  
  return (
    <div className='watch'>
      <Link to="/">
      <div className="back">
              <ArrowBackOutlinedIcon />
              Home
      </div></Link>
     
          <video
              className='video'
              autoPlay
              progress
              controls
              // src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        src={movie.video}
      />
      <div className='title'>Movie: {movie.title}</div>
    </div>
  )
}

export default Watch




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const Watch = () => {
//   const { id } = useParams();
//   console.log(id);
  
//   const [movie, setMovie] = useState(null);

//   useEffect(() => {
//     const fetchMovie = async () => {
//       try {
//         const res = await axios.get(`/movies/find/${id}`);
//         setMovie(res.data);
//       } catch (err) {
//         console.error('Error fetching movie:', err);
//       }
//     };
//     fetchMovie();
//   }, [id]);

//   if (!movie) return <div>Loading...</div>;

//   return (
//     <div className="movie-page">
//       <h1>{movie.title}</h1>
//       <video src={movie.videoUrl} controls autoPlay width="100%" />
//       <p>{movie.description}</p>
//       <p><strong>Duration:</strong> {movie.duration}</p>
//       <p><strong>Genre:</strong> {movie.genre}</p>
//       <p><strong>Release Date:</strong> {new Date(movie.releaseDate).toDateString()}</p>
//     </div>
//   );
// };

// export default Watch;

