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
      cy.goToHub();
    });

    it('subscribe to hub then unsubscribe', function () {
      cy.goToHub();
      cy.contains('486');
      cy.get('.subscribe-hub-button').click();
      cy.contains('487');
      cy.get('.subscribe-hub-button').click();
      cy.contains('486');
    });

    it('create a post', function () {
      cy.goToHub();
      cy.createPost();
    });

    describe('when post is created', function () {
      beforeEach(function () {
        cy.goToHub();
        cy.createPost();
      });

      it('enter post make a comment, edit comment', function () {
        cy.get('.post-content-container').click();
        cy.get('#comment-content').type('revolutionary code in this post');
        cy.get('.add-comment-button').click();
        cy.contains('revolutionary code in this post');

        cy.get('.edit-comment-button').click();
        cy.get('.edit-comment-content').clear().type('this is updated');
        cy.get('.update-comment-submit-button').click();
        cy.contains('this is updated');
      });

      it('enter post and edit post', function () {
        cy.get('.post-content-container').click();
        cy.get('.edit-post-form-button').click();

        cy.get('#post-form-title').clear().type('updated title');
        cy.get('#post-form-snippet-title')
          .clear()
          .type('updated snippet title');
        cy.get('select').select('JavaScript');
        cy.get('.code-editor')
          .clear()
          .type('console.log("hello from cypress [updated]")');
        cy.get('#post-form-description').clear().type('updated description');
        cy.get('.submit-edit-button').click();

        cy.contains('updated title');
        cy.contains('console.log("hello from cypress [updated]")');
      });

      it('make a post and visit post from profile', function () {
        cy.contains('Profile').click();
        cy.contains('Show Posts').click();

        cy.contains('An Incredible Post').click();

        cy.contains('An Incredible Post');
        cy.contains('console.log("hello from cypress")');
        cy.contains('the above code is incredible');
      });
    });

    it('creating a snippet in profile, editing it, then deleting it', function () {
      cy.contains('Profile').click();
      cy.contains('Add Snippet').click();

      cy.get('#snippet-title-form').type('a fantastic snippet');
      cy.get('select').select('JavaScript');

      cy.get('.code-editor').type('console.log("hello snippet")');
      cy.contains('Save').click();

      cy.contains('Show Code Snippets').click();
      cy.contains('a fantastic snippet');
      cy.contains('console.log("hello snippet")');

      cy.contains('Edit').click();

      cy.get('#snippet-title-form').clear().type('updated snippet title');
      cy.get('select').select('JavaScript');
      cy.get('.code-editor')
        .clear()
        .type('console.log("hello snippet [updated]")');

      cy.contains('Confirm').click();

      cy.contains('Show Code Snippets').click();
      cy.contains('updated snippet title');
      cy.contains('console.log("hello snippet [updated]")');

      cy.contains('Delete').click();
      cy.contains('updated snippet title').should('not.exist');
      cy.contains('console.log("hello snippet [updated]")').should('not.exist');
    });
  });
});
