import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  viewProviders: [DragulaService]
})
export class AppComponent {
  title = 'Agora Configurator 0.0.1';

  private initiators: Array<any> = ['Initiator 1', 'Initiator 2', 'Initiator 3', 'Initiator 4', 'Initiator 5'];
  private monomers: Array<any> = ['Monomer 1', 'Monomer 2', 'Monomer 3', 'Monomer 4', 'Monomer 5', 'Monomer 6', 'Monomer 7'];
  private terminators: Array<any> = ['Terminator 1', 'Terminator 2', 'Terminator 3', 'Terminator 4'];
  blocks: Array<string> = [];

  constructor(private dragulaService: DragulaService) {
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

  }

  submitBlocks(blockArray: any){
      //window.alert(blockArray);
      console.log(blockArray);
      //new Angular2Csv(blockArray, 'MyReport.csv');
  }

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
