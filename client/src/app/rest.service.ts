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
    const req = this.http.get<any>(environment.balancerUrl + "servers/metrics");

    return req.pipe(
      map(res =>
        res.servers
      )
    )
  }

  public changeStrategy(strategy: string) {
    const url = `${environment.balancerUrl}config`;

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

  call() {
    const req = this.http.get<any>(environment.balancerUrl);

    return req.pipe(
      map(res =>
        res
      )
    )
  }
}
