
 

 Cypress.Commands.add('add_cart', (name_item) => {
  cy.get('[data-test="inventory-item-name"]').contains(name_item).click();
  cy.get('[data-test="add-to-cart"]').click();
  cy.get('[data-test="back-to-products"]').click();

  })
