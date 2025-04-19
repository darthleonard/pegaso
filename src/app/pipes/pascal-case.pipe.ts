import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase',
  standalone: true,
})
export class PascalCasePipe implements PipeTransform {
  transform(value: string, preserveSpaces: boolean = false): string {
    if (!value) return value;

    const words = value.split(' ');

    const pascalWords = words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    return preserveSpaces ? pascalWords.join(' ') : pascalWords.join('');
  }
}
