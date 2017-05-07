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
      copySortSource: true,
      copy: function (el, source) {
        //Items in initiator, monomer, and terminator lists cannot be rearranged. Upon dragging into the drop-target list, elements are copied back into their place. Items in drop-target can still be sorted.
        return source.id === 'drop-origin';
      },
      accepts: function(el, target, source, sibling) {
        //If target is of id drop-origin, false is returned and element is not placed in that list.
        return target.id !== 'drop-origin';
      }
    });

  }

  submitBlocks(blockArray: any){
      window.alert(blockArray);
      console.log(blockArray);
      //new Angular2Csv(blockArray, 'MyReport.csv');
  }



}
