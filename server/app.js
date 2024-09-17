// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId,
} = require('./data');

const express = require('express');
const app = express();

// Your code here
// parse json
app.use(express.json());

// display the request body for each request
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});
// artist's album

app.get('/artists/latest/albums', (req, res) => {
  res.set('Content-Type', 'application/json');
  return res.status(200).json(getAlbumsForLatestArtist());
});

app.get('/artists/:artistId/albums', (req, res) => {
  let artistId = req.params.artistId;
  res.set('Content-Type', 'application/json');
  return res.status(200).json(getAlbumsByArtistId(artistId));
});

app.post('/artists/:artistId/albums', (req, res) => {
  let artistId = req.params.artistId;
  let data = Object.assign({}, req.body);
  res.set('Content-Type', 'application/json');
  return res.status(201).json(addAlbumByArtistId(artistId, data));
});

// artist's songs
app.get('/artists/:artistId/songs', (req, res) => {
  let artistId = req.params.artistId;
  let data = getSongsByArtistId(artistId);
  res.set('Content-Type', 'application/json');
  return res.status(200).json(data);
});

// album's song
app.post('/albums/:albumId/songs', (req, res) => {
  let albumId = req.params.albumId;
  let data = Object.assign({}, req.body);
  res.set('Content-Type', 'application/json');
  return res.status(201).json(addSongByAlbumId(albumId, data));
});

app.get('/albums/:albumId/songs', (req, res) => {
  let albumId = req.params.albumId;
  let data = getSongsByAlbumId(albumId);
  res.set('Content-Type', 'application/json');
  return res.status(200).json(data);
});

// albums

app.get('/albums/:albumId', (req, res) => {
  let albumId = req.params.albumId;
  res.set('Content-Type', 'application/json');
  return res.status(200).json(getAlbumByAlbumId(albumId));
});

const editAlbum = (req, res) => {
  let albumId = req.params.albumId;
  let data = Object.assign({}, req.body);
  res.set('Content-Type', 'application/json');
  return res.status(200).json(editAlbumByAlbumId(albumId, data));
};

app.put('/albums/:albumId', editAlbum);
app.patch('/albums/:albumId', editAlbum);

app.delete('/albums/:albumId', (req, res) => {
  let albumId = req.params.albumId;
  res.set('Content-Type', 'application/json');
  deleteAlbumByAlbumId(albumId);
  return res.status(200).json({
    message: 'Successfully deleted',
  });
});

app.get('/albums', (req, res) => {
  let startsWith = req.query.startsWith;
  res.set('Content-Type', 'application/json');
  return res.json(getFilteredAlbums(startsWith));
});

// songs
app.get('/songs/:songId', (req, res) => {
  let songId = req.params.songId;
  let song = getSongBySongId(songId);
  res.set('Content-Type', 'application/json');
  return res.status(200).json(song);
});

const changeSong = (req, res) => {
  let songId = req.params.songId;
  let data = Object.assign({}, req.body);
  data = editSongBySongId(songId, data);

  res.set('Content-Type', 'application/json');
  return res.status(200).json(data);
};

app.put('/songs/:songId', changeSong);
app.patch('/songs/:songId', changeSong);

app.delete('/songs/:songId', (req, res) => {
  let songId = req.params.songId;
  deleteSongBySongId(songId);
  res.set('Content-Type', 'application/json');
  return res.json({
    message: 'Successfully deleted',
  });
});

// artist
app.get('/artists/latest', (req, res) => {
  let data = getLatestArtist();
  res.set('Content-Type', 'application/json');
  res.status(200).json(data);
});

const editArtist = (req, res) => {
  let artistId = req.params.artistId;
  let data = Object.assign({}, req.body);
  data = editArtistByArtistId(artistId, data);
  res.set('Content-Type', 'application/json');
  res.status(200).json(data);
};

app.put('/artists/:artistId', editArtist);
app.patch('/artists/:artistId', editArtist);

app.get('/artists/:artistId', (req, res) => {
  let artistId = req.params.artistId;
  res.set('Content-Type', 'application/json');
  return res.status(200).json(getArtistByArtistId(artistId));
});

app.delete('/artists/:artistId', (req, res) => {
  let artistId = req.params.artistId;
  res.set('Content-Type', 'application/json');
  deleteArtistByArtistId(artistId);
  return res.status(200).json({
    message: 'Successfully deleted',
  });
});

app.get('/artists', (req, res) => {
  res.set('Content-Type', 'application/json');
  return res.status(200).json(getAllArtists());
});

app.post('/artists', (req, res) => {
  let data = Object.assign({}, req.body);
  data = addArtist(data);
  res.set('Content-Type', 'application/json');
  return res.status(201).json(data);
});

// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
