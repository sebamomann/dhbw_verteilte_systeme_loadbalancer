import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {RestService} from "../rest.service";

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss']
})
export class AnalyzerComponent implements OnInit {
  public results = {
    nrOfReqsServer1: 0,
    nrOfReqsServer2: 0,
    nrOfReqsServer3: 0,
    res: []
  };

  public event: FormGroup;
  private parallelRequests: number;
  private currentIndex = 0;
  private running: Boolean;

  @Output()
  private result: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private restService: RestService) {
  }

  ngOnInit() {
    this.event = this.formBuilder.group({
      parallel: new FormControl('10'),
    });
  }

  runBatch() {
    this.running = true;

    for (let i = this.parallelRequests - 1; i >= 0; i--) {
      this.call();
    }
  }

  start() {
    this.parallelRequests = this.event.get("parallel").value;

    this.runBatch();
  }

  stop() {
    this.running = false;
  }

  reset() {
    this.results = {
      nrOfReqsServer1: 0,
      nrOfReqsServer2: 0,
      nrOfReqsServer3: 0,
      res: []
    };

    this.currentIndex = 0;
    this.result.emit(this.results);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private call() {
    const thisIndex = this.currentIndex;
    this.currentIndex++;

    const newResultObject = {
      index: thisIndex,
      server1: undefined,
      server2: undefined,
      server3: undefined,
    }
    this.results.res.unshift(newResultObject)

    this.restService.call().subscribe((res) => {
      const result = this.results.res.find((fResult) => fResult.index === thisIndex);
      result.server1 = false;
      result.server2 = false;
      result.server3 = false;

      const name = `nrOfReqs` + this.capitalizeFirstLetter(res.name);
      this.results[name]++;

      result[res.name] = true;
      if (this.running) {
        this.call()
      }
    });

    this.result.emit(this.results);
  }
}
