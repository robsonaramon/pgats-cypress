///<reference types="cypress"/>

describe('Automation Exercise', () => {
    it('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime()

        cy.visit('https://automationexercise.com/')
        
        cy.get('a[href="/login"]').click()
        
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@tester.com.br`)
        cy.contains('button', 'Signup').click()

        cy.get('input[type=radio]').check('Mrs')
        cy.get('input[id="password"]').type('123456', {log: false})

        cy.get('select[data-qa=days]').select('17')
        cy.get('select[data-qa=months]').select('March')
        cy.get('select[data-qa=years]').select('2000')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()
        
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
        cy.url().should('includes','account_created')
        cy.contains('b', 'Account Created!')
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!')
    });
});