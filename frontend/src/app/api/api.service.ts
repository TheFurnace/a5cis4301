import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { flower, sighting } from "./api.model";
import { environment as env } from "../../environments/environment";

@Injectable()
export class FlowerApiService {
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(
      err.message || "Error: Unable to complete request."
    );
  }

  getFlowerList(): Observable<string[]> {
    return this.http
      .get<string[]>(`${env.API_URL}/flowers`)
      .pipe(catchError(FlowerApiService._handleError));
  }

  getFlowerDetails(flower: string): Observable<flower> {
    return this.http
      .get<flower>(`${env.API_URL}/flowers/${flower}`)
      .pipe(catchError(FlowerApiService._handleError));
  }

  updateFlowerDetails(flower: flower): Observable<string> {
    return this.http
      .put<string>(`${env.API_URL}/flowers/${flower.comname}`, { params: flower })
      .pipe(catchError(FlowerApiService._handleError));
  }

  getFlowerSightings(flower: string): Observable<sighting> {
    return this.http
      .get<sighting>(`${env.API_URL}/flowers/${flower}/sightings`)
      .pipe(catchError(FlowerApiService._handleError));
  }

  postFlowerSightings(sighting: sighting): Observable<string> {
    return this.http
      .post<string>(`${env.API_URL}/flowers/${sighting.name}/sightings`, { params: sighting})
      .pipe(catchError(FlowerApiService._handleError));
  }
}
