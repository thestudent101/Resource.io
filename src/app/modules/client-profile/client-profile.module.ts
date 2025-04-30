import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientProfileRoutingModule } from './client-profile-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { EditClientProfileComponent } from './edit-client-profile/edit-client-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { BASE_URL_PROVIDER } from 'src/app/app.provider';
import { AppAuthHttpInterceptor } from 'src/app/app-auth-http.interceptor';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
    /** 
     * All component declerations will be automatically added here if you 
     * type ng g c modules/client-profile/COMPONENTNAME
     * **/
    declarations: [
        EditClientProfileComponent,
        ClientProfileComponent,
    ],
    imports: [
        /** You need to import any dependancies here as well, if they are needed by any components or services**/
        HttpClientModule,
        ReactiveFormsModule,
        CustomMaterialModule,
        FormsModule,
        SharedModule,
        /** CommonModule must always be imported in any child module **/
        CommonModule,
        ClientProfileRoutingModule
    ],
    exports: [
        /** CommonModule must always be exported in any child module that may be imported into another module **/
        CommonModule,
    ],
    providers: [
        BASE_URL_PROVIDER,
        { provide: HTTP_INTERCEPTORS, useClass: AppAuthHttpInterceptor, multi: true },
    ]
})
export class ClientProfileModule { }
