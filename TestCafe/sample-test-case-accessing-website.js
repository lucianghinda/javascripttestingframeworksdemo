import { Selector } from 'testcafe';
var http = require('http');

fixture('Getting Started').page('http://localhost);

test('Access test page', async t => {
  const loginMenu = Selector('a[href="/users/sign_in"]');

  //more explicit alternative for the login selector could be using withAttribute
  // const loginMenu = Selector('a').withAttribute('href','/users/sign_in');

  const titlePage = Selector('h2.title');
  await t
  .click(loginMenu)
  .expect(titlePage.textContent).eql("Login");
})