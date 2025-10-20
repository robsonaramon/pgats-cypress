///<reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Fazer login com email e senha corretos', () => {
        
        cy.visit('https://automationexercise.com/')
        cy.url().should('eq', 'https://automationexercise.com/')

        cy.get('a[href="/login"]').click()
        cy.get('.login-form h2').contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type('aut@dario.com')
        cy.get('[data-qa="login-password"]').type('123456', {log: false})
        cy.get('[data-qa="login-button"]').click()

        cy.get('header a').contains(`Logged in as Teste`).should('be.visible')
        cy.get('a[href="/logout"]').click()

        cy.url().should('include','login')
    });
})