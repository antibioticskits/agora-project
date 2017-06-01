var Combinatorics = require('js-combinatorics');

var mongoose = require('mongoose');
var db = require('../config/db');

/** Define Schema **/
var experimentSchema = mogoose.Schema({
  initiators: [ String ],
  monomers: [ String ],
  terminators: [ String ],
  user: String,
  time: Date
});

experimentSchema.methods.combo_gen = function* (arr, min_c) {
    var combo = Combinatorics.power(arr);
    var hello = combo.next();
    min_c = min_c > 0 ? min_c : 0;
    while (hello !== undefined) {
        if (hello.length >= min_c) {
          yield hello;
        }
        hello = combo.next();
    }
    return;
};

/** Schema Methods **/
experimentSchema.methods.make_combos = function () {
  let reactions = Array();
  let gen_i = combo_gen(this.initiators, 1);
  while (i=[], i!==undefined, i=gen_i.next().value){

      let gen_m = combo_gen(this.monomers, 0);
      while (m=[], m!==undefined, m=gen_m.next().value) {

          let gen_t = combo_gen(this.terminators, 1);
          while (t=[], t!==undefined, t=gen_t.next().value){
              reactions.push({"initiators":i, "monomers":m, "terminators":t}) ;
          }
      }
  }
  return reactions;
};

experimentSchema.methods.prettify = function (reactions) {
  const stringified = JSON.stringify(reactions));
  return stringified
}


/** Define Model **/
var Experiment = mongoose.model('Experiment', experimentSchema);

module.exports = Experiment;
