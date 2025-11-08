const locators = require('../../support/locators'); //access locators file
/**  This is test suite for login page on the-internet heroku app
 *  owner: Amna Sinanovic-Dukmenic
 *  framework: Cypress
 *  date: November 2025
 */
describe('TS_01 Login Test', () => {
    beforeEach(() => { //before each function executes before each test (it block)
        cy.visit('/login'); //in this case it will redirct us to login page
    });
    // first test case in this suite, verification that page loads correct elements
    it('TC_01/1 should load login page correctly', () => {
        cy.get(locators.login.username).should('be.visible');
        cy.get(locators.login.password).should('be.visible');
        cy.get(locators.login.submit).should('be.visible');
        cy.get(locators.login.title).should('contain', 'Login Page');
    });
    // second test case in this suite, login with valid credentials
    it('TC_02/1 should log in with valid credentials', () => { 
        cy.fixture('users.json').its('validUser').then((valid) => {
            cy.get(locators.login.username).type(valid.username);
            cy.get(locators.login.password).type(valid.password);
            cy.get(locators.login.submit).click();
            cy.url().should('include', '/secure');
            cy.get(locators.login.flashSuccess).should('be.visible').and('contain', 'You logged into a secure area!');
        });
    });
    // third test case in this suite, login with invalid credentials
    it('TC_03/1 should show error with invalid credentials', () => { 
        cy.fixture('users.json').its('invalidUser').then((invalid) => {
            cy.get(locators.login.username).type(invalid.username);
            cy.get(locators.login.password).type(invalid.password);
            cy.get(locators.login.submit).click();
            cy.url().should('include', '/login');
            cy.get(locators.login.flashError).should('be.visible').and('contain', 'Your username is invalid!');
        });
    });
    // fourth test case in this suite, login with valid username and invalid password
    it('TC_04/1 should show error with invalid password', () => { 
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
    // fifth test case in this suite, login with invalid username and valid password
    it('TC_05/1 should show error with invalid username', () => { 
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
    // sixth test case in this suite, logout after successful login
    it('TC_06/1 should log out successfully', () => {
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