import { Injectable } from "@angular/core";
import { Block } from "./block";
import { BLOCKLIBRARY } from "./mock-block-library";


@Injectable()
export class BlockLibraryService {
    getBlocks(): Promise<Block[]> {

        return Promise.resolve(BLOCKLIBRARY);
    }
}
