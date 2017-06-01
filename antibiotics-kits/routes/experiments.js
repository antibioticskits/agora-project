var express = require('express');
var router = express.Router();
// var Combinatorics = require('js-combinatorics');
var mongoose = require('mongoose');
var db = require('../config/db');
var Experiment = require('../models/experiment_model');

// Get initial page
router.get('/', function(req, res, next){
  res.send('experiment page called "/"');
});


//Save User Input
router.post('/create', function(req, res, next){
    let experiment = req.body;
    let is_valid = experiment.initiators.length==0
      || experiment.monomers.length==0
      || experiment.terminators.length==0
      || !experiment.user;

    if(is_valid){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {

      let newExperiment = new Experiment( experiment );
      // save new experiment to db
      newExperiment.save(function(err, newExperiment) {
        if(err){
          res.send(err);
        } else {
          res.json(newExperiment.make_combos());
        }
      });
    }
});





module.exports = router;
