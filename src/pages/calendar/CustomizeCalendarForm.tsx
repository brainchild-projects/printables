import React, { ChangeEvent } from 'react';
import CalendarData from './CalendarData';
import CustomizeForm from '../../components/forms/CustomizeForm';
import SelectField from '../../components/forms/SelectField';

export interface CustomizeCalendarFormProps {
  data: CalendarData,
  now: Date,
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
  const {
    now, data, onChange,
  } = props;
  const currentYear = now.getFullYear();

  const changeHandler = (field: string) => (event: ChangeEvent<{ value: unknown, }>) => {
    const updated = {
      ...data,
      [field]: Number.parseInt(event.target.value as string, 10),
    };
    onChange(updated);
  };

  return (
    <CustomizeForm
      name="Calendar"
    >
      <SelectField
        label="Year"
        id="select-year"
        name="year"
        value={data.year}
        onChange={changeHandler('year')}
      >
        {yearOptions(currentYear)}
      </SelectField>

      <SelectField
        label="Month"
        id="select-month"
        name="month"
        value={data.month}
        onChange={changeHandler('month')}
      >
        {
          months.map((month, index) => (
            <option value={index} key={month}>{month}</option>
          ))
        }
      </SelectField>

    </CustomizeForm>

  );
}

export default CustomizeCalendarForm;
