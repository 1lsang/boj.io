import axios from 'axios';

export const client = axios.create({
  headers: {
    'user-agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  },
  baseURL: 'https://www.acmicpc.net/problem/',
  timeout: 2000,
});
