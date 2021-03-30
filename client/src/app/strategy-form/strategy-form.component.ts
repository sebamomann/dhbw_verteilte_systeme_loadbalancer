import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-strategy-form',
  templateUrl: './strategy-form.component.html',
  styleUrls: ['./strategy-form.component.scss']
})
export class StrategyFormComponent implements OnInit {

  public currentStrategy = "";
  public strategies = [
    {
      text: "Round Robin",
      value: "round-robin"
    }, {
      text: "IPHash",
      value: "ip-hash"
    }, {
      text: "Least Connections",
      value: "least-connection"
    }, {
      text: "Resource Based",
      value: "resource-based"
    }
  ]

  constructor(private restService: RestService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  changesStrategy() {
    setTimeout(() => {
      this.restService.changeStrategy(this.currentStrategy)
        .subscribe(
          (sResponse) => {
            this._snackBar.open("Strategy changed", null, {
              duration: 2000,
            });
          },
          (err) => {
            this._snackBar.open("Strategy change ERROR", null, {
              duration: 2000,
            });
          },
          () => {

          }
        );
    }, 100)
  }
}
