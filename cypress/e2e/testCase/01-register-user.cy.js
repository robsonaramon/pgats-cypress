///<reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Registrar Usuário', () => {
        const timestamp = new Date().getTime()
        const name = 'QA Tester'

        cy.visit('https://automationexercise.com/')

        cy.get('a[href="/login"]').click()
        cy.get('.signup-form h2').contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type(name)
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@tester.com.br`)
        cy.contains('button', 'Signup').click()

        cy.get('.login-form h2').contains('Enter Account Information').should('be.visible');
        cy.get('input[type=radio]').check('Mrs')
        cy.get('input[id="password"]').type('123456', {log: false})
        cy.get('select[data-qa=days]').select('17')
        cy.get('select[data-qa=months]').select('March')
        cy.get('select[data-qa=years]').select('2000')
        cy.get('input[type="checkbox"]#newsletter').check('1')
        cy.get('input[type="checkbox"]#optin').check('1')

        cy.get('input[data-qa=first_name]').type('Teste')
        cy.get('input[data-qa=last_name]').type('Cypress')
        cy.get('input[data-qa=company]').type('QA')
        cy.get('input[data-qa=address]').type('Rua 1')
        cy.get('select[data-qa=country]').select('Canada')
        cy.get('input[data-qa=state]').type('Ontário')
        cy.get('input[data-qa=city]').type('Ottawa')
        cy.get('[data-qa="zipcode"]').type('0123456')
        cy.get('[data-qa="mobile_number"]').type('11987654321')
        
        cy.get('[data-qa="create-account"]').click()
                cy.get('.container h2').contains('Account Created!').should('be.visible')

        cy.get('[data-qa="continue-button"]').click()
        cy.get('header a').contains(`Logged in as ${name}`).should('be.visible')
        
        cy.get('a[href="/delete_account"]').click()
        cy.get('.container h2').contains('Account Deleted!').should('be.visible')
        cy.get('[data-qa="continue-button"]').click()
    })
})