

Cypress.Commands.add('login_multi_user', () => {
  cy.visit('https://www.saucedemo.com/')
  var password = "secret_sauce";

  cy.fixture('list_user').each((nameUser)=>{
    cy.get('[data-test="username"]').clear().type(nameUser.name);
    cy.get('[data-test="password"]').clear().type(password);
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="logout-sidebar-link"]').click({force: true });
  })
  
})