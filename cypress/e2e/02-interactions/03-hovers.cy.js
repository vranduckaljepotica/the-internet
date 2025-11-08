import 'cypress-real-events/support';
const locators = require('../../support/locators'); //access locators file

/** this is test suite for hovers page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_04 Hovers test', () => {
    beforeEach(()=> { //before each function executes before each test (it block)
        cy.visit('/hovers'); //in this case it will redirct us to hovers page
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/4 should load hovers page correctly', () => {
        cy.get(locators.hovers.hoversTitle).should('be.visible').and('contain', 'Hovers');
        cy.get(locators.hovers.figure).should('have.length', 3);
        cy.log('All elements are visible and exist on the page.');
    });

    // second test case in this suite, hover over each figure and verify user info is displayed
    it('TC_02/4 should display user info on hover', () => {
        cy.get(locators.hovers.figure).each(($el, index) => { //loop to go through each figure
            cy.wrap($el).realHover(); //this will hover over each figure
            cy.wrap($el).find(locators.hovers.figureCaption).should('be.visible'); 
            cy.log(`User info for figure ${index + 1} is displayed on hover.`);
            cy.wrap($el).find(locators.hovers.profileName, { timeout: 5000 }).then(($name) => {
                const profileName = $name.text();
                cy.log(`Profile Name: ${profileName}`);
            });
            cy.wrap($el).find(locators.hovers.profileLink, { timeout: 5000 }).then(($link) => {
                const profileLink = $link.attr('href');
                cy.log(`Profile Link: ${profileLink}`);
            });
        });
    });

    // third test case in this suite, verify that profile links navigate to correct pages
    it('TC_03/4 should navigate to correct profile page on link click', () => {
        cy.get(locators.hovers.figure).its('length').then((len) => {
            for (let i = 0; i < len; i++) {
                // re-query the figure each iteration so subject isn't detached by navigation
                cy.get(locators.hovers.figure).eq(i).realHover();

                cy.get(locators.hovers.figure).eq(i)
                  .find(locators.hovers.profileLink, { timeout: 5000 })
                  .should('be.visible')
                  .realClick();

                cy.url().should('include', `/users/${i + 1}`);
                cy.log(`Navigated to correct profile page for figure ${i + 1}.`);

                // return to the hovers page and ensure it's ready for the next iteration
                cy.go('back');
                cy.get(locators.hovers.figure, { timeout: 5000 }).should('have.length', len);
            }
        });
    });
    it('TC_04/4 should ensure figure caption is hidden when not hovering', () => {
        cy.get(locators.hovers.figure).each(($el, index) => {
            cy.wrap($el).find(locators.hovers.figureCaption).should('not.be.visible');
            cy.log(`Figure caption for figure ${index + 1} is hidden when not hovering.`);
        });
    });   
});