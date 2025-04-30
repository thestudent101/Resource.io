import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myfilter',
  pure: false
})

export class 
FilteringPipe implements PipeTransform {

  constructor() { }
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.name.indexOf(filter.name) !== -1);
  }

  ngOnInit() {
  }

}
