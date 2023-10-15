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
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid');
    });
  });
});
