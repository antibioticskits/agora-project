import { Component } from '@angular/core';
import {ExperimentService} from './services/experiment.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  providers: [ExperimentService]
})

export class AppComponent { }
