Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body));
    cy.visit('http://localhost:3003');
  });
});

Cypress.Commands.add('createBlog', ({ author, title, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { author, title, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`,
    },
  });
  cy.visit('http://localhost:3003');
});
