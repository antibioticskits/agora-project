var Combinatorics = require('js-combinatorics');

const toDoubleQuotes = require('to-double-quotes');


function* combo_gen(arr, min_c) {
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

function make_combos(exper) {
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
  // console.log(reactions);
  return reactions;
};

function prettify (rxlist) {
  var prettified = [];
  for (let i=0; i<rxlist.length; i++) {
    let entry = [];
    for (key in rxlist[i]) {
        let part = rxlist[i][key]
        entry.push(rxlist[i][key]);
    }
    console.log(entry.join('-'));
    prettified.push(entry.join('-'));
}
return prettified;
}
//
// var ExperimentSchema = mongoose.Schema({
//   initiators: [ String ],
//   monomers: [ String ],
//   terminators: [ String ],
//   user: String,
//   time: Date
// });
let myjson = {
    "initiators":["I1"],
    "monomers":["M1","M3","M4"],
    "terminators":["T1"]
}
console.log("\n");
var result = make_combos(myjson);
var pretty = prettify(result);

for (i=0;i<pretty.length;i++) {
  console.log(JSON.stringify(pretty[i]));
}
