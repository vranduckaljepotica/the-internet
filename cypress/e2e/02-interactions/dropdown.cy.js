const locators = require('../../support/locators'); //access locators file

/* This is test suite for dropdown page on the-internet heroku app 
   owner: Amna Sinanovic-Dukmenic
   framework: Cypress
   date: November 2025
*/

describe('TS_03 Dropdown test', () => {
    beforeEach(() => { //before each function executes before each test (it block)
        cy.visit('dropdown'); //in this case it will redirct us to dropdown page
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/3 should load dropdown page correctly', () => {
        cy.get(locators.dropdown.dropdownTitle).should('be.visible').and('contain', 'Dropdown List');
        cy.get(locators.dropdown.dropdownMenu).should('be.visible');
        cy.get(locators.dropdown.option1).should('exist');
        cy.get(locators.dropdown.option2).should('exist');
        cy.log("All elements are visible and exist on the page.");
    });

    // second test case in this suite, select option 1 from dropdown
    it('TC_02/3 select option 1 from dropdown', () => {
        cy.get(locators.dropdown.dropdownMenu).select('Option 1');
        cy.get(locators.dropdown.option1).should('be.selected');
        cy.get(locators.dropdown.dropdownMenu).should('have.value', '1');
        cy.log("Option 1 is selected successfully.");
    });

    // third test case in this suite, select option 2 from dropdown
    it('TC_03/3 select option 2 from dropdown', () => {
        cy.get(locators.dropdown.dropdownMenu).select('Option 2');
        cy.get(locators.dropdown.option2).should('be.selected');
        cy.get(locators.dropdown.dropdownMenu).should('have.value', '2');
        cy.log("Option 2 is selected successfully.");
    });
});
