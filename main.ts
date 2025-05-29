import * as parse from './src/parse';
import csvList from './csv.json';
import { CsvUrl } from './@types/CsvUrl';
import * as fs from 'fs-extra';

console.log('Hello world');
fs.mkdirsSync('./dist/');

async function main() {
  await startParse();
  copyDocuments();
}

async function startParse() {
  const csvDataList: CsvUrl[] = csvList;
  for (let csvData of csvDataList) {
    await parse.parseCSV(csvData).then((res) => {
      fs.writeFileSync(`dist/${csvData.name}.json`, JSON.stringify(res));
      console.log(`done: ${csvData.name}.json`);
    });
  }
}

function copyDocuments() {
  fs.copySync('docs/', 'dist/');
  console.log('done: documents');
}
main();
