var express = require('express');
var router = express.Router();
// var Combinatorics = require('js-combinatorics');
var mongoose = require('mongoose');
var Experiment = require('../models/experiment.model');



const db_path = ```vivianleung:1309Westlink@ds151661.mlab.com:51661/antibiotics_kits```;
mongoose.connect(db_path);

// mongoose.connection('mongodb://vivianleung:1309Westlink@ds151661.mlab.com:51661/antibiotics_kits')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!");
  // we're connected!
});

// Define Schema
var ExperimentSchema = mongoose.Schema({
  initiators: [ String ],
  monomers: [ String ],
  terminators: [ String ],
  user: String,
  time: Date
});

var Experiment = mongoose.model('Experiment', ExperimentSchema);


function* combo_gen(arr, min_c) {
    let combo = Combinatorics.power(arr);
    let hello = combo.next();
    min_c = min_c > 0 ? min_c : 0;
    while (hello !== undefined) {
        if (hello.length >= min_c) { yield hello; }
        hello = combo.next();
    }
    return;
  };

function make_combos(exper) {
  let reactions = Array();

  let gen_i = combo_gen(exper.initiators, 1);
  while (i=[], i!==undefined, i=gen_i.next().value){

      let gen_m = combo_gen(exper.monomers, 0);
      while (m=[], m!==undefined, m=gen_m.next().value) {

          let gen_t = combo_gen(exper.terminators, 1);
          while (t=[], t!==undefined, t=gen_t.next().value){
              reactions.push([i,m,t]) ;
          }
      }
  }
  console.log(reactions);
  return reactions;
};


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
          let analyzed = make_combos(newExperiment);
          res.json(analyzed);
        }
      });
    }
});

// make comobs
router.get('/analyze', function(req, res, next) {
  let experiment = new Experiment(req.body);

  experiment.make_combos(function(err, experiment){
    res.json(make_combos(newExperiment));
  });

});


/**
    // Get All Tasks
    router.get('/tasks', function(req, res, next){
        db.tasks.find(function(err, tasks){
            if(err){
                res.send(err);
            }
            res.json(tasks);
        });
    });


// update user input

// get stuff from database

// delete stuff from database




// Get Single Task
router.get('/experiment/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});



// Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Update Task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask, {}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});
**/
module.exports = router;
