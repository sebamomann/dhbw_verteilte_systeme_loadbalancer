import {Component, ElementRef, ViewChild} from '@angular/core';
import {VisualizerComponent} from "./visualizer/visualizer.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  @ViewChild('visualizer', {static: true})
  private visualizer: VisualizerComponent;

  private results = [];

  getResults($event: any) {
    this.results = $event;

    this.visualizer.setResults(this.results)
  }
}
