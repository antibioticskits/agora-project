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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_dragula_1 = require("ng2-dragula/ng2-dragula");
var experiment_service_1 = require("../../services/experiment.service");
var ExperimentsComponent = (function () {
    function ExperimentsComponent(dragulaService, experimentService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.experimentService = experimentService;
        this.initiators = ['Initiator 1', 'Initiator 2', 'Initiator 3', 'Initiator 4', 'Initiator 5'];
        this.monomers = ['Monomer 1', 'Monomer 2', 'Monomer 3', 'Monomer 4', 'Monomer 5', 'Monomer 6', 'Monomer 7'];
        this.terminators = ['Terminator 1', 'Terminator 2', 'Terminator 3', 'Terminator 4'];
        this.blocks = [];
        dragulaService.setOptions('configurator-bag', {
            removeOnSpill: true,
            copy: function (el, source) {
                //Items in initiator, monomer, and terminator lists cannot be rearranged. Upon dragging into the drop-target list, elements are copied back into their place. Items in drop-target can still be sorted.
                return source.id === 'drop-origin';
            },
            accepts: function (el, target, source, sibling) {
                //If target is of id drop-origin, false is returned and element is not placed in that list.
                return target.id !== 'drop-origin';
            }
        });
        dragulaService.drag.subscribe(function (value) {
            console.log("drag: " + value[0]);
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            console.log("drop: " + value[0]);
            _this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(function (value) {
            console.log("over: " + value[0]);
            _this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(function (value) {
            console.log("out: " + value[0]);
            _this.onOut(value.slice(1));
        });
        this.experimentService.getExperiments()
            .subscribe(function (experiments) {
            _this.experiments = experiments;
        });
    }
    //Block submission.
    ExperimentsComponent.prototype.submitBlocks = function (blockArray) {
        //sort the array by i, m, and t's:
        var _this = this;
        var i = blockArray.slice(0, 1);
        var m = blockArray.slice(1, blockArray.length - 1);
        var t = blockArray.slice(blockArray.length - 1, blockArray.length);
        window.alert('Your data is being submitted to the database: i: ' + i + ', m: ' + m + ', t: ' + t);
        var newExperiment = {
            initiators: i,
            monomers: m,
            terminators: t,
            user: 'vivian',
            time: Date.now()
        };
        //Temporary add would be: this.experiments.push(newExperiment);
        //Permanent addition to database:
        this.experimentService.addExperiment(newExperiment)
            .subscribe(function (experiment) {
            _this.experiments.push(experiment);
        });
        //emptying the experiment bag:
        this.blocks = [];
    };
    ExperimentsComponent.prototype.deleteExperiment = function (id) {
        window.alert('Proceeding to carry out individual combinatorics with experiment of ID ' + id + ', edit data, or delete the experiment.');
        var experiments = this.experiments;
        this.experimentService.deleteExperiment(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < experiments.length; i++) {
                    console.log(experiments[i], id);
                    if (experiments[i]._id == id) {
                        experiments.splice(i, 1);
                    }
                }
            }
        });
    };
    ExperimentsComponent.prototype.makeCombinations = function (experiment) {
        var _this = this;
        this.experimentService.makeExperimentCombos(experiment)
            .subscribe(function (reactions) {
            // empty well_combinations list
            _this.well_combinations = [];
            for (var i_1 = 0; i_1 < reactions.length; i_1++) {
                // let row = String.fromCharCode(65 + Math.floor(i / 12));
                // let col = i % 12 + 1;
                // let well_location = `${row} ${col}`;
                var newCombo = {
                    initiators: reactions[i_1].initiators,
                    monomers: reactions[i_1].monomers,
                    terminators: reactions[i_1].terminators,
                    product_number: i_1,
                    experiment_id: experiment._id,
                };
                _this.well_combinations.push(newCombo);
            }
            // console.log( experiment);
            // console.log(this.experiments.slice(0,5));
            for (var i = 0; i < _this.experiments.length; i++) {
                if (_this.experiments[i]._id == experiment.id) {
                    _this.experiments[i].combinations = _this.well_combinations;
                    break;
                }
            }
            _this.current_experiment = experiment;
        });
    };
    ;
    ExperimentsComponent.prototype.onDrag = function (args) {
        var e = args[0], el = args[1];
        // on dragging an item
    };
    ExperimentsComponent.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        console.log(e);
    };
    ExperimentsComponent.prototype.onOver = function (args) {
        var e = args[0], el = args[1], container = args[2];
        // on dragging over a container
        console.log('entered container');
    };
    ExperimentsComponent.prototype.onOut = function (args) {
        var e = args[0], el = args[1], container = args[2];
        // when leaving a container;
        console.log('left container');
    };
    return ExperimentsComponent;
}());
ExperimentsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'experiments',
        templateUrl: 'experiments.component.html',
        viewProviders: [ng2_dragula_1.DragulaService]
    }),
    __metadata("design:paramtypes", [ng2_dragula_1.DragulaService, experiment_service_1.ExperimentService])
], ExperimentsComponent);
exports.ExperimentsComponent = ExperimentsComponent;
//# sourceMappingURL=experiments.component.js.map