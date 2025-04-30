import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SwUpdate, UpdateAvailableEvent, UpdateActivatedEvent } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class PwaService {

  private pwaEventSubject = new BehaviorSubject<PwaEvent>('sw_initialized');
  pwaEvent$: Observable<PwaEvent> = this.pwaEventSubject.asObservable();

  constructor(private swUpdate: SwUpdate) {
      this.swUpdate.available.subscribe((event:any) => {
          this.updateAvailableEventHandler(event);
      });
      this.swUpdate.activated.subscribe((event:any) => {
          this.updateActivatedEventHandler(event);
      });
      console.log(swUpdate);
  }

  public swAvailable(){
      return this.swUpdate.isEnabled;
  }

  public activateUpdate(){
      this.swUpdate.activateUpdate(); 
  }

  public checkForUpdate(){
      this.swUpdate.checkForUpdate();
  }

  public isServiceWorkerEnabled(): boolean {
      return this.swUpdate.isEnabled;
  }

  private updateAvailableEventHandler(event: UpdateAvailableEvent){
      this.pwaEventSubject.next('update_available');
  }

  private updateActivatedEventHandler(event: UpdateActivatedEvent){
      this.pwaEventSubject.next('update_active');
  }
}

export type PwaEvent = 
  | 'sw_initialized'
  | 'update_available'
  | 'update_active';

