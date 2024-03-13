import { upperCamelCase, titleize } from './textManipulation.js';

export function numberField(fieldName) {
  return `      <NumberField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}

export function textField(fieldName) {
  return `      <TextField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}

export function switchField(fieldName) {
  return `      <SwitchField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}

export function numberRangeField(fieldName, magnitude) {
  return `      <NumberRangeSlider
        label="${titleize(fieldName)}"
        id="numberRange${upperCamelCase(fieldName)}"
        from={data.${fieldName}.from}
        to={data.${fieldName}.to}
        magnitude={${magnitude}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}

export function selectField(fieldName) {
  return `      <SelectField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(value: unknown) => {
          onChange({
            ...data,
            ${fieldName}: value as ${upperCamelCase(fieldName)},
          });
        }}
      >
        {stringMapToOptions(${fieldName}Options)}
      </SelectField>`;
}
