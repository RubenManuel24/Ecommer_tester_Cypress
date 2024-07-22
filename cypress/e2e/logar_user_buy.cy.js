/// <reference types ="Cypress"/>

describe('Funcionalidade: Logar usuário e comprar produtos', () => {

   beforeEach(() => {
    // Intercepta e bloqueia as requisições para os endpoints indesejados
    cy.intercept('POST', 'https://events.backtrace.io/api/unique-events/submit', {
      statusCode: 401,
      body: {}
    }).as('blockUniqueEvents');

    cy.intercept('POST', 'https://events.backtrace.io/api/summed-events/submit', {
      statusCode: 401,
      body: {}
    }).as('blockSummedEvents');

    // Suprime os logs dessas requisições
    Cypress.on('window:before:load', (win) => {
      win.fetch = null;
    });
  });

  it('Deve logar usuário, navegar para tela principal, adicionar produtos no carrinho, fazer checkout de pedido, registro, finalizar a compra e voltar para tela principal ', () => {

    cy.loginUser()

    cy.fixture('name_item').each((item) => {
      cy.add_cart(item.nameItem)
    })


    cy.get('[data-test="shopping-cart-link"]').click()

    cy.get('[data-test="checkout"]').click()

    cy.get('[data-test="firstName"]').type('Ruben')
    cy.get('[data-test="lastName"]').type('Manuel')
    cy.get('[data-test="postalCode"]').type('123456')

    cy.get('[data-test="continue"]').click()

    cy.get('[data-test="finish"]').click()

    cy.get('[data-test="complete-header"]').should('contain', 'Thank you for your order!')

    cy.get('[data-test="back-to-products"]').click()

  });

   
})