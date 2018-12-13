import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { flower, sighting } from "./api.model";
import { environment as env } from "../../environments/environment";

@Injectable()
export class FlowerApiService {
  constructor(private http: HttpClient) {}

  getFlowerList(): Observable<string[]> {
    return this.http
      .get<string[]>(`${env.API_URL}/flowers`)
  }

  getFlowerDetails(flower: string): Observable<flower> {
    return this.http
      .get<flower>(`${env.API_URL}/flowers/${flower}`)
  }

  updateFlowerDetails(flower: flower): Observable<string> {
    return this.http
      .put<string>(
        `${env.API_URL}/flowers/${flower.comname}`,
        JSON.stringify(flower),
        {
          headers: { "Content-Type": "application/json" }
        }
      )
  }

  getFlowerSightings(flower: string): Observable<sighting[]> {
    return this.http
      .get<sighting[]>(`${env.API_URL}/flowers/${flower}/sightings`)
  }

  postFlowerSightings(sighting: sighting): Observable<string> {
    return this.http
      .post<string>(
        `${env.API_URL}/flowers/${sighting.name}/sightings`,
        JSON.stringify(sighting),
        {
          headers: { "Content-Type": "application/json" }
        }
      )
  }
}
