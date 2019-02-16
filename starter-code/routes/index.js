const express = require('express');
const router = express.Router();
const Place = require('../models/place')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/places', (req, res, next) => {
  Place.find({}, (error, placesFromDB) => {
    if (error) {
      next(error);
    } else {
      res.render('places/index', {
        places: placesFromDB
      });
    }
  });
});

router.get('/places/new', (req, res, next) => {
  res.render('places/new');
});

router.post('/places', (req, res, next) => {
  // add location object here

  let location = {
    type: 'Point',
    coordinates: [req.body.longitude, req.body.latitude]
  }

  const newPlace = new Place({
    name: req.body.name,
    type: req.body.type,
    location: location
  });

  newPlace.save((error) => {
    if (error) {
      next(error);
    } else {
      res.redirect('/places');
    }
  });
});

router.get('/places/:place_id', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      res.render('places/show', {
        place: place
      });
    }
  });
});

router.post('/places/:place_id', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      let location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      }
      place.name = req.body.name;
      place.type = req.body.type;
      place.location = location;

      place.save(error => {
        if (error) {
          next(error);
        } else {
          res.redirect(`/places/${req.params.place_id}`);
        }
      });
    }
  });
});

router.get('/places/:place_id/edit', (req, res, next) => {
  Place.findById(req.params.place_id, (error, place) => {
    if (error) {
      next(error);
    } else {
      res.render('places/update', {
        place
      });
    }
  });
});

router.get('/places/:place_id/delete', (req, res, next) => {
	Place.remove({ _id: req.params.place_id }, function(error, place) {
		if (error) {
			next(error);
		} else {
			res.redirect('/places');
		}
	});
});

module.exports = router;