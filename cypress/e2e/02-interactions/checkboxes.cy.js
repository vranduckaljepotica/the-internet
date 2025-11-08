const locators = require('../../support/locators');

describe('Checkboxes test', () => {
    beforeEach(() => {
        cy.visit('checkboxes');
    });
    it('should load checkboxes page correctly', () => {
        cy.get(locators.checkboxes.checkboxTitile).should('be.visible').and('contain', 'Checkboxes');
        cy.get(locators.checkboxes.checkbox1).should('be.visible');
        cy.get(locators.checkboxes.checkbox2).should('be.visible');
    });
    it('should check and uncheck checboxes', () => {
        
    })
})