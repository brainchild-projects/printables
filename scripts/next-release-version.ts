/* eslint-disable no-console */
import { stdin, stdout } from 'process';
import { createInterface } from 'readline';

const r1 = createInterface({
  input: stdin,
  output: stdout,
  terminal: false,
});

const reg = /^. bumping version .+ to (.+)$/;
let found = false;
r1.on('line', (line: string) => {
  if (found) return;
  const match = reg.exec(line);
  if (match) {
    console.log(match[1]);
    found = true;
  }
});
