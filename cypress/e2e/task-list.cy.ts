describe('Tasks List', () => {
  Cypress.on('uncaught:exception', () => {
    return false;
  });

  it('should filter and update tasks list correctly', async () => {
    cy.visit('http://localhost:3000/');
    cy.get('h1').contains('Tasks');
    cy.get('input[name=search]').type('Test');
    cy.get('input[name=search]').type('{enter}');

    cy.get('a').contains('Test');

    const isCompleted = cy
      .get('input[type=checkbox]')
      .first()
      .invoke('attr', 'checked');

    cy.get('input[type=checkbox]').first().click();

    cy.get('input[name=search]').clear();
    cy.get('input[name=search]').type('{enter}');

    cy.get('input[name=search]').type('Test');
    cy.get('input[name=search]').type('{enter}');

    if (isCompleted) {
      cy.get('input[type=checkbox]').first().should('not.be.checked');
    } else {
      cy.get('input[type=checkbox]').first().should('be.checked');
    }
    cy.get('input[type=checkbox]').first().click();
  });
});
