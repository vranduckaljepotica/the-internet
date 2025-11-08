const locators = require('../../support/locators'); //access locators file
/* This is test suite for checkboxes page on the-internet heroku app */
describe('TS_02 Checkboxes test', () => {
    beforeEach(() => { //before each function executes before each test (it block)
        cy.visit('checkboxes'); //in this case it will redirct us to checkboxes page
        
        // defining aliases for checkboxe elements
        cy.get(locators.checkboxes.group).as('checkboxes');
        cy.get('@checkboxes').eq(0).as('checkbox1');
        cy.get('@checkboxes').eq(1).as('checkbox2');
    });
    // first test case in this suite, verification that page loads correct elements
    it('TC_01/2 should load checkboxes page correctly', () => {
        cy.get(locators.checkboxes.checkboxTitile).should('be.visible').and('contain', 'Checkboxes');
        cy.get('@checkbox1').should('be.visible');
        cy.get('@checkbox2').should('be.visible');
        cy.get('@checkbox1').should('not.be.checked');
        cy.get('@checkbox2').should('be.checked');
        cy.log("All elements are visible and have correct default settings.");
    });
    // second test case in this suite, check checkbox 1
    it('TC_02/2 check checkbox 1', () => {
        cy.get('@checkbox1').check();
        cy.get('@checkbox1').should('be.checked');
        cy.get('@checkbox2').should('be.checked');
        console.log("Both checkboxes are checked.");
    });
    // third test case in this suite, uncheck checkbox 2
    it('TC_03/2 uncheck checkbox 2', () => {
        cy.get('@checkbox2').uncheck();
        cy.get('@checkbox1').should('not.be.checked');
        cy.get('@checkbox2').should('not.be.checked');
        cy.log("Both checkboxes are unchecked.");
    });
    // fourth test case in this suite, toggle both checkboxes
    it('TC_04/2 toggle checkboxes', () => {
        cy.get('@checkbox1').check();
        cy.get('@checkbox2').uncheck();
        cy.get('@checkbox1').should('be.checked');
        cy.get('@checkbox2').should('not.be.checked');
        cy.get('@checkbox1').uncheck();
        cy.get('@checkbox2').check();
        cy.get('@checkbox1').should('not.be.checked');
        cy.get('@checkbox2').should('be.checked');
        cy.log("Checkboxes toggled successfully.");
    });
})