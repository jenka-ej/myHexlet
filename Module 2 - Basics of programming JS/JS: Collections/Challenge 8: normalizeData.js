import dateFns from 'date-fns';

const { eachDayOfInterval, format } = dateFns;

const normalizeData = (data, start, end) => {
  const year = (date) => date.split('-')[0];
  const month = (date) => date.split('-')[1];
  const day = (date) => date.split('-')[2];
  const interval = eachDayOfInterval({
    start: new Date(year(start), month(start) - 1, day(start)),
    end: new Date(year(end), month(end) - 1, day(end)),
  });
  const intervalConvert = interval.map((date) => ({ value: 0, date: format(date, 'dd.MM.yyyy') }));
  return intervalConvert.reduce((acc, objectConvert) => {
    const temp = objectConvert;
    data.map((objectData) => {
      if (objectData.date === objectConvert.date) {
        temp.value = objectData.value;
      }
      return null;
    });
    acc.push(temp);
    return acc;
  }, []);
};
export default normalizeData;

/* __tests__ */

import normalizeData from '../normalizeData.js';

describe('should normalize', () => {
  it('#1 inclusion', () => {
    const data = [
      { value: 14, date: '02.08.2018' },
      { value: 43, date: '03.08.2018' },
      { value: 38, date: '05.08.2018' },
    ];
    const beginDate = '2018-08-01';
    const endDate = '2018-08-10';

    const actual = normalizeData(data, beginDate, endDate);
    const expected = [
      { value: 0, date: '01.08.2018' },
      { value: 14, date: '02.08.2018' },
      { value: 43, date: '03.08.2018' },
      { value: 0, date: '04.08.2018' },
      { value: 38, date: '05.08.2018' },
      { value: 0, date: '06.08.2018' },
      { value: 0, date: '07.08.2018' },
      { value: 0, date: '08.08.2018' },
      { value: 0, date: '09.08.2018' },
      { value: 0, date: '10.08.2018' },
    ];
    expect(actual).toEqual(expected);
  });

  it('#2 intersection', () => {
    const data = [
      { value: 14, date: '31.07.2018' },
      { value: 14, date: '01.08.2018' },
      { value: 14, date: '02.08.2018' },
      { value: 43, date: '03.08.2018' },
      { value: 38, date: '05.08.2018' },
    ];
    const beginDate = '2018-08-02';
    const endDate = '2018-08-07';

    const actual = normalizeData(data, beginDate, endDate);
    const expected = [
      { value: 14, date: '02.08.2018' },
      { value: 43, date: '03.08.2018' },
      { value: 0, date: '04.08.2018' },
      { value: 38, date: '05.08.2018' },
      { value: 0, date: '06.08.2018' },
      { value: 0, date: '07.08.2018' },
    ];
    expect(actual).toEqual(expected);
  });
});
