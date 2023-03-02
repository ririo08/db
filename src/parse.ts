import * as Papa from 'papaparse';
import axios from 'axios';
import { CsvUrl } from '../@types/CsvUrl';

const parseCSV = async (csvList: CsvUrl): Promise<Object[]> => {
  let csvData: string = '';

  // URLからデータ取得
  await axios.get(csvList.url).then(async (res) => {
    csvData = res.data;
  });

  let objectArray = [];
  // CSVファイルをオブジェクトに変換
  Papa.parse(csvData, {
    delimiter: ',',
    header: true,
    complete: (res) => {
      objectArray = res.data as any;
    },
  });
  return objectArray as Object[];
};

export { parseCSV };
