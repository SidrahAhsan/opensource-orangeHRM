import { getLocator, getLocatorByPlaceholder, getLocatorByRole, getLocatorByText } from '@utils/locator-utils';
import { click, fill } from '@utils/action-utils';
import { expectElementToBeHidden, expectElementToBeVisible, expectPageToHaveURL } from '@utils/assert-utils';
import { expect } from '@pagesetup';
import { waitForElementToBeStable, waitForElementToBeVisible } from '@utils/element-utils';
import { MAX_TIMEOUT } from '@constants/timeouts';
import { newEmployeeInfo } from '@testdata/userInfo';

const pimModule = () => getLocatorByText('PIM', { exact: true }).nth(0);
const addNewEmployeeButton = () => getLocatorByRole('button', { name: ' Add ' });
const employeeFirstName = () => getLocatorByPlaceholder('First Name');
const employeeLastName = () => getLocatorByPlaceholder('Last Name');
const employeeId = () =>
  getLocator('//*[@id="app"]/div[1]/div[2]/div[2]/div/div/form/div[1]/div[2]/div[1]/div[2]/div/div/div[2]/input');
const loginDetailsCheckBox = () => getLocator(`span.oxd-switch-input`);
const userName = () => getLocator(`//input[@autocomplete='off']`).nth(0);
const enableRadioButton = () => getLocator(`span.oxd-radio-input.oxd-radio-input--active`).first();
const password = () => getLocator(`//input[@type='password']`).nth(0);
const confirmPassword = () => getLocator(`//input[@type='password']`).nth(1);
const saveButton = () => getLocatorByRole('button', { name: ' Save ' });
const searchEmployeeIdinputField = () => getLocator(`input.oxd-input.oxd-input--active`).nth(1);
const searchButton = () => getLocatorByRole('button', { name: ' Search ' });
const nationalityDropdown = () => getLocator(`div.oxd-select-text-input`).first();
const dropdownOptionCountry = () => getLocator(`div.oxd-select-option`).filter({ hasText: 'Pakistani' });
const dropdownOptionForMaritalStatus = () => getLocator(`div.oxd-select-option`).filter({ hasText: 'Single' });
const maritalStatusDropdown = () => getLocator(`div.oxd-select-text-input`).nth(1);
const dateOfBirthInput = () => getLocatorByPlaceholder('yyyy-dd-mm').nth(1);
const genderRadioButton = () => getLocator(`div.oxd-radio-wrapper`).nth(1);
const saveButtonAfterDetails = () => getLocatorByRole('button', { name: ' Save ' }).first();
const employeeFullNameField = () => getLocatorByPlaceholder(`First Name`);
const employeeData = () => getLocator(`div.oxd-table-body`);
const resultRowUserId = () => getLocator(`div.oxd-table-cell.oxd-padding-cell`).nth(1);
const resultRowUserName = () => getLocator(`div.oxd-table-cell.oxd-padding-cell`).nth(2);
const resultRowUserLastName = () => getLocator(`div.oxd-table-cell.oxd-padding-cell`).nth(3);
const deleteButtonForEmployee = () => getLocator('button.oxd-icon-button.oxd-table-cell-action-space:has(.bi-trash)');
const deletePopUp = () => getLocator(`div[role="document"]`);
const confirmationMessage = () => getLocator(`p.oxd-text--card-title`);
const cancelButtonOnPopup = () => getLocatorByRole('button', { name: ' No, Cancel ' });
const confirmDeleteButton = () => getLocatorByRole('button', { name: ' Yes, Delete ' });
const noRecordFoundText = () => getLocatorByText(`No Records Found`);

export async function navigateToThePIMModule() {
  await click(pimModule());
  await expectPageToHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
}
export async function navigateToNewEmployeePage() {
  await click(addNewEmployeeButton());
  await expectPageToHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
}
export async function addNewEmployee(data = newEmployeeInfo) {
  await fill(employeeFirstName(), data.firstName);
  await fill(employeeLastName(), data.lastName);
  await fill(employeeId(), data.userId);
  await click(loginDetailsCheckBox());
  await fill(userName(), data.userName);
  await click(enableRadioButton());
  await fill(password(), data.password);
  await fill(confirmPassword(), data.confirmPassword);
  await click(saveButton());
  await waitForElementToBeVisible(nationalityDropdown(), { timeout: MAX_TIMEOUT });
  //select nationality from the drop-down
  await click(nationalityDropdown());
  await click(dropdownOptionCountry());
  //select marital status from the drop-down
  await click(maritalStatusDropdown());
  await click(dropdownOptionForMaritalStatus());
  await fill(dateOfBirthInput(), '1990-01-01');
  await click(genderRadioButton());
  await click(saveButtonAfterDetails());
  await waitForElementToBeStable(employeeFullNameField());
}

export async function SearchAnEmployee() {
  await fill(searchEmployeeIdinputField(), '345');
  await expectElementToBeVisible(employeeData());
  await click(searchButton());
  await expect(resultRowUserId()).toHaveText('345');
  await expect(resultRowUserName()).toHaveText('Sidra');
  await expect(resultRowUserLastName()).toHaveText('ahsan');
}

export async function deletePopUpUI() {
  await click(deleteButtonForEmployee());
  await expectElementToBeVisible(deletePopUp());
  await expectElementToBeVisible(confirmationMessage());
  await expectElementToBeVisible(cancelButtonOnPopup());
  await expectElementToBeVisible(confirmDeleteButton());
}
export async function cancelDeleteEmployee() {
  await click(cancelButtonOnPopup());
  await expectElementToBeHidden(deletePopUp());
  await expect(resultRowUserId()).toHaveText('345');
  await expect(resultRowUserName()).toHaveText('Sidra');
  await expect(resultRowUserLastName()).toHaveText('ahsan');
}

export async function deleteEmployee() {
  //await waitForElementToBeStable(deleteButtonForEmployee());
  await click(confirmDeleteButton());
  //await waitForElementToBeVisible(dataContainer());
  await expectElementToBeVisible(noRecordFoundText(), { timeout: MAX_TIMEOUT });
}
