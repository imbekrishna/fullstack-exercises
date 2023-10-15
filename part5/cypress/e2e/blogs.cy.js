describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'johndoe',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('log in to application');
  });

  describe('Login', () => {
    beforeEach(function () {
      cy.visit('');
    });

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('john');
      cy.get('#password').type('johndoe');

      cy.get('#login-button').click();
      cy.contains('John Doe logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('john');
      cy.get('#password').type('janedoe');

      cy.get('#login-button').click();
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('john');
      cy.get('#password').type('johndoe');

      cy.get('#login-button').click();
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#blogTitle').type('A blog from cypress');
      cy.get('#blogAuthor').type('imbekrishna');
      cy.get('#blogUrl').type('http://imbekrishna.github.io');

      cy.get('#createBlog').click();

      cy.contains('A blog from cypress');
    });

    it('user can like the blog', function(){
      cy.contains('create new blog').click();
      cy.get('#blogTitle').type('A blog from cypress');
      cy.get('#blogAuthor').type('imbekrishna');
      cy.get('#blogUrl').type('http://imbekrishna.github.io');

      cy.get('#createBlog').click();

      cy.contains('view').click();
    });
  });
});
