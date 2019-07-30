import { Pipe, PipeTransform } from '@angular/core'


@Pipe({
    name: 'convertToDegree'
})


export class ConvertToDegree implements PipeTransform {

    transform(value: string): string {

        return value + '\u00B0';
    }
}