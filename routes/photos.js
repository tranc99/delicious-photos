var photos = [];
photos.push({
  name: 'Cyclists against the Pope',
  path: '/images/cyclists.jpg'
});

photos.push({
  name: 'Delicious Food',
  path: '/images/foods.jpg'
});

exports.list = function(req, res) {
  res.render('photos', {
    title: 'Delicious Photos',
    photos: photos
  });
};
