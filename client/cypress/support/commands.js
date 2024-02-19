// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('register', (registerObject) => {
  cy.contains('Login').click();
  cy.get('.register-link').click();

  cy.get('#register-name').type(registerObject.name);
  cy.get('#register-username').type(registerObject.username);
  cy.get('#register-password').type(registerObject.password);
  cy.get('.register-button').click();

  cy.contains('Discover Hubs');
  cy.contains('Profile');
  cy.contains('Logout');
});

Cypress.Commands.add('login', (loginObject) => {
  cy.contains('Login').click();
  cy.get('#login-username').type(loginObject.username);
  cy.get('#login-password').type(loginObject.password);
  cy.get('.login-button').click();

  cy.contains('Hubs');
  cy.contains('Profile');
  cy.contains('Logout');
  cy.contains('Discover Hubs');
});
