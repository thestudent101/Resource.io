import { Component, OnInit, ViewEncapsulation, OnDestroy} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Subscription } from 'rxjs';
import { Statistics } from '../dashboard-models';

@Component({
  selector: 'app-blue-view',
  templateUrl: './blue-view.component.html',
  styleUrls: ['./blue-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BlueViewComponent implements OnInit, OnDestroy {

    statisticsSubscription!: Subscription;
    statistics!: Statistics;
    loading = false;
    error = false;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.loading = true;
        this.error = false;
        this.statisticsSubscription = this.dashboardService.getStatistics().subscribe(stats => {
            this.statistics = stats
            this.loading = false;
            this.error = false;
        }, error => {
            console.log(error)
            this.loading = false;
            this.error = true;
        });

        console.log(this.statistics);
        
    }

    ngOnDestroy() {
        if(this.statisticsSubscription) this.statisticsSubscription.unsubscribe();
    }


}