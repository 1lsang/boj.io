export default function box(input: string, width?: number) {
  const maxLength = Math.max(
    ...input.split('\n').map((line) => line.length),
    Math.max(width ?? 0, 24),
  );

  const res = input
    .split('\n')
    .map((line) => '│ ' + line + ' '.repeat(maxLength - line.length) + ' │')
    .join('\n');

  return `┌─${'─'.repeat(maxLength)}─┐\n${res}\n└─${'─'.repeat(maxLength)}─┘`;
}
