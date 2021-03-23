import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getServers(): Observable<any> {
    const req = this.http.get<any>(environment.balancerUrl + "servers/metrics");

    return req.pipe(
      map(res =>
        res.servers
      )
    )
  }
}
