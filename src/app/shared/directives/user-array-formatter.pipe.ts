import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models';

@Pipe({
  name: 'userArrayFormatter',
  standalone: true
})
export class userArrayFormatterPipe implements PipeTransform {

  transform(values: User[]): string {
    return values?.map(user => user.name).join(', ');
  }

}
