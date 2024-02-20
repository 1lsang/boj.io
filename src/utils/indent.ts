export default function indent(str: string, width: number) {
  return str
    .split('\n')
    .map((line: string) => ' '.repeat(width) + line)
    .join('\n');
}
