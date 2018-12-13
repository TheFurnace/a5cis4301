import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class BingApiService {
  constructor(private http: HttpClient) {}

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(
      err.message || "Error: Unable to complete request."
    );
  }

  headers = {
    "Ocp-Apim-Subscription-Key": "b399aacf73944604a37c18399ffdf584"
  };

  getImageFromQuery(query: string): Promise<Object> {
    return this.http
      .get<object>(
        "https://api.cognitive.microsoft.com/bing/v7.0/images/search",
        {
          headers: this.headers,
          params: {
            q: query
          }
        }
      )
      .pipe(catchError(BingApiService._handleError))
      .toPromise();
  }

  getURLFromResult(response): string {
    if (response.value[0]) {
      let url = response.value[0].contentUrl;
      return url;
    } else return "http://www.browsertechnicalsupportnumbers.com/wp-content/uploads/2017/08/Troubleshoot-Opera-Browser-Incompatibility-Error.png"
  }
}
