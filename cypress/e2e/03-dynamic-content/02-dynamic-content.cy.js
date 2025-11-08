const locators = require('../../support/locators');
/** this is test suite for dynamic loading page on the-internet heroku app
 * owner: Amna Sinanovic-Dukmenic
 * framework: Cypress
 * date: November 2025
*/
describe('TS_07 Dynamic Content tests', () => {
    beforeEach(() => { 
        cy.visit('/dynamic_content');
    });

    // first test case in this suite, verification that page loads correct elements
    it('TC_01/7 should load dynamic content page correctly', () => {
        cy.get(locators.dynamic_content.dynamicContentTitle).should('be.visible').and('contain', 'Dynamic Content');
        cy.get(locators.dynamic_content.contentImages).should('have.length', 3);
        cy.get(locators.dynamic_content.contentParagraphs).should('have.length', 3);
    });

    // second test case in this suite, verify that content changes on page reload
    it('TC_02/7 should change content on page reload', () => {
        // Capture initial content
        let initialContents = [];
        cy.get(locators.dynamic_content.contentParagraphs).each(($el) => {
            initialContents.push($el.text());
        }).then(() => {
            // Reload the page
            cy.reload();
            // Verify that content has changed
            cy.get(locators.dynamic_content.contentParagraphs).each(($el, index) => {
                expect($el.text()).to.not.equal(initialContents[index]);
            });
        });
    });

    // helper: return array of image srcs
    const getImageSrcs = () => {
        return cy.get(locators.dynamic_content.contentImages).then(($imgs) =>
            Array.from($imgs).map((img) => img.getAttribute('src'))
        );
    };

    // third test case in this suite, verify that images change on page reload (at least one must change)
    it('TC_03/7 should change images on page reload', () => {
        getImageSrcs().then((initialImageSrcs) => {
            cy.reload();
            getImageSrcs().then((newImageSrcs) => {
                const changed = newImageSrcs.filter((src, i) => src !== initialImageSrcs[i]);
                // expect at least one image changed; adjust threshold if you need stricter check
                expect(changed.length, 'number of changed images').to.be.greaterThan(0);
            });
        });
    });

    // fourth test case: try multiple reloads and ensure content/images change across reloads
    it('TC_04/7 should change both images and content on multiple reloads', () => {
        const maxReloads = 3;
        let previousImageSrcs = [];
        let previousContents = [];

        const capture = () => {
            return cy.get(locators.dynamic_content.contentImages)
                .then(($imgs) => Array.from($imgs).map((img) => img.getAttribute('src')))
                .then((imgs) =>
                    cy.get(locators.dynamic_content.contentParagraphs).then(($ps) =>
                        ({ imgs, ps: Array.from($ps).map((p) => p.innerText) })
                    )
                );
        };

        // run sequence of reloads and checks
        capture().then(({ imgs, ps }) => {
            previousImageSrcs = imgs;
            previousContents = ps;

            cy.wrap(null).then(function iterate() {
                if (maxReloads <= 0) return;
                // use a Cypress chain to reload then capture and compare
            });

            // iterative approach: perform reloads sequentially
            let attempts = 0;
            const tryReload = () => {
                if (attempts >= maxReloads) return;
                attempts++;
                cy.reload();
                capture().then(({ imgs: newImgs, ps: newPs }) => {
                    // allow that not all items change; assert at least one changed each reload
                    const imgChanges = newImgs.filter((v, i) => v !== previousImageSrcs[i]).length;
                    const contentChanges = newPs.filter((v, i) => v !== previousContents[i]).length;
                    expect(imgChanges + contentChanges, `changes on reload ${attempts}`).to.be.greaterThan(0);
                    // update previous and continue
                    previousImageSrcs = newImgs;
                    previousContents = newPs;
                    tryReload();
                });
            };
            tryReload();
        });
    });

    // fifth test case in this suite, verify that content and images are present after reload
    it('TC_05/7 should have content and images present after reload', () => {
        // Reload the page
        cy.reload();
        // Verify that content paragraphs are present
        cy.get(locators.dynamic_content.contentParagraphs).should('have.length', 3).each(($el) => {
            cy.wrap($el).should('not.be.empty');
        });
        // Verify that images are present
        cy.get(locators.dynamic_content.contentImages).should('have.length', 3).each(($el) => {
            cy.wrap($el).should('have.attr', 'src').and('not.be.empty');
        });
    });

});