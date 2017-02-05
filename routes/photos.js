var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;
var multer = require('multer');
var upload = multer().single('photo[image]');
var mongoose = require('mongoose');

var photos = [];
photos.push({
  name: 'Cyclists against the Pope',
  path: '/images/cyclists.jpg'
});

photos.push({
  name: 'Delicious Food',
  path: '/images/foods.jpg'
});

// var savedPhotos;

exports.list = function(req, res) {
  var savedPhotos;

  Photo.find({}, function(err, loadedPhotos) {
    if (err) savedPhotos = photos;
    savedPhotos = loadedPhotos;

    res.locals = {
      apptitle: 'Pure Imagination',
      savedPhotos: savedPhotos
    };

    res.render('photos', {
      title: 'Delicious Photos',
      photos: photos
    });

  });
};

exports.form = function(req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  });
};

exports.submit = function(dir) {
  return function(req, res, next) {
    var img, name;
    upload(req, res, function(err) {
      if (err) {
        console.log("An error in the Multer pipeline");
      }
      img = req.file;
      name = req.body.photo.name || img.name;
      console.log("Assume Multer went past " + req.file.originalname.toString() + ' *** ' + name);

      var path = join(dir, img.originalname);
      console.log('path is ' + path);
      mPhoto = new Photo({
        name: name,
        path: img.originalname
      });
      fs.writeFile(path, img.buffer, function(err) {
        if(err) console.log('Error writing file ', + err);

        mPhoto.save(function(err, thePhoto) {
          if (err) console.log('An error saving ' + err);
          res.redirect('/');
        });
      });

      // Photo.create({
      //   name: name,
      //   path: img.name
      // }, function(err) {
      //   if (err) return next(err);
      //   res.redirect('/');
      // });

      // fs.rename(path.toString(), path.toString(), function(err) {
      //   if (err) return next(err);
      //
      //   // Photo.create({
      //   //   name: name,
      //   //   path: img.name
      //   // }, function(err) {
      //   //   if (err) return next(err);
      //   //   res.redirect('/');
      //   // });
      // });
    });
    // var img = req.file.image;
    // var name = req.body.photo.name || img.name;

  };
}
