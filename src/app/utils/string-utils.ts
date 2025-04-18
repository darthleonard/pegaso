export class StringUtils {
  toPascalCase(str: string): string {
    return str
      .split(' ')
      .map((segment) =>
        segment
          .replace(/[_\-]+/g, ' ')
          .split(' ')
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join('')
      )
      .join(' ');
  }
}
