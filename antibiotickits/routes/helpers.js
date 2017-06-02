var express = require('express');
var router = express.Router();

var Combinatorics = require('js-combinatorics');


/** generator for making combinations **/
function* combo_gen (arr, min_c) {
  var combo = Combinatorics.power(arr);
  var hello = combo.next();
  min_c = min_c > 0 ? min_c : 0;

  while (hello !== undefined) {
      if (hello.length >= min_c) {
        yield hello;
      }
      hello = combo.next();
  }
  return combo;
}


exports.makeCombinations = function(experiment, callback){
  var reactions = Array();
  try {
    var gen_i = combo_gen(experiment.initiators, 1);
    var i = gen_i.next().value;
    while (i!=undefined){
      i = [i[0]];
      var gen_m = combo_gen(experiment.monomers, 0);
      var m = gen_m.next().value;

      while (m!==undefined) {m = Object.keys(m).length==0 ? [] : m

        var gen_t = combo_gen(experiment.terminators, 1);
        var t= [gen_t.next().value[0]];

        while (t!==undefined){
          t = [t[0]];
          reactions.push({"initiators":i, "monomers":m, "terminators":t}) ;
          t=gen_t.next().value;
        } m = gen_m.next().value;
      }
      i = gen_i.next().value;
    }
  }
  catch (e) {
    console.error(`something happened while making combos! \n ${e}`);
    callback(e);
  }

  console.log("finished with helper ");
  callback(reactions);
}
