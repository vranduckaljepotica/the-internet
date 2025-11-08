const locators = require('../../support/locators');

describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('/login');
    });
    it('should load login page correctly', () => {
        cy.get(locators.login.username).should('be.visible');
        cy.get(locators.login.password).should('be.visible');
        cy.get(locators.login.submit).should('be.visible');
        cy.get(locators.login.title).should('contain', 'Login Page');
    });
    it('should log in with valid credentials', () => { 
        cy.fixture('users.json').its('validUser').then((valid) => {
            cy.get(locators.login.username).type(valid.username);
            cy.get(locators.login.password).type(valid.password);
            cy.get(locators.login.submit).click();
            cy.url().should('include', '/secure');
            cy.get(locators.login.flashSuccess).should('be.visible').and('contain', 'You logged into a secure area!');
        });
    });
    it('should show error with invalid credentials', () => { 
        cy.fixture('users.json').its('invalidUser').then((invalid) => {
            cy.get(locators.login.username).type(invalid.username);
            cy.get(locators.login.password).type(invalid.password);
            cy.get(locators.login.submit).click();
            cy.url().should('include', '/login');
            cy.get(locators.login.flashError).should('be.visible').and('contain', 'Your username is invalid!');
        });
    });
    it('should show error with invalid password', () => { 
        cy.fixture('users.json').its('validUser').then((valid) => {
            cy.fixture('users.json').its('invalidUser').then((invalid) => {
                cy.get(locators.login.username).type(valid.username);
                cy.get(locators.login.password).type(invalid.password);
                cy.get(locators.login.submit).click();
                cy.url().should('include', '/login');
                cy.get(locators.login.flashError).should('be.visible').and('contain', 'Your password is invalid!');
            });
        });
    });
    it('should show error with invalid username', () => { 
        cy.fixture('users.json').its('validUser').then((valid) => {
            cy.fixture('users.json').its('invalidUser').then((invalid) => {
                cy.get(locators.login.username).type(invalid.username);
                cy.get(locators.login.password).type(valid.password);
                cy.get(locators.login.submit).click();
                cy.url().should('include', '/login');
                cy.get(locators.login.flashError).should('be.visible').and('contain', 'Your username is invalid!');
            });
        });
    });
    it('should log out successfully', () => {
        cy.fixture('users.json').its('validUser').then((valid) => {
            cy.get(locators.login.username).type(valid.username);
            cy.get(locators.login.password).type(valid.password);
            cy.get(locators.login.submit).click();
            cy.url().should('include', '/secure');
            cy.get(locators.login.flashSuccess).should('be.visible').and('contain', 'You logged into a secure area!');
            cy.get(locators.login.logout).click();
            cy.url().should('include', '/login');
            cy.get(locators.login.flashSuccess).should('be.visible').and('contain', 'You logged out of the secure area!');
        });
    });   
})