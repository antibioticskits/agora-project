import { Component, OnInit } from "@angular/core";
import { Block } from './block';

import { BlockLibraryService } from "./block-library.service";
import { BLOCKLIBRARY } from "./mock-block-library";

@Component({
    selector: 'block-library',
    templateUrl: './block-library.component.html',
    styleUrls: ['./block-library.component.css'],
    providers: [BlockLibraryService]
})
export class BlockLibraryComponent implements OnInit {
    title = "My Block Library";
    blocks: Block[];

    constructor(
        private blockLibraryService: BlockLibraryService
    ){ }

    getBlocks(): void {
        this.blockLibraryService.getBlocks()
            .then(blocks => this.blocks = blocks);
    }

    ngOnInit(): void {
        this.getBlocks();
    }
    onSelect(block: Block): void {
        block.selected = !block.selected;
        console.log(this.blocks);
    }


}


