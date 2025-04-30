import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditClientProfileComponent } from './edit-client-profile/edit-client-profile.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';

/** These routes are relative to the route provided in app-routing.module.ts **/
const routes: Routes = [    
    { path: '', component: ClientProfileComponent },
    { path: 'edit', component: EditClientProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientProfileRoutingModule { }
