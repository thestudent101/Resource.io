import { Component, OnInit, Input } from '@angular/core';
import { CompanyJobProfile } from '../company-profile-models';
import { Profiles } from '../job-profile-models';

@Component({
    selector: 'app-job-card',
    templateUrl: './job-card.component.html',
    styleUrls: ['./job-card.component.css']
})
export class JobCardComponent implements OnInit {

    @Input() profile!: CompanyJobProfile | Profiles

    constructor() { }

    ngOnInit() {
    }

}
