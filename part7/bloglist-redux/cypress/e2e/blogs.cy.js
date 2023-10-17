describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const john = {
      name: 'John Doe',
      username: 'john',
      password: 'johndoe',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, john);
    const jane = {
      name: 'Jane Doe',
      username: 'jane',
      password: 'janedoe',
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, jane);
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
      cy.login({ username: 'john', password: 'johndoe' });
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
      cy.login({ username: 'john', password: 'johndoe' });
      const firstBlog = {
        title: 'First blog from cypress',
        author: 'imbekrishna',
        url: 'http://imbekrishna.github.io',
        likes: 0,
      };
      const thirdBlog = {
        title: 'Third blog from cypress',
        author: 'imbekrishna',
        url: 'http://imbekrishna.github.io',
        likes: 15,
      };

      cy.createBlog(firstBlog);
      cy.createBlog(thirdBlog);
    });

    it('A blog can be created', function () {
      cy.contains('create new blog').click();
      cy.get('#blogTitle').type('Second blog from cypress');
      cy.get('#blogAuthor').type('imbekrishna');
      cy.get('#blogUrl').type('http://imbekrishna.github.io');

      cy.get('#createBlog').click();

      cy.contains('Second blog from cypress');
    });

    it('user can like the blog', function () {
      cy.contains('First blog from cypress').as('targetBlog');

      cy.get('@targetBlog').contains('view').click();

      cy.get('@targetBlog').contains('likes 0');
      cy.get('@targetBlog').contains('like').click();
      cy.get('@targetBlog').contains('likes 1');
    });

    it('author can remove blog', function () {
      cy.contains('Third blog from cypress').as('targetBlog');

      cy.get('@targetBlog').contains('view').click();
      cy.get('@targetBlog').contains('remove').click();
      cy.get('@targetBlog').should('not.exist');
    });

    it('author can see remove button', function () {
      cy.contains('logout').click();
      cy.login({ username: 'jane', password: 'janedoe' });
      cy.contains('First blog from cypress').as('targetBlog');

      cy.get('@targetBlog').contains('view').click();
      cy.get('@targetBlog').contains('remove').should('not.exist');
    });

    it('blogs are ordered by likes', function () {
      cy.get('.blog').eq(0).should('contain', 'Third blog from cypress');
      cy.get('.blog').eq(1).should('contain', 'First blog from cypress');

      const mostLikedBlog = {
        title: 'Most Liked blog from cypress',
        author: 'imbekrishna',
        url: 'http://imbekrishna.github.io',
        likes: 150,
      };

      cy.createBlog(mostLikedBlog);

      cy.get('.blog').eq(0).should('contain', 'Most Liked blog from cypress');
    });
  });
});
