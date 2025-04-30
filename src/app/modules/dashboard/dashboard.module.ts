import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule, ThemeService } from 'ng2-charts';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { BASE_URL_PROVIDER } from 'src/app/app.provider';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppAuthHttpInterceptor } from 'src/app/app-auth-http.interceptor';
import { SimpleSummaryCardComponent } from './simple-summary-card/simple-summary-card.component';
import { BarChartCardComponent } from './bar-chart-card/bar-chart-card.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BlueViewComponent } from './blue-view/blue-view.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientViewComponent } from './client-view/client-view.component';
import { FilteringPipe } from 'src/app/shared/filtering-pipe/filtering-pipe.pipe';
import { TwoRowSummaryCardComponent } from './two-row-summary-card/two-row-summary-card.component';
import { ContractorViewComponent } from './contractor-view/contractor-view.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { ContractorDetailComponent } from './contractor-detail/contractor-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { SecureContractorDetailComponent } from './secure-contractor-detail/secure-contractor-detail.component';
import { SecureJobDetailsComponent } from './secure-job-details/secure-job-details.component';
import { FilteredContractorViewComponent } from './filtered-contractor-view/filtered-contractor-view.component';
import { OverviewComponent } from './overview/overview.component';
import { ConsultantsearchComponent } from './consultantsearch/consultantsearch.component';


@NgModule({
    declarations: [
        DashboardComponent,
        SimpleSummaryCardComponent,
        BarChartCardComponent,
        BlueViewComponent,
        ContractorViewComponent,
        SearchComponent,
        ClientViewComponent,
        FilteringPipe,
        TwoRowSummaryCardComponent,
        ClientDetailsComponent,
        JobDetailsComponent,
        ContractorDetailComponent,
        SecureContractorDetailComponent,
        SecureJobDetailsComponent,
        FilteredContractorViewComponent,
        OverviewComponent,
        ConsultantsearchComponent
    ],
    imports: [
        CommonModule,
        NgChartsModule,
        FormsModule,
        CustomMaterialModule,
        DashboardRoutingModule,
        LayoutModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        CommonModule,
        BlueViewComponent,
        SearchComponent,
        OverviewComponent,
        DashboardComponent
    ],
    providers: [
        ThemeService,
        BASE_URL_PROVIDER,
        { provide: HTTP_INTERCEPTORS, useClass: AppAuthHttpInterceptor, multi: true },
    ]
})
export class DashboardModule { }