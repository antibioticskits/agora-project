const Combinatorics = require('js-combinatorics');
// let myjson = {
//     "initiators":["I1"],
//     "monomers":["M1","M3","M4"],
//     "terminators":["T1"]
// }

var Helper;

Helper.comb_gen = function* (arr, min_c) {
    var combo = Combinatorics.power(arr);
    var hello = combo.next();
    min_c = min_c > 0 ? min_c : 0;
    while (hello != undefined) {
        console.log(typeof(hello));
        if (hello.length >= min_c) { yield hello; }
        hello = combo.next();
    }
    return;
};

Helper.make_combos = function (exper) {
  let reactions = Array();

  let gen_i = combo_gen(exper.initiators, 1);
  while (i=[], i!==undefined, i=gen_i.next().value){

      let gen_m = combo_gen(exper.monomers, 0);
      while (m=[], m!==undefined, m=gen_m.next().value) {

          let gen_t = combo_gen(exper.terminators, 1);
          while (t=[], t!==undefined, t=gen_t.next().value){
              reactions.push({"initiators":i, "monomers":m, "terminators":t}) ;
          }
      }
  }
  console.log(reactions);
  return reactions;
  // SAVE REACTIONS TO DB
};

Helper.prettify = function (reactions) {
  const stringified = JSON.stringify(reactions));
  return stringified
}

// const result = make_combos(myjson);


module.exports = Helper;

//
// var ExperimentSchema = mongoose.Schema({
//   initiators: [ String ],
//   monomers: [ String ],
//   terminators: [ String ],
//   user: String,
//   time: Date
// });
