/* eslint-disable no-console */
import { readFile, writeFile } from 'fs';
import replaceWithDelimeter from '../src/lib/replaceWithDelimeter';
import copyrightYear from '../src/lib/copyrightYear';

const footerFile = './src/pages/main/Footer.tsx';
const startYear = 2021;
readFile(footerFile, 'utf8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }

  const years = copyrightYear({
    now: new Date(),
    startYear,
  });

  const result = replaceWithDelimeter(
    data,
    {
      prefix: '<span className="copyright-year">',
      suffix: '</span>',
      replacement: years,
    },
  );

  if (result === data) {
    console.log('No change for copyright year.');
  } else {
    console.log(`Copyright year updated to ${years}.`);
  }

  writeFile(footerFile, result, 'utf8', (writeErr) => {
    if (writeErr) {
      console.log(writeErr);
    }
  });
});
