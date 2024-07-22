/// <reference types ="Cypress"/>

describe('Funcionalidade: Logar vários usuários', () => {
  
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

 
  it('Deve logar usuário e navegar para tela principal', () => {
    cy.login_multi_user();
  });
  
})