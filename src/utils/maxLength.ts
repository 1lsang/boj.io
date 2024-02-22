export default function maxLength(...strings: string[]): number {
  let length = 0;

  strings.forEach((str) =>
    str.split('\n').forEach((line: string) => {
      if (line.length > length) length = line.length;
    }),
  );

  return length;
}
