const locators = require('../../support/locators'); //access locators file
/** this is test suite for dynamic controls page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_08 Dynamic Controls tests', () => {
    beforeEach(() => {
        cy.visit('/dynamic_controls');
    });

    // first test case in this suite, verification that pafe loads correct elements
    it('TC_01/8 should load dynamic controls page correctly', () => {
        cy.get(locators.dynamic_controls.dynamicControlsTitle).should('be.visible');
        cy.get(locators.dynamic_controls.dynamicControlsTitle).should('contain', 'Dynamic Controls');
        cy.get(locators.dynamic_controls.chexbox).should('be.visible');
        cy.get(locators.dynamic_controls.removeAddButton).should('be.visible');
        cy.get(locators.dynamic_controls.inputField).should('be.visible');
        cy.get(locators.dynamic_controls.enableDisableButton).should('be.visible');
        cy.log('All elements are visible and exist on the page');
    });

    // second test case in this suite, verify checkbox removal and addition
    it('TC_02/8 should remove and add checkbox correctly', () => {
        cy.get(locators.dynamic_controls.removeAddButton).click();
        cy.get(locators.dynamic_controls.loadingIndicatorCheckbox, { timeout: 5000}).should('be.visible');
        cy.get(locators.dynamic_controls.checkboxMessage, { timeout: 15000 }).should('be.visible');
        cy.get(locators.dynamic_controls.checkboxMessage).should('contain', "It's gone!");
        cy.get(locators.dynamic_controls.chexbox).should('not.exist');
        cy.log('Checkbox removed successfully');
        cy.get(locators.dynamic_controls.removeAddButton).click();
        cy.get(locators.dynamic_controls.loadingIndicatorCheckbox, { timeout: 5000 }).should('be.visible');
        cy.get(locators.dynamic_controls.checkboxMessage, { timeout: 15000 }).should('be.visible');
        cy.get(locators.dynamic_controls.checkboxMessage).should('contain', "It's back!");
        cy.get(locators.dynamic_controls.chexbox).should('be.visible');
        cy.log('Checkbox removed and added back successfully');
    });

    //third test case in this suite, verify input field enabling and disabling
    it('TC03/8 should enable and disable input field correctly', () => {
        cy.get(locators.dynamic_controls.inputField).should('be.disabled');
        cy.get(locators.dynamic_controls.enableDisableButton).click();
        cy.get(locators.dynamic_controls.loadingIndicatorInput, { timeout: 5000 }).should('be.visible');
        cy.get(locators.dynamic_controls.inputMessage, { timeout: 15000 }).should('be.visible');
        cy.get(locators.dynamic_controls.inputMessage).should('contain', "It's enabled!");
        cy.get(locators.dynamic_controls.inputField).should('be.enabled');
        cy.get(locators.dynamic_controls.inputField).type('Yaaay it works');
        cy.log('input field enabled and text typed');
        cy.get(locators.dynamic_controls.enableDisableButton).click();
        cy.get(locators.dynamic_controls.loadingIndicatorInput, { timeout: 5000 }).should('be.visible');
        cy.get(locators.dynamic_controls.inputMessage, { timeout: 15000 }).should('be.visible');
        cy.get(locators.dynamic_controls.inputMessage).should('contain', "It's disabled!");
        cy.get(locators.dynamic_controls.inputField).should('be.disabled');
        cy.log('input field disabled successfully');
    });

    // fourth test case: try multiple remove/add and enable/disable actions in succession
    it('TC_04/8 should handle multiple remove/add and enable/disable actions', () => {
        const iterations = 2;

        for (let i = 0; i < iterations; i++) {
            // Remove checkbox
            cy.get(locators.dynamic_controls.removeAddButton).click();
            cy.get(locators.dynamic_controls.loadingIndicatorCheckbox, { timeout: 5000 }).should('be.visible');
            cy.get(locators.dynamic_controls.checkboxMessage, { timeout: 15000 }).should('be.visible');
            cy.get(locators.dynamic_controls.checkboxMessage).should('contain', "It's gone!");
            cy.get(locators.dynamic_controls.chexbox).should('not.exist');
            cy.log(`Iteration ${i + 1}: Checkbox removed`);

            // Add checkbox
            cy.get(locators.dynamic_controls.removeAddButton).click();
            cy.get(locators.dynamic_controls.loadingIndicatorCheckbox, { timeout: 5000 }).should('be.visible');
            cy.get(locators.dynamic_controls.checkboxMessage, { timeout: 15000 }).should('be.visible');
            cy.get(locators.dynamic_controls.checkboxMessage).should('contain', "It's back!");
            cy.get(locators.dynamic_controls.chexbox).should('be.visible');
            cy.log(`Iteration ${i + 1}: Checkbox added back`);

            // Enable input field
            cy.get(locators.dynamic_controls.enableDisableButton).click();
            cy.get(locators.dynamic_controls.loadingIndicatorInput, { timeout: 5000 }).should('be.visible');
            cy.get(locators.dynamic_controls.inputMessage, { timeout: 15000 }).should('be.visible');
            cy.get(locators.dynamic_controls.inputMessage).should('contain', "It's enabled!");
            cy.get(locators.dynamic_controls.inputField).should('be.enabled');
            cy.log(`Iteration ${i + 1}: Input field enabled`);

            // Disable input field
            cy.get(locators.dynamic_controls.enableDisableButton).click();
            cy.get(locators.dynamic_controls.loadingIndicatorInput, { timeout: 5000 }).should('be.visible');
            cy.get(locators.dynamic_controls.inputMessage, { timeout: 15000 }).should('be.visible');
            cy.get(locators.dynamic_controls.inputMessage).should('contain', "It's disabled!");
            cy.get(locators.dynamic_controls.inputField).should('be.disabled');
            cy.log(`Iteration ${i + 1}: Input field disabled`);
        }
    });
});