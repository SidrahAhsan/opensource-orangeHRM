import { test } from '@pagesetup';
import * as Employee from '../pages/employee';
import * as Login from '../pages/login';

test('Add new employee', async () => {
  await Login.navigateToTheLoginPage();
  await Login.loginWithValidCreds();
  await Employee.navigateToThePIMModule();
  await Employee.navigateToNewEmployeePage();
  await Employee.addNewEmployee();
});

test('View employee list', async () => {
  await Login.navigateToTheLoginPage();
  await Login.loginWithValidCreds();
  await Employee.navigateToThePIMModule();
  await Employee.viewEmployeeList();
});
