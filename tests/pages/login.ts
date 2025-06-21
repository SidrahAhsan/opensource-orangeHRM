import { click, fill } from '@utils/action-utils';
import { getLocatorByPlaceholder, getLocatorByRole, getLocatorByText } from '@utils/locator-utils';
import { gotoURL } from '@utils/page-utils';
import { expectElementToBeVisible, expectPageToHaveURL } from '@utils/assert-utils';
import { invalidCredentials, validCredentials } from '@testdata/userInfo';

const userName = () => getLocatorByPlaceholder('Username');
const password = () => getLocatorByPlaceholder('Password');
const loginButton = () => getLocatorByRole('button', { name: 'Login' });
const errorMessageForInvalidCreds = () => getLocatorByText('Invalid credentials');

export async function navigateToTheLoginPage() {
  await gotoURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
}

export async function loginWithValidCreds(credentials = validCredentials) {
  await fill(userName(), credentials.username);
  await fill(password(), credentials.password);
  await click(loginButton());
  await expectPageToHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
}

export async function loginWithInvalidCreds(credentials = invalidCredentials) {
  await fill(userName(), credentials.username);
  await fill(password(), credentials.password);
  await click(loginButton());
  await expectElementToBeVisible(
    errorMessageForInvalidCreds(),
    'Error message should be displayed for invalid credentials',
  );
}
