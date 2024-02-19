describe('Code Collector App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });
  it('open login form', () => {
    cy.contains('Login').click();
    cy.get('#login-username').type();
    cy.get('#login-password');
  });
});
