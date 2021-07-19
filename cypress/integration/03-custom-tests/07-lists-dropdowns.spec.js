/// <reference types="cypress" />

describe('Suite containing tests to demonstrate how to handle lists and dropdowns in Cypress', () => {

    it('Test to handle the dropdowns', () => {
        cy.visit('/');

        // Click on the dropdown in the home page to change the theme > Select 'Dark' theme from the dropdown > Verify that the background color has changed > Also verify that the text 'Dark' is selected/active in the dropdown menu
        // While dealing with color combinations Cypress works with RGB format and not with Hex format (Use Google / any other tool to convert from one to another)
        cy.get('nb-layout-header nb-select button').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');
        cy.get('nb-layout-header nb-select button').should('contain', 'Dark');


        // Repeat the above scenario for all the entries available in the dropdown
        cy.get('nb-layout-header nb-select button').then((dropdownBtn) => {
            cy.wrap(dropdownBtn).click();

            // each(): Cypress each() method is kind of a for-each loop in JavaScript that does perform some action on each element which is passed to it
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();
                const colors = {
                    "Light": "rgb(255, 255, 255)",
                    "Dark": "rgb(34, 43, 69)",
                    "Cosmic": "rgb(50, 50, 89)",
                    "Corporate": "rgb(255, 255, 255)"
                };

                cy.wrap(listItem).click();
                cy.wrap(dropdownBtn).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);

                if (index < Object.keys(colors).length - 1)
                    cy.wrap(dropdownBtn).click();
            });
        });
    });

    it('Test to handle lists having <select> tag', () => {
        // For more information visit: https://docs.cypress.io/api/commands/select
        // select(): This method works only to handle element having tag <select>
        cy.visit('https://www.seleniumeasy.com/test/basic-select-dropdown-demo.html');

        // Approach 1: Select by Text Content and verify the value
        const day1 = 'Friday';
        
        cy.get('select#select-demo').select(day1).should('have.value', day1);
        cy.get('p.selected-value').should('contain', day1);


        // Approach 2: Select by Value and verify the text
        const day2 =  'Monday';

        cy.get('select#select-demo').select(day2).should('contain', day2);
        cy.get('p.selected-value').should('contain', day2);


        // Approach 3: Handling a multi-select list
        // One thing to remember is you can select the items from the list the order you want, but when it comes to validation you should put the items in the order they are inside the <select> tag
        cy.get('select#multi-select')
            .select(['Florida', 'California', 'New York'])
            .invoke('val')
            .should('deep.equal', ['California', 'Florida', 'New York']);
    });
});