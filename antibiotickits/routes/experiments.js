var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://agora:Agora2017@ds151661.mlab.com:51661/antibiotics_kits', ['experiments']);
var helpers = require('./helpers');
//Display all experiments.
router.get('/experiments', function(req, res, next){
    db.experiments.find(function(err, experiments){
      if(err){
        res.send(err);
      }
      res.json(experiments);
    });
});

//Display just one experiment with a given unique ID.
router.get('/experiment/:id', function(req, res, next){
    db.experiments.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, experiment){
      if(err){
        res.send(err);
      }
      res.json(experiment);
    });
});

//Delete a single experiment witha given ID.
router.delete('/experiment/:id', function(req, res, next){
    db.experiments.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, experiment){
      if(err){
        res.send(err);
      }
      res.json(experiment);
    });
});

//Save a single experiment to the Database.
router.post('/experiment', function(req, res, next){
    var experiment = req.body;
    if(!experiment.user){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.experiments.save(experiment, function(err, experiment){
            if(err){
              res.send(err);
            }
            res.json(experiment);
        });
    }
});

// NEW
router.put('/combos', function(req, res, next){
  var experiment = req.body;
  if (!experiment.initiators){
    res.status(400);
    res.json({
        "error": "Bad Data"
    });
  }
  helpers.makeCombinations(experiment, function(err, reactions){
    if(err){
      console.error(err);
      res.send(err);
    } else {
    console.log("got combos!");
    res.json(reactions);}
  });

});








module.exports = router;
