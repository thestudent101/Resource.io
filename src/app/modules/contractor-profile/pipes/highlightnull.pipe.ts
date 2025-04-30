import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightnull'
})
export class HighlightnullPipe implements PipeTransform {
  transform(value: any[]): any[] {
    if (!Array.isArray(value)) {
      return value;
    }

    const highlightedArray = [];

    // Iterate over the array
    for (const object of value) {
      if (typeof object === 'object' && object !== null) {
        const highlightedObject:any = {};

        // Iterate over the object's properties
        for (const key in object) {
          if (object.hasOwnProperty(key)) {
            if (object[key] === null) {
              // Append the "bg-warning" class to the property with null value
              highlightedObject[key] = { ...object[key], class: 'bg-warning' };
            } else {
              highlightedObject[key] = { ...object[key] };
            }
          }
        }

        highlightedArray.push(highlightedObject);
      } else {
        highlightedArray.push(object);
      }
    }

    return highlightedArray;
  }

}
