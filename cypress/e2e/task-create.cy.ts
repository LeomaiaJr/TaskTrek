describe('asks Creation', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });

  it('should create a task correctly', async () => {
    cy.visit('http://localhost:3000/tasks/create');
    cy.get('h1').contains('Create Task');

    cy.get('input[name=title]').type('Test');
    cy.get('textarea[name=description]').type('Test description');
    cy.get('button').click();

    cy.visit('http://localhost:3000/');
    cy.get('input[name=search]').type('Test');
    cy.get('input[name=search]').type('{enter}');

    cy.get('a').contains('Test');
  });
});
