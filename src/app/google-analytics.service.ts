import { Injectable } from '@angular/core';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {

  constructor() { }

  
  public emitPageViewEvent(path: string){        
    let eventData = { 'page_path': path};
    console.log('gtag', 'config', eventData);
    if (window.location.hostname == 'blueapp.blue' || window.location.hostname == 'www.blueapp.blue') gtag('config', 'UA-26043512-3', eventData)
}

public emitEvent( eventName: string, eventCategory: string, eventAction: string, eventLabel: string = '', eventValue: number = 0) {
    let eventData = { eventCategory: eventCategory, eventLabel: eventLabel, eventAction: eventAction, eventValue: eventValue };
    console.log('gtag', 'event', eventName, eventData);
    if (window.location.hostname == 'blueapp.blue' || window.location.hostname == 'www.blueapp.blue'||window.location.hostname == 'dev.blueapp.blue'|| window.location.hostname == 'www.blueapp.blue' ) gtag('event', eventName, eventData)
}
}
