import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { ExperimentService } from '../../services/experiment.service';
import { Experiment } from '../../../Experiment';
import { Combination } from '../../../Combination';

@Component({
  moduleId: module.id,
  selector: 'experiments',
  templateUrl: 'experiments.component.html',
  viewProviders: [DragulaService]
})

export class ExperimentsComponent {


experiments: Experiment[];
well_combinations: Combination[];
current_experiment: Experiment;
user: string;
time: string;


private initiators: Array<any> = ['Initiator 1', 'Initiator 2', 'Initiator 3', 'Initiator 4', 'Initiator 5'];
private monomers: Array<any> = ['Monomer 1', 'Monomer 2', 'Monomer 3', 'Monomer 4', 'Monomer 5', 'Monomer 6', 'Monomer 7'];
private terminators: Array<any> = ['Terminator 1', 'Terminator 2', 'Terminator 3', 'Terminator 4'];
blocks: Array<string> = [];

constructor(private dragulaService: DragulaService, private experimentService: ExperimentService ) {
  dragulaService.setOptions('configurator-bag', {
    removeOnSpill: true,
    copy: function (el, source) {
      //Items in initiator, monomer, and terminator lists cannot be rearranged. Upon dragging into the drop-target list, elements are copied back into their place. Items in drop-target can still be sorted.
      return source.id === 'drop-origin';
    },
    accepts: function(el, target, source, sibling) {
      //If target is of id drop-origin, false is returned and element is not placed in that list.
      return target.id !== 'drop-origin';
    }
  });

  dragulaService.drag.subscribe((value) => {
    console.log(`drag: ${value[0]}`);
    this.onDrag(value.slice(1));
  });

  dragulaService.drop.subscribe((value) => {
    console.log(`drop: ${value[0]}`);
    this.onDrop(value.slice(1));
  });

  dragulaService.over.subscribe((value) => {
    console.log(`over: ${value[0]}`);
    this.onOver(value.slice(1));
  });

  dragulaService.out.subscribe((value) => {
    console.log(`out: ${value[0]}`);
    this.onOut(value.slice(1));
  });

  this.experimentService.getExperiments()
    .subscribe(experiments => {
      this.experiments = experiments;
    });
}


//Block submission.
submitBlocks(blockArray: any){

    //sort the array by i, m, and t's:

    var i = blockArray.slice(0,1);
    var m = blockArray.slice(1,blockArray.length-1);
    var t = blockArray.slice(blockArray.length-1,blockArray.length);

    window.alert('Your data is being submitted to the database: i: '+i +', m: '+m +', t: '+t);

    var newExperiment = {
      initiators: i,
      monomers: m,
      terminators: t,
      user: 'vivian',
      time: Date.now()
    }

    //Temporary add would be: this.experiments.push(newExperiment);
    //Permanent addition to database:
    this.experimentService.addExperiment(newExperiment)
      .subscribe(experiment => {
        this.experiments.push(experiment);
      });



    //emptying the experiment bag:
    this.blocks = [];
}

deleteExperiment(id){

  window.alert('Proceeding to carry out individual combinatorics with experiment of ID '+ id + ', edit data, or delete the experiment.');
  var experiments = this.experiments;
  this.experimentService.deleteExperiment(id).subscribe(data => {
    if(data.n == 1){
      for(var i=0;i<experiments.length;i++){
        console.log(experiments[i], id)
        if(experiments[i]._id == id){
          experiments.splice(i, 1);
        }
      }
    }
  });
}

makeCombinations(experiment){
    this.experimentService.makeExperimentCombos(experiment)
      .subscribe(reactions => {
        // empty well_combinations list
        this.well_combinations = [] ;
        for (let i=0; i<reactions.length;i++){
          // let row = String.fromCharCode(65 + Math.floor(i / 12));
          // let col = i % 12 + 1;
          // let well_location = `${row} ${col}`;

          let newCombo = {
            initiators:  reactions[i].initiators,
            monomers:    reactions[i].monomers,
            terminators: reactions[i].terminators,
            product_number: i,
            experiment_id: experiment._id,
            // well_location: well_location
          }
          this.well_combinations.push(newCombo);
        }
        // console.log( experiment);
        // console.log(this.experiments.slice(0,5));

        for(var i=0;i<this.experiments.length;i++){
          if(this.experiments[i]._id == experiment.id){
            this.experiments[i].combinations = this.well_combinations;
            break
          }
        }


        this.current_experiment = experiment;

      });
    };



private onDrag(args) {
  let [e, el] = args;
  // on dragging an item
}

private onDrop(args) {
  let [e, el] = args;
  console.log(e);
}

private onOver(args) {
  let [e, el, container] = args;
  // on dragging over a container
  console.log('entered container');
}

private onOut(args) {
  let [e, el, container] = args;
  // when leaving a container;
  console.log('left container');
}

}
