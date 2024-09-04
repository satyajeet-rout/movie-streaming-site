// import './featured.scss'
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function Featured({ type }) {
//     const [content, setContent] = useState("")

//     useEffect(() => {
//         const getRandomContent = async() => {
//             try {
//                 const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
//              headers: {
//             token:
//               "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
//           },
//                 })

//                 setContent(res.data[0])
//         } catch (error) {
//             console.log(error);
            
//         }
//         }
//         getRandomContent()
//     }, [type])

//   return (
//       <div className='featured'>
//           {type && (
//               <div className="category">
//                   <span>{type === "movie" ? "Movies" : "Series"}</span>
//                   <select name="genre" id="genre">
//                       <option>Genre</option>
//                       <option value="adventure">Adventure</option>
//                         <option value="comedy">Comedy</option>
//                         <option value="crime">Crime</option>
//                         <option value="fantasy">Fantasy</option>
//                         <option value="historical">Historical</option>
//                         <option value="horror">Horror</option>
//                         <option value="romance">Romance</option>
//                         <option value="sci-fi">Sci-fi</option>
//                         <option value="thriller">Thriller</option>
//                         <option value="western">Western</option>
//                         <option value="animation">Animation</option>
//                         <option value="drama">Drama</option>
//                         <option value="documentary">Documentary</option>
//                   </select>
//              </div>
//           )}

//           <img src={content.img} alt='' />
//           <div className="info">
//               <img src={content.imgTitle} alt='' />
//               <span className='desc'>
//                   {content.desc}
//               </span>
//               <div className="buttons">
//                   <button className='play'>
//                       <PlayArrowIcon />
//                       <span>Play</span>
//                   </button>
//                   <button className='more'>
//                       <InfoOutlinedIcon />
//                       <span>info</span>
//                   </button>
//               </div>
//           </div>
//     </div>
//   )
// }

// export default Featured



import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./featured.scss";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/movies/random?type=${type}`, {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);

  console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />
      <div className="info">
        <img src={content.imgTitle} alt="" />
        <span className="desc">{content.desc}</span>
        <div className="buttons">
                  <Link to={`/watch/${content._id}`}>
                      <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                     </button>
                  </Link>
          
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
