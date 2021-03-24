import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.scss']
})
export class VisualizerComponent implements OnInit {

  public results: any;

  constructor() {
    if (!this.results) {
      this.results = {};
    }
  }

  ngOnInit() {
  }

  setResults(results) {
    this.results = results;
  }

  identify(index, item) {
    return item.index;
  }
}
