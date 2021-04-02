import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient, private httpClient: HttpClient) {
  }

  getServers(): Observable<any> {
    let url = environment.balancerUrl + "servers/metrics";
    if(environment.production) {
      url = "https://" + environment.balancerUrl + "servers/metrics";
    }
    const req = this.http.get<any>(url);

    return req.pipe(
      map(res =>
        res.servers
      )
    )
  }

  public changeStrategy(strategy: string) {
    let url = environment.balancerUrl + "config";
    if(environment.production) {
      url = "https://" + environment.balancerUrl + "config";
    }

    const res = this.httpClient.post(url, {strategy}, {
      observe: 'response',
      reportProgress: true,
      headers: {"Content-Type": "application/json"}
    });

    return res.pipe(
      map(response => {
        return response.body;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  setServerMetrics(host: string, textareacontent: string) {
    const url = `${host}manipulate/systemmetrics`;

    const res = this.httpClient.post(url, JSON.parse(textareacontent), {
      observe: 'response',
      reportProgress: true,
      headers: {"Content-Type": "application/json"}
    });

    return res.pipe(
      map(response => {
        return response.body;
      }),
      catchError((err) => {
        throw err;
      })
    );
  }

  call(requestId) {
    let url = environment.balancerUrl;
    if(environment.production) {
      url = "https://" + requestId + "." + environment.balancerUrl;
    }

    const req = this.http.get<any>(url);

    return req.pipe(
      map(res =>
        res
      )
    )
  }
}
