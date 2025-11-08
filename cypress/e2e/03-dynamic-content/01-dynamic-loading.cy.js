const locators = require('../../support/locators');
/** this is test suite for dynamic loading page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_06 Dynamic Loading tests', () => {
    beforeEach(() => {
        cy.visit('/dynamic_loading');
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/6 should load dynamic loading page correctly', () => {
        cy.get(locators.dynamic_loading.dynamicLoadingTitle).should('be.visible');
        cy.get(locators.dynamic_loading.dynamicLoadingTitle).should('contain', 'Dynamically Loaded');
        cy.get(locators.dynamic_loading.example1Link).should('be.visible');
        cy.get(locators.dynamic_loading.example2Link).should('be.visible');
        cy.log('All elements are visible and exist on the page');
    });

    // second test case in this suite, navigate to example 1 and verify loading process
    it('TC_02/6 should load example 1 and verify loading process', () => {
        cy.get(locators.dynamic_loading.example1Link).click();
        cy.get(locators.dynamic_loading.startButton).should('be.visible').and('contain', 'Start')
        cy.get(locators.dynamic_loading.loadedText).should('exist');
        cy.log('text existst in dom but not visible yet');
        cy.get(locators.dynamic_loading.startButton).click();
        cy.get(locators.dynamic_loading.loadingIndicator).should('be.visible');
        cy.get(locators.dynamic_loading.loadedText, { timeout: 15000 }).should('be.visible').and('contain', 'Hello World!');
        cy.log('Example 1 loaded successfully and verified the loaded text.');
    });

    // third test case in this suite, navigate to example 2 and verify loading process
    it('TC_03/6 should load example 2 and verify loading process', () => {
        cy.get(locators.dynamic_loading.example2Link).click();
        cy.get(locators.dynamic_loading.startButton).should('be.visible').and('contain', 'Start');
        cy.get(locators.dynamic_loading.loadedText).should('not.exist');
        cy.log('text does not exist in dom yet');
        cy.get(locators.dynamic_loading.startButton).click();
        cy.get(locators.dynamic_loading.loadingIndicator).should('be.visible');
        cy.get(locators.dynamic_loading.loadedText, { timeout: 15000 }).should('be.visible');
        cy.get(locators.dynamic_loading.loadedText).should('contain', 'Hello World!');
        cy.log('Example 2 loaded successfully and verified the loaded text.');
    });
});