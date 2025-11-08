// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('dragTo', { prevSubject: 'element' }, (subject, targetSelector) => {
    // run in browser context to access window.DataTransfer
    return cy.window().then((win) => {
        const srcEl = subject[0];
        const targetEl = win.document.querySelector(targetSelector);
        if (!srcEl) throw new Error('Source element not found for dragTo');
        if (!targetEl) throw new Error(`Target element not found for selector: ${targetSelector}`);

        // create a real DataTransfer
        const dataTransfer = new win.DataTransfer();

        const dispatch = (el, type, dt) => {
            let evt;
            try {
                evt = new win.DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt });
            } catch (err) {
                // fallback for environments that don't allow DataTransfer in constructor
                evt = win.document.createEvent('Event');
                evt.initEvent(type, true, true);
                evt.dataTransfer = dt;
            }
            el.dispatchEvent(evt);
        };

        // sequence of events
        dispatch(srcEl, 'dragstart', dataTransfer);
        dispatch(targetEl, 'dragenter', dataTransfer);
        dispatch(targetEl, 'dragover', dataTransfer);
        dispatch(targetEl, 'drop', dataTransfer);
        dispatch(srcEl, 'dragend', dataTransfer);

        return cy.wrap(subject);
    });
});