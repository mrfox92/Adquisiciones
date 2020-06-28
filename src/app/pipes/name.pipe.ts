import { Pipe, PipeTransform } from '@angular/core';
import { last } from 'rxjs/operators';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(name: string, lastName: string = null): any {

    return ( lastName ) ? `${ name } ${ lastName }` : name;
  }

}
