import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-metrics-override-form',
  templateUrl: './metrics-override-form.component.html',
  styleUrls: ['./metrics-override-form.component.scss']
})
export class MetricsOverrideFormComponent implements OnInit {
  public selectedServer: string;
  public servers = [
    {
      text: "Service 1",
      value: "0",
      url: environment.service1Url
    },
    {
      text: "Service 2",
      value: "1",
      url: environment.service2Url
    },
    {
      text: "Service 3",
      value: "2",
      url: environment.service3Url
    },
  ];
  textareacontent: string;

  constructor(private restService: RestService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  submit() {
    this.restService.setServerMetrics(this.servers[+this.selectedServer].url, this.textareacontent)
      .subscribe(
        (sResponse) => {
          this._snackBar.open("Values changed", null, {
            duration: 2000,
          });
        },
        (err) => {
          this._snackBar.open("Value change - ERROR", null, {
            duration: 2000,
          });
        },
        () => {

        }
      );
    ;
  }

  onKey(event) {
    this.textareacontent = event.target.value;
  }
}
