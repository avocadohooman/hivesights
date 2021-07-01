describe('Hivesights is online', function() {
    it('front-page can be opened', function() {
        cy.visit('http://localhost:3002');
        cy.contains('Hivesights');
    })
})

describe('User can login', function() {
    it('User can click Sign-In', function() {
        const userName = Cypress.env('INTRA_USERNAME');
        const password = Cypress.env('INTRA_PASSWORD');
        cy.get('#signIn').click();
        cy.get('#user_login').type(`${userName}`);
        cy.get('#user_password').type(`${password}`);
        cy.get('.btn-login').click();
    })
})