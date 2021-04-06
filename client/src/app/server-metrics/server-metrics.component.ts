import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-server-metrics',
  templateUrl: './server-metrics.component.html',
  styleUrls: ['./server-metrics.component.scss']
})
export class ServerMetricsComponent implements OnInit {

  public servers;
  displayedColumns: string[] = ['name', 'available', 'connections', 'cpuUsage', 'memoryUsage'];
  totalRequests: any;
  @Output()
  private currentStrategy = new EventEmitter();
  private seconds = 1; // seconds for server data reload

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.restService.getServerMetrics()
        .subscribe((res) => {
          this.servers = res.servers;

          this.currentStrategy.emit(res.strategy);

          this.totalRequests = 0;
          this.servers.foreEach(
            (fServer) => {
              this.totalRequests += fServer.metrics.connections;
            })
        });
    }, this.seconds * 1000)
  }
}
