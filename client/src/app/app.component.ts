import {Component, ViewChild} from '@angular/core';
import {VisualizerComponent} from "./visualizer/visualizer.component";
import {StrategyFormComponent} from "./strategy-form/strategy-form.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  @ViewChild('visualizer', {static: true})
  private visualizer: VisualizerComponent;

  @ViewChild('strategy-form', {static: true})
  private strategyForm: StrategyFormComponent;

  private results = [];

  public getResults($event: any) {
    this.results = $event;

    this.visualizer.setResults(this.results)
  }

  public setCurrentStrategy($event: any) {
    this.strategyForm.setCurrentStrategy($event);
  }
}
