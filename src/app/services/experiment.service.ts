import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject,throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  API_URL = "http://localhost:8080/experiments/add";

  constructor(private httpClient: HttpClient) { }

  public addExperiment(experiment): Observable<any> {
    return this.httpClient.post(this.API_URL, experiment);
  }
}
