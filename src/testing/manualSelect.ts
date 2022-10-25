// import userEvent from '@testing-library/user-event';

function optionLabelValue(option: HTMLOptionElement): string {
  return option.innerHTML.toString().trim();
}

/**
 * This is a manual implementation of selecting an option
 * TODO: Change this to use userEvent.selectOptions when fixed on html-dom
 *
 * @param {HTMLSelectElement} selectField
 * @param {string} value
 */
async function manualSelect(selectField: HTMLSelectElement, value: string) {
  // await userEvent.selectOptions(selectField, value);
  const matchingOption = [...selectField.querySelectorAll('option')]
    .find((option) => optionLabelValue(option) === value);
  if (matchingOption !== undefined) {
    // eslint-disable-next-line no-param-reassign
    selectField.value = matchingOption.value;
    const event = new Event('change', {
      bubbles: true,
    });
    selectField.dispatchEvent(event);
  } else {
    throw Error(`No matching select option for ${value}`);
  }
  return Promise.resolve();
}

export default manualSelect;
