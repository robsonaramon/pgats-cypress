///<reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Registrar Usuário', () => {
        const timestamp = new Date().getTime()

        cy.visit('https://automationexercise.com/')
        cy.url().should('eq', 'https://automationexercise.com/')

        cy.get('a[href="/login"]').click()
        cy.get('.signup-form h2').contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type('Teste')
        cy.get('[data-qa="signup-email"]').type('aut2@dario.com')
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form form p').contains('Email Address already exist!').should('be.visible')
    })
})