import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject,throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  BACKEND_URL = "";
  API_URL = this.BACKEND_URL+"/experiments/";

  constructor(private httpClient: HttpClient) { }

  public addExperiment(experiment): Observable<any> {
    return this.httpClient.post(this.API_URL+"add", experiment);
  }

  public getExperiments(): Observable<any> {
    return this.httpClient.get(this.API_URL+"all");
  }
  public myBackEnd(){
    return this.BACKEND_URL;
  }
}
