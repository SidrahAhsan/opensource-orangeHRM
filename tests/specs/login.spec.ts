import { test } from '@pagesetup';
import * as LoginPage from '@pages/login';

test.describe.configure({ mode: 'parallel' });
test.describe('Login tests with valid and invalid credentials', () => {
  test.beforeEach('Navigate to the login page', async () => {
    await LoginPage.navigateToTheLoginPage();
  });

  test('login with valid credentials', async () => {
    await LoginPage.loginWithValidCreds();
  });

  test('Login with Invalid credentials', async () => {
    await LoginPage.loginWithInvalidCreds();
  });
});
