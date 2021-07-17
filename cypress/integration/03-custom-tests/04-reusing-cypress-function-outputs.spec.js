/// <reference types="cypress" />

describe('Suite containing tests to demonstrate reuse of a function output', () => {

    // skip() function skips the Cypress test
	it.skip('Random Cypress test', () => {

    });

    it('Test to save the result of Cypress function and using it later in another context', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // Approach 1: The normal way
        // Verify label text of Email and Password text-fields in 'Using the Grid'
        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');

        // Verify label text of Email and Password text-fields in 'Basic form'
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');


        // Approach 2: The Selenium way (to remove duplication of elements)
        // The above approach will not work
        // That is because Cypress is Asynchronous, so we cannot save the context / return values / output of the Cypress command
        const formHeader1 = cy.contains('nb-card', 'Using the Grid');                           // formHeader1 is a Cypress.Chainable object
        formHeader1.find('[for="inputEmail1"]').should('contain', 'Email');                     // This line will work
        // formHeader1.find('[for="inputPassword2"]').should('contain', 'Password');            // This line will not work, Cypress won't be able to locate this element

        const formHeader2 = cy.contains('nb-card', 'Basic form');                               // formHeader2 is a Cypress.Chainable object
        formHeader2.find('[for="exampleInputEmail1"]').should('contain', 'Email address');      // This line will work
        // formHeader2.find('[for="exampleInputPassword1"]').should('contain', 'Password');     // This line will not work, Cypress won't be able to locate this element


        // Approach 3: The Cypress way (using then() and wrap() methods)
        cy.contains('nb-card', 'Using the Grid').then((firstFormHeader) => {
            // firmFormHeader is a JQuery object (because we used then() method here)
            // That is the reason why we are able to able to save the context / return value into a variable and reuse it
            // But, we can't call Cypress methods like click() or type() referencing a JQuery type object
            // When dealing with JQuery type objects we should use expect() method for assertions
            // When dealing with Cypress.Chainable type objects we should use should() method for assertions
            const emailLabelFirst    = firstFormHeader.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = firstFormHeader.find('[for="inputPassword2"]').text();
            
            expect(emailLabelFirst).to.equal("Email");
            expect(passwordLabelFirst).to.equal("Password");

            // Verify that, email label text for both 'Using the Grid' form and 'Basic form' are different
            // Verify that, password label text for both 'Using the Grid' form and 'Basic form' are different
            cy.contains('nb-card', 'Basic form').then((secondFormHeader) => {
                const emailLabelSecond    = secondFormHeader.find('[for="exampleInputEmail1"]').text();
                const passwordLabelSecond = secondFormHeader.find('[for="exampleInputPassword1"]').text();

                expect(emailLabelFirst).to.not.equal(emailLabelSecond);
                expect(passwordLabelFirst).to.equal(passwordLabelSecond);

                // Changing the context / object type from JQuery type to Cypress.Chainable type using wrap() method
                cy.wrap(secondFormHeader).find('[for="exampleInputEmail1"]').should('contain', 'Email address');
                cy.wrap(secondFormHeader).find('[for="exampleInputPassword1"]').should('contain', 'Password');
            });
        });
    });
});