import { test } from '@pagesetup';
import * as Employee from '../pages/employee';
import * as Login from '../pages/login';

test.beforeEach(async () => {
  await Login.navigateToTheLoginPage();
  await Login.loginWithValidCreds();
  await Employee.navigateToThePIMModule();
});
test('Add new employee', async () => {
  await Employee.navigateToNewEmployeePage();
  await Employee.addNewEmployee();
});

test('Delete an Employee', async () => {
  await Employee.SearchAnEmployee();
  await Employee.deletePopUpUI();
  await Employee.deleteEmployee();
});
