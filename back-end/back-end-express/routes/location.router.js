 var express = require('express');
var router = express.Router();
var Location = require('../src/models/Location');


router.get('/', function(req, res, next) {
  Location.getAllLocations(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  })
});

router.get('/:name', function(req, res, next) {
  if (req.params.name) {
    Location.getLocationsByName(req.params.name, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows)
      }
    });
  } 
});

router.get('/:name/today', function(req, res, next) {
  if (req.params.name) {
    Location.getLocationsByNameToday(req.params.name, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows)
      }
    });
  } 
});


router.get('/:name?', function(req, res, next) {
  if (req.params.name) {
    Location.getLocationsByName(req.params.name, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows)
      }
    });
  } else {
    Location.getAllLocations(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    })
  }
});

router.post("/", function(req, res, next) {
  var locationInfo = req.body;
  if (!!req.headers.name) {
      locationInfo[0].name = req.headers.name;
  }

  Location.saveLocation(locationInfo, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(locationInfo)
    }
  })
})

module.exports = router;
