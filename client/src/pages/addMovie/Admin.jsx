// import React, { useState } from 'react';
// import axios from 'axios';

// const Admin = () => {
//     // const [movie, setMovie] = useState(null);
//     const [img, setImg] = useState(null);
//     const [imgTitle, setImgTitle] = useState(null);
//     const [imgSm, setImgSm] = useState(null);
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [video, setVideo] = useState(null);
//   const [trailer, setTrailer] = useState(null);
//   const [year, setYear] = useState('');
//   const [limit, setLimit] = useState('');
//   const [genre, setGenre] = useState('');
//   const [isSeries, setIsSeries] = useState(false);


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('description', description);
//     formData.append('year', year);
//     formData.append('limit', limit);
//     formData.append('genre', genre);
//     formData.append('video', video);
//     formData.append('img', img);
//     formData.append('trailer', trailer);
//     formData.append('imgSm', imgSm);
//     formData.append('imgTitle', imgTitle);
//     formData.append('isSeries', isSeries);

//     await axios.post('/api/movies/', formData, {
//             headers: {
//             token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2M2ZGVlYzcyMTJlOWU4MjM0YzVhOCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNTE5NDUxOSwiZXhwIjoxNzI1NjI2NTE5fQ.6v_LBVx2oChmLy9E7HQSI6WWQlVXWATnTUvjzfbMZ38"
//           }
//         });
//     alert('Movie uploaded successfully');
//   };

//   return (
//     <div className="admin">
//       <h1>Add New Movie</h1>
//         <form onSubmit={handleSubmit}>
//         <div className="addProductItem">
//             <label>Title</label>
//             <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             />   
//         </div>
//         <div>
//             <label>Description</label>
//             <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             />
//         </div>
//         <div>
//             <label>Movie Image</label>
//             <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImg(e.target.files[0])}
//             />
//         </div>
//         <div className="addProductItem">
//           <label>Year</label>
//           <input
//             type="text"
//             placeholder="Year"
//             name="year"
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Limit</label>
//           <input
//             type="text"
//             placeholder="Limit"
//             name="Limit"
//             onChange={(e) => setLimit(e.target.value)}
//           />
//         </div>
//         <div className="addProductItem">
//           <label>Genre</label>
//           <input
//             type="text"
//             placeholder="Genre"
//             name="Genre"
//             onChange={(e) => setGenre(e.target.value)}
//           />
//         </div>
//         <div>
//             <label>image Title</label>
//             <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImgTitle(e.target.files[0])}
//             />
//         </div>
//         <div>
//             <label>image Small</label>
//             <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImgSm(e.target.files[0])}
//             />
//         </div>
//         <div>
//             <label>Video</label>
//             <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//             />
//         </div>
//         <div>
//             <label>Trailer</label>
//             <input
//             type="file"
//             accept="video/*"
//             onChange={(e) => setTrailer(e.target.files[0])}
//             />
//         </div>
//         <div className="addProductItem">
//           <label>Is Series?</label>
//           <select name="isSeries" id="isSeries" 
//           onChange={(e)=> setIsSeries(e.target.value==='true')}>
//             <option value="false">No</option>
//             <option value="true">Yes</option>
//           </select>
//         </div>
        

//         <button type="submit">Upload Movie</button>
//       </form>
//     </div>
//   );
// };

// export default Admin;



import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const isAdmin = true
    
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [year, setYear] = useState('');
  const [limit, setLimit] = useState('');
  const [genre, setGenre] = useState('');
  const [isSeries, setIsSeries] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !year || !limit || !genre || !img || !imgTitle || !imgSm || !video || !trailer) {
      setError('Please fill in all fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);
    formData.append('limit', limit);
    formData.append('genre', genre);
    formData.append('video', video);
    formData.append('img', img);
    formData.append('trailer', trailer);
    formData.append('imgSm', imgSm);
    formData.append('imgTitle', imgTitle);
    formData.append('isSeries', isSeries);

    try {
      await axios.post(`https://movie-streaming-site-backend.onrender.com/api/movies/`, formData, {
        headers: {
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
      });
      alert('Movie uploaded successfully');
      setError(null);
    } catch (err) {
      setError('Failed to upload movie');
    }
  };

    if (isAdmin) {
      return (
    <div className="admin">
      <h1>Add New Movie</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Movie Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input
            type="text"
            placeholder="Limit"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>
        <div>
          <label>Image Title</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImgTitle(e.target.files[0])}
          />
        </div>
        <div>
          <label>Image Small</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImgSm(e.target.files[0])}
          />
        </div>
        <div>
          <label>Video</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        </div>
        <div>
          <label>Trailer</label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isSeries" id="isSeries" onChange={(e) => setIsSeries(e.target.value === 'true')}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <button type="submit">Upload Movie</button>
      </form>
    </div>
  );
  }
};

export default Admin;
