// write a function to retreive a blog of json.
// write an ajax request! Use the fetch function (ES6 function).

https://rallycoding.herokuapp.com/api/music_albums

// function fetchAlbums() {
//   fetch('http://rallycoding.herokuapp.com/api/music_albums')
//     .then(res => {
//       return res.json();
//     })
//     .then(json => console.log(json));
// }

const fetchAlbums = async () => {
  const res = await fetch('http://rallycoding.herokuapp.com/api/music_albums');
  const json = await res.json();

  console.log(json);
};

fetchAlbums();