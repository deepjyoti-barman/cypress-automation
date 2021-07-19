/// <reference types="cypress" />

describe('Suite containing tests to demonstrate how to handle radio buttons and checkboxes in Cypress', () => {

    it('Test to handle the radio buttons using the check() method', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then((radioButtons) => {
            // Check the first radio button and verify that the first radio button is checked

            // check() method can work only with input elements where [type="checkbox"] or [type="radio"]
            // check() method can be used to pick and multiple elements at a time
            // find([type="radio"]) found 3 radio buttons with the match and first() method selected the first element from them

            // The input radio element is covered by another element in this case
            // '<input class="native-input visually-hidden" type="radio">' is visually hidden and covered by '<span _ngcontent-ikg-c21="" class="outer-circle"></span>' element and so the input element is not available in the DOM
            // check({force: true}): Cypress's all methods like check(), click(), type() has a default check to see whether element is available or the element is visible. So to forcefully perform any action on these type of elements disabling Cypress's check we need to pass this flag setting it as true.
            cy.wrap(radioButtons).first().check({force: true}).should('be.checked');


            // Check the second radio button and verify that the second radio button is checked and the first radio button is unchecked
            // eq(<index>): Used to get an element with the specified index no
            cy.wrap(radioButtons).eq(1).check({force: true}).should('be.checked');
            cy.wrap(radioButtons).first().should('not.be.checked');


            // Verify the third radio button is disabled
            cy.wrap(radioButtons).last().should('be.disabled');
        });
    });

    it('Test to handle the checkboxes using the check() and click() methods', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        // Check all the 3 checkboxes present on the web page and verify it
        // check() method for checkboxes: If the checkbox is already checked, the check() command will not uncheck the checkbox. The check() command will only check the checkbox if it is unchecked.
        cy.get('[type="checkbox"]').check({force: true}).should('be.checked');

        // Uncheck all the checkboxes which is checked
        // You can't use check() method to uncheck a checkbox, in order to perform the same you need to use click() method instead.
        // cy.click() can only be called on a single element. When clicking on more than one element, we need to pass {multiple: true} if we want to serially click each element
        cy.get('[type="checkbox"]').click({force: true, multiple: true}).should('not.be.checked');
    });
});