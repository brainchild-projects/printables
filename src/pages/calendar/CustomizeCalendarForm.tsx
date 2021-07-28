import React, { ChangeEvent, useState } from 'react';
import {
  Select,
} from '@material-ui/core';
import CalendarData from './CalendarData';
import FieldSet from '../../components/forms/FieldSet';
import CustomizeForm from '../../components/forms/CustomizeForm';

export interface CustomizeCalendarFormProps {
  now: Date,
  onBeforePrint: (data: CalendarData) => boolean,
  onChange: (data: CalendarData) => void,
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function yearOptions(year: number): JSX.Element[] {
  const start = year - 20;
  const end = year + 20;
  const options = [];
  for (let index = start; index <= end; index += 1) {
    options.push(<option key={index}>{index}</option>);
  }
  return options;
}

function CustomizeCalendarForm(props: CustomizeCalendarFormProps): JSX.Element {
  const { now, onBeforePrint: onPrint, onChange } = props;
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const [data, setData] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const changeHandler = (field: string) => (event: ChangeEvent<{ value: unknown, }>) => {
    const updated = {
      ...data,
      [field]: Number.parseInt(event.target.value as string, 10),
    };
    setData(updated);
    onChange(updated);
  };

  return (
    <CustomizeForm
      onBeforePrint={() => onPrint(data)}
      name="Calendar"
    >

      <FieldSet
        label="Year"
        id="select-year"
      >
        <Select
          native
          name="year"
          id="select-year"
          value={data.year}
          fullWidth
          onChange={changeHandler('year')}
        >
          { yearOptions(currentYear) }
        </Select>
      </FieldSet>
      <FieldSet
        label="Month"
        id="select-month"
      >
        <Select
          native
          name="month"
          id="select-month"
          value={data.month}
          fullWidth
          onChange={changeHandler('month')}
        >
          {
            months.map((month, index) => (
              <option value={index} key={month}>{month}</option>
            ))
          }
        </Select>
      </FieldSet>

    </CustomizeForm>

  );
}

export default CustomizeCalendarForm;
