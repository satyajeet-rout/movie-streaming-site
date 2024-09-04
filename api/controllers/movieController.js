const Movie = require('../models/Movie');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = 'movies';
    let resource_type = 'auto';
    if (file.fieldname === 'video') {
      folder = 'movies/videos';
      resource_type = 'video';
    } else if (file.fieldname === 'img') {
      folder = 'movies/img';
    } else if (file.fieldname === 'trailer') {
      folder = 'movies/trailers';
      resource_type = 'video';
    } else if (file.fieldname === 'imgSm') {
      folder = 'movies/imgSm';
    }
    else if (file.fieldname === 'imgTitle') {
      folder = 'movies/imgTitle';
    }
    return {
      folder: folder,
      resource_type: resource_type,
    };
  },
});

const upload = multer({ storage: storage });

exports.uploadMovieAssets = upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'img', maxCount: 1 },
  { name: 'trailer', maxCount: 1 },
  { name: 'imgSm', maxCount: 1 },
  { name: 'imgTitle', maxCount: 1 },
]);

exports.createMovie = async (req, res) => {
    if (req.user.isAdmin) {
      try {
    const { title, desc, year, limit, genre, isSeries} = req.body;
    
    const imgUrl = req.files['img'][0].path;
    const imgTitleUrl = req.files['imgTitle'][0].path;
    const imgSmUrl = req.files['imgSm'][0].path;
    const trailerUrl = req.files['trailer'][0].path;
    const videoUrl = req.files['video'][0].path;
    

    const newMovie = new Movie({
      title,
      desc,
      img:imgUrl,
      imgTitle:imgTitleUrl,
      imgSm:imgSmUrl,
      trailer:trailerUrl,
        video:videoUrl,
        year,
        limit,
        genre,
      isSeries
    });
     const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  }else {
    res.status(403).json("You are not allowed!");
  }
};

exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
