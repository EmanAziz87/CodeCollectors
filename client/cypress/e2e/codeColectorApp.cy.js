describe('Code Collector App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    cy.visit('http://localhost:5173/');
    cy.register({
      name: 'test',
      username: 'testusername',
      password: 'testpassword',
    });
  });

  it('front page can be opened', function () {
    cy.contains('Hubs');
    cy.contains('<Code Collector />');
    cy.contains('Logout');
  });

  it('open login form and login', function () {
    cy.contains('Logout').click();
    cy.login({ username: 'testusername', password: 'testpassword' });
  });

  describe('when logged in', function () {
    it('go to JavaScript hub', function () {
      cy.get('#hub-search-input').type('javascript');
      cy.get('.language-icon').click();
      cy.contains('JavaScript');
      cy.contains('Subscribers');
      cy.contains('Create Post');
      cy.contains('Posts');
    });
  });
});
