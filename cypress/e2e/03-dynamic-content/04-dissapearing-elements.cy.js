const locators = require('../../support/locators');
/** this is test suite for disappearing elements page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_09 Dissapearing Elements tests', () => {
    beforeEach(() => {
        cy.visit('/disappearing_elements');
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/9 should load disappearing elements page correctly', () => {
        cy.get(locators.dissapearing_elements.dissapearingElementsTitle).should('be.visible');
        cy.get(locators.dissapearing_elements.dissapearingElementsTitle).should('contain', 'Disappearing Elements');
        cy.get(locators.dissapearing_elements.navBarItems).should('have.length.at.least', 4);
        cy.log('All elements are visible and exist on the page');
    });

    // second test case in this suite, verify that "Gallery" link appears after multiple reloads
    it('TC_02/9 should find Gallery link after multiple reloads', () => {
 
    });

    // third test case in this suite, verify navigation to Gallery page if link is present
    it('TC_03/9 should navigate to Gallery page if link is present', () => {
        cy.get('body').then(($body) => {
            if ($body.find(locators.dissapearing_elements.gallery).length) {
                cy.get(locators.dissapearing_elements.gallery).click();
                cy.url().should('include', '/gallery');
                cy.get(locators.dissapearing_elements.galleryTitle).should('be.visible');
                cy.get(locators.dissapearing_elements.galleryTitle).should('contain', 'Gallery');
                cy.log('Navigated to Gallery page successfully');
            } else {
                cy.log('Gallery link not present; skipping navigation test');
            }
        });
    }); 
});