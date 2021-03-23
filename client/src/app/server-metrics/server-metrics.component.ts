import {Component, OnInit} from '@angular/core';
import {RestService} from "../rest.service";

@Component({
  selector: 'app-server-metrics',
  templateUrl: './server-metrics.component.html',
  styleUrls: ['./server-metrics.component.scss']
})
export class ServerMetricsComponent implements OnInit {

  public servers;

  displayedColumns: string[] = ['name', 'available', 'connections', 'cpuUsage', 'memoryUsage'];

  private seconds = 1; // seconds for server data reload

  constructor(private restService: RestService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.restService.getServers()
        .subscribe((res) => {
          this.servers = res;
          console.log(res);
        });
    }, this.seconds * 1000)
  }
}