import 'cypress-real-events/support';

const locators = require('../../support/locators'); //access locators file

/** this is test suite for drag and drop page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_05 Drag and drop test', () => {
    beforeEach(() => { //before each function executes before each test (it block)
        cy.visit('/drag_and_drop'); //in this case it will redirct us to drag and drop page
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/5 should load drag and drop page correctly', () => {
        cy.get(locators.drag_and_drop.dragAndDropTitle).should('be.visible').and('contain', 'Drag and Drop');
        cy.get(locators.drag_and_drop.columnA).should('be.visible');
        cy.get(locators.drag_and_drop.columnB).should('be.visible');
        cy.log('All elements are visible and exist on the page.');
    });

    // second test case in this suite, perform drag and drop and verify the columns have swapped
    it('TC_02/5 should drag and drop column A to column B', () => {
        cy.get(locators.drag_and_drop.headerA).should('contain', 'A');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'B');

        cy.get(locators.drag_and_drop.columnA).dragTo(locators.drag_and_drop.columnB);

        cy.get(locators.drag_and_drop.headerA).should('contain', 'B');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'A');

        cy.log('Drag and drop action completed and verified successfully.');
    });
    it('TC_03/5 should drag and drop column B to column A', () => {
        cy.get(locators.drag_and_drop.headerA).should('contain', 'A');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'B');

        cy.get(locators.drag_and_drop.columnB).dragTo(locators.drag_and_drop.columnA);

        cy.get(locators.drag_and_drop.headerA).should('contain', 'B');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'A');

        cy.log('Drag and drop action completed and verified successfully.');
    });
    it('TC_04/5 should perform multiple drag and drop actions', () => {
        // First drag A to B
        cy.get(locators.drag_and_drop.columnA).dragTo(locators.drag_and_drop.columnB);
        cy.get(locators.drag_and_drop.headerA).should('contain', 'B');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'A');
        cy.log('First drag and drop action completed.');

        // Then drag B back to A
        cy.get(locators.drag_and_drop.columnB).dragTo(locators.drag_and_drop.columnA);
        cy.get(locators.drag_and_drop.headerA).should('contain', 'A');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'B');
        cy.log('Second drag and drop action completed.');
    });
    it('TC_05/5 should verify columns remain in place after page reload', () => {
        // Drag A to B
        cy.get(locators.drag_and_drop.columnA).dragTo(locators.drag_and_drop.columnB);
        cy.get(locators.drag_and_drop.headerA).should('contain', 'B');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'A');
        cy.log('Drag and drop action completed.');

        // Reload the page
        cy.reload();

        // Verify columns remain swapped
        cy.get(locators.drag_and_drop.headerA).should('contain', 'A');
        cy.get(locators.drag_and_drop.headerB).should('contain', 'B');
        cy.log('Columns verified to remain in place after page reload.');
    });
});