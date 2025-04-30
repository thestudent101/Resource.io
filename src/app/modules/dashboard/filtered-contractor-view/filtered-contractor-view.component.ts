import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtered-contractor-view',
  templateUrl: './filtered-contractor-view.component.html',
  styleUrls: ['./filtered-contractor-view.component.css']
})
export class FilteredContractorViewComponent implements OnInit {

    level: string = "ALL";

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        let level = this.route.snapshot.params['level'] || 'ALL';
        this.level = level.toUpperCase();
    }

}
