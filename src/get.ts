import { load } from 'cheerio';
import { client } from './client';
import type { ProblemNumber } from './types';

export async function getProblemInfo(pn: ProblemNumber) {
  const response = await client.get(`/${pn}`);

  if (response.status !== 200)
    throw new Error('문제를 불러올 수 없습니다. 문제 번호를 확인해주세요.');

  const $ = load(response.data);
  const n = $('.sampledata').length;

  const inputs = [];
  const outputs = [];

  for (let i = 1; i <= n / 2; i++) {
    inputs.push($(`#sample-input-${i}`).text().toString().trim());
    outputs.push($(`#sample-output-${i}`).text().toString().trim());
  }

  return { inputs, outputs };
}
