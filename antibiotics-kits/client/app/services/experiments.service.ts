import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService{
    constructor(private http:Http){
        console.log('Experiments Service Initialized...');
    }


    createExperiment(newExperiment){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/experiments/create',
          JSON.stringify(newExperiment), {headers: headers})
            .map(res => res.json());
    }
    analyzeExperiment(){
      return this.http.get('/experiments/analyze')
      .map(res => res.json());
    }

    // deleteTask(id){
    //     return this.http.delete('/api/task/'+id)
    //         .map(res => res.json());
    // }
    //
    // updateStatus(task){
    //     var headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.put('/api/task/'+task._id, JSON.stringify(task), {headers: headers})
    //         .map(res => res.json());
    // }
}
