import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from './state.service';
import { DE, EN } from './languages';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  constructor(
    private state: StateService
  ) {}

  transform(value: string): Observable<any> {
    const k = value.split('.');
    return this.state.activeLang.pipe(
      map( lang => lang === 'de'
      ? DE[ k[0] ][ k[1] ]
      : EN[ k[0] ][ k[1] ] )
    ) || of('');
  }

}