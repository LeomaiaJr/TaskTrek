describe('Tasks Update', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });

  it('should update tasks list correctly', async () => {
    cy.visit('http://localhost:3000/tasks');

    cy.get('a')
      .not('nav a')
      .first()
      .then(($a) => {
        const href = $a.prop('href');
        cy.visit(href);

        cy.get('h1').contains('Task:');

        cy.get('input[name=title]').clear().type('Test Updated');
        cy.get('textarea[name=description]')
          .clear()
          .type('Test description Updated');
        cy.get('button').contains('Update').click();

        cy.get('h1').contains('Tasks');
      });
  });
});
