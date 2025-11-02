///<reference types="cypress"/>
import userData from '../fixtures/forms.json'
import {getRandomEmail} from '../support/helpers'

import { faker, fakerPT_BR } from '@faker-js/faker'


describe('Automation Exercise', () => {
    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.url().should('eq', 'https://automationexercise.com/')
    });
    it('Registrar usuário', () => {
        
        cy.get('a[href="/login"]').click()

        cy.get('.signup-form h2').contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()

        cy.get('.login-form h2').contains('Enter Account Information').should('be.visible');
        cy.get('input[type=radio]').check('Mrs')
        cy.get('input[id="password"]').type('123456', {log: false})
        cy.get('select[data-qa=days]').select('17')
        cy.get('select[data-qa=months]').select('March')
        cy.get('select[data-qa=years]').select('2000')
        cy.get('input[type="checkbox"]#newsletter').check('1')
        cy.get('input[type="checkbox"]#optin').check('1')

        cy.get('input[data-qa=first_name]').type(fakerPT_BR.person.firstName())
        cy.get('input[data-qa=last_name]').type(fakerPT_BR.person.lastName())
        cy.get('input[data-qa=company]').type(fakerPT_BR.company.name())
        cy.get('input[data-qa=address]').type(fakerPT_BR.location.streetAddress())
        cy.get('select[data-qa=country]').select('Canada')
        cy.get('input[data-qa=state]').type(fakerPT_BR.location.state())
        cy.get('input[data-qa=city]').type(fakerPT_BR.location.city())
        cy.get('[data-qa="zipcode"]').type(fakerPT_BR.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('11987654321')
        
        cy.get('[data-qa="create-account"]').click()
        cy.get('.container h2').contains('Account Created!')

        cy.get('[data-qa="continue-button"]').click()
        cy.get('header a').contains(`Logged in as ${userData.name}`)
        
        cy.get('a[href="/delete_account"]').click()
        cy.get('.container h2').should('contain','Account Deleted!')
        cy.get('[data-qa="continue-button"]').click()
    })
    
    it('Fazer login com email e senha corretos', () => {
        cy.get('a[href="/login"]').click()

        cy.get('.login-form h2').contains('Login to your account')

        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type('123456', {log: false})
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')
    })

    it('Fazer login com email e senha incorretos', () => {
        cy.get('a[href="/login"]').click()
        cy.get('.login-form h2').contains('Login to your account')

        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type('12345', {log: false})
        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form form p').should('contain','Your email or password is incorrect!')
    })

    it('Fazer logout', () => {
        cy.get('a[href="/login"]').click()
        cy.get('.login-form h2').contains('Login to your account').should('be.visible')

        cy.get('[data-qa="login-email"]').type(userData.email)
        cy.get('[data-qa="login-password"]').type('123456', {log: false})
        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible').click()

        cy.url().should('contain','login')
    })

    it('Registrar usuário com e-mail existente', () => {
        cy.get('a[href="/login"]').click()
        cy.get('.signup-form h2').contains('New User Signup!').should('be.visible')

        cy.get('[data-qa="signup-name"]').type(userData.name)
        cy.get('[data-qa="signup-email"]').type(userData.email)
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain','Email Address already exist!')
    })

    it('Preencher formulário de contato', () => {
        cy.get('a[href="/contact_us"]').click()
        cy.get('.contact-form h2').contains('Get In Touch').should('be.visible')

        cy.get('[data-qa="name"]').type(fakerPT_BR.person.firstName())
        cy.get('[data-qa="email"]').type(getRandomEmail())
        cy.get('[data-qa="subject"]').type(fakerPT_BR.word.words(4))
        cy.get('[data-qa="message"]').type(fakerPT_BR.word.words(14))

        cy.fixture('ok.jpg').as('image')
        cy.get('input[name="upload_file"]').selectFile('@image')
        cy.get('[data-qa="submit-button"]').click()
        
        cy.get('#contact-page div.status.alert.alert-success').should('contain', 'Success! Your details have been submitted successfully.')
        cy.get('#form-section .btn.btn-success').should('contain', 'Home').click()
    })
})