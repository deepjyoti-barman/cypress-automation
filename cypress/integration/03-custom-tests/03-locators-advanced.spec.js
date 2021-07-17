/// <reference types="cypress" />

describe('Suite containing advanced techniques to find element with locators', () => {

	it('Random Cypress test', () => {

    });

    // only(): Runs only the specified test in the suite
    it.only('Test to find web elements with locators', () => {
        // Open the browser load up the baseUrl and go to the 'For Layouts' page
        cy.visit('/');
		cy.contains('Forms').click();
		cy.get('span').contains('Form Layouts').click();

        // Adding our own unique locator into the application and finding the element
        cy.get('button[data-cy="signInButton"]');

        // Locates the first 'SIGN IN' button on the page under 'Using the Grid' section 
        // Syntax: contains(text)
        cy.contains('Sign in');

        // Locates the second 'SIGN IN' button on the page under 'Horizontal form' section
        // Syntax: contains(selector, text)
        cy.contains('[status="warning"]', 'Sign in');

        // Locating a non-unique element on the page from a unique element (traversing the DOM)
        // parent() only travels a single level up the DOM tree as opposed to the .parents() command
        cy.get('#inputEmail3').parents('form').find('button').should('contain', 'Sign in').parents('form').find('nb-checkbox').click();

        // The following command is not allowed
        // find() can't be used to call a child command before using a parent command
        // find() is used to find the child elements inside of the parent element
        // parents() is used to locate the parent element from the current key element which you are in
        // cy.find('button');

        // First locates the tag 'nb-card' inside of which we have another tag 'nb-card-header' which contains an inner-text 'Horizontal form' and then finds the child email text field element
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]');
    });
});