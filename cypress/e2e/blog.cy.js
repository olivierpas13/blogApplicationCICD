describe('Blog app', () => {
  before(() => {
    cy.visit('http://localhost:3003/');
  });
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Oliv',
      username: 'testuser',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
  });
  it('Login form is shown', () => {
    cy.contains('Login');
    cy.get('[name = "Username"]');
    cy.get('[name = "Password"]');
  });
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('[name = "Username"]').type('testuser');
      cy.get('[name = "Password"]').type('12345');
      cy.contains('Login').click();
      cy.contains('Create blog');
    });
    it('fails with wrong credentials', () => {
      cy.get('[name = "Username"]').type('Wrongtestuser');
      cy.get('[name = "Password"]').type('WrongPassword');
      cy.contains('Login').click();
      cy.contains('Invalid credentials');
    });
  });
  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'testuser', password: '12345' });
    });

    it('A blog can be created', () => {
      cy.contains('Create blog').click();
      cy.get('[name = "Author"]').type('TestAuthor');
      cy.get('[name = "Title"]').type('TestTitle');
      cy.get('[name = "Url"]').type('TestUrl');
      cy.contains('create').click();
      cy.contains('TestAuthor');
      cy.contains('TestTitle');
    });
  });
  describe.only('When a blog exists', () => {
    beforeEach(() => {
      cy.login({ username: 'testuser', password: '12345' });
      cy.createBlog({ author: 'TestAuthor', title: 'TestTitle', url: 'TestUrl' });
    });
    afterEach(() => {
      cy.contains('Logout').click();
    });
    it('users can like a blog', () => {
      cy.contains('TestTitle').click();
      cy.contains('Like').click();
      cy.contains('1');
    });
    it('user who created a blog can delete it', () => {
      cy.contains('TestTitle').click();
      cy.contains('Delete').click();
      cy.get('TestAuthor').should('not.exist');
    });
    it('other users cannot delete the blog', () => {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Pam',
        username: 'TestUser2',
        password: '12345',
      });
      cy.login({ username: 'TestUser2', password: '12345' });
      cy.contains('TestTitle').click();
      cy.contains('Delete').should('not.exist');
    });
  });
});
