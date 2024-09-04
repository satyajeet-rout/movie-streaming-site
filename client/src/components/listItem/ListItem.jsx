
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
// import "./listItem.scss";

// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function ListItem({ index, movieId }) {
  
//   const [isHovered, setIsHovered] = useState(false);
//   const [movie, setMovie] = useState({});

//   useEffect(() => {
//     const getMovie = async () => {
//       try {
//         const res = await axios.get(`https://movie-streaming-site-backend.onrender.com/api/movies/find/${movieId}`,  {
//             headers: {
//             token:
//             "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
//           },
//         })
        
        
//         setMovie(res.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getMovie()
//   }, [movieId])
  
// console.log(movie.video);

//   return (
//     // <Link to={{ pathname: "/watch", state: { movie } }}>
//     <Link to={`/watch/${movieId}`}>
//       <div
//       className="listItem"
//       style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img
//         src={movie.img}
//         alt=""
//       />
//       {isHovered && (
//         <>
//           <video src={movie.trailer} autoPlay={true} loop />
//           <div className="itemInfo">
//             <div className="icons">
//               <PlayArrowIcon className="icon" />
//               <AddOutlinedIcon className="icon" />
//               <ThumbUpOutlinedIcon className="icon" />
//               <ThumbDownOutlinedIcon className="icon" />
//             </div>
//             <div className="itemInfoTop">
//               <span>{movie.duration}</span>
//               <span className="limit">+{movie.limit}</span>
//               <span>{movie.year}</span>
//             </div>
//             <div className="desc">
//               {movie.desc}
//             </div>
//             <div className="genre">{movie.genre}</div>
//           </div>
//         </>
//       )}
//     </div>

//     </Link>
//       );
// }



import "./listItem.scss";
import {
  PlayArrow,
  Add,
  ThumbUpAltOutlined,
  ThumbDownOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ListItem({ index, item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get("https://movie-streaming-site-backend.onrender.com/api/movies/find/" + item, {
          headers: {
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    // <Link to={{ pathname: "/watch", movie: movie }}>
    <Link to={`/watch/${item}`}>
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgSm} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}
