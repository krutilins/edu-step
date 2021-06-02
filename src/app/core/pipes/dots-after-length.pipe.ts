import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotsAfterLength'
})
export class DotsAfterLengthPipe implements PipeTransform {

  public transform(value: unknown, args: number[]): string { // TODO: I don't know why it is not working
    const str = value.toString();

    if (str.length > args[0]) {
      return [...value.toString().split('').splice(0, args[0] || 25), '...'].join('');
    } else {
      return str;
    }
  }

}
