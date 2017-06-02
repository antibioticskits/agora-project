import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class ExperimentService{
  constructor(private http:Http){
    console.log('Experiment Service has been inititalized');
  }

  getExperiments(){
    return this.http.get('api/experiments')
      .map(res => res.json());
  }

  addExperiment(newExperiment){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('api/experiment', JSON.stringify(newExperiment), {headers: headers})
      .map(res => res.json());
  }

  deleteExperiment(id){
    return this.http.delete('api/experiment/'+id)
      .map(res => res.json());
  }

  makeExperimentCombos(newExperiment){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put(`api/combos`, 
      JSON.stringify(newExperiment), {headers: headers})
      .map(res => res.json() ) ;
  }
}
