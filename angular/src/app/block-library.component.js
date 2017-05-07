"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var block_library_service_1 = require("./block-library.service");
var BlockLibraryComponent = (function () {
    function BlockLibraryComponent(blockLibraryService) {
        this.blockLibraryService = blockLibraryService;
        this.title = "My Block Library";
    }
    BlockLibraryComponent.prototype.getBlocks = function () {
        var _this = this;
        this.blockLibraryService.getBlocks()
            .then(function (blocks) { return _this.blocks = blocks; });
    };
    BlockLibraryComponent.prototype.ngOnInit = function () {
        this.getBlocks();
    };
    BlockLibraryComponent.prototype.onSelect = function (block) {
        block.selected = !block.selected;
        console.log(this.blocks);
    };
    return BlockLibraryComponent;
}());
BlockLibraryComponent = __decorate([
    core_1.Component({
        selector: 'block-library',
        templateUrl: './block-library.component.html',
        styleUrls: ['./block-library.component.css'],
        providers: [block_library_service_1.BlockLibraryService]
    }),
    __metadata("design:paramtypes", [block_library_service_1.BlockLibraryService])
], BlockLibraryComponent);
exports.BlockLibraryComponent = BlockLibraryComponent;
//# sourceMappingURL=block-library.component.js.map