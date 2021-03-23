import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
      url: "http://localhost:8081/"
    },
    {
      text: "Service 2",
      value: "1",
      url: "http://localhost:8082/"
    },
    {
      text: "Service 3",
      value: "2",
      url: "http://localhost:8083/"
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
