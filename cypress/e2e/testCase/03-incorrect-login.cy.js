///<reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Fazer login com email e senha incorretos', () => {
        
        cy.visit('https://automationexercise.com/')
        cy.url().should('eq', 'https://automationexercise.com/')

        cy.get('a[href="/login"]').click()
        cy.get('.login-form h2').contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type('aut@dario.con')
        cy.get('[data-qa="login-password"]').type('12345', {log: false})
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form form p').contains('Your email or password is incorrect!').should('be.visible')
    });
})