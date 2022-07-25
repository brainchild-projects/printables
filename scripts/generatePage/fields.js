const { upperCamelCase, titleize } = require('./textManipulation');

function numberField(fieldName) {
  return `      <NumberField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}
exports.numberField = numberField;

function textField(fieldName) {
  return `      <TextField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}
exports.textField = textField;

function switchField(fieldName) {
  return `      <SwitchField
        name="${fieldName}"
        label="${titleize(fieldName)}"
        value={data.${fieldName}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}
exports.switchField = switchField;

function numberRangeField(fieldName, magnitude) {
  return `      <NumberRangeSlider
        label="${titleize(fieldName)}"
        id="numberRange${upperCamelCase(fieldName)}"
        from={data.${fieldName}.from}
        to={data.${fieldName}.to}
        magnitude={${magnitude}}
        onChange={(${fieldName}) => onChange({ ...data, ${fieldName} })}
      />`;
}
exports.numberRangeField = numberRangeField;

function selectField(fieldName) {
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
exports.selectField = selectField;
