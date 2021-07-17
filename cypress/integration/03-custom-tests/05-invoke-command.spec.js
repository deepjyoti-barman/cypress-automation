/// <reference types="cypress" />

describe('Suite containing tests to demonstrate 3 most common use-cases of invoke command', () => {

    it('Test to demonstrate the use of invoke command in Cypress', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // Use case 1: Retrieving and verifying inner text of an element
        // Approach 1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address');

        // Approach 2
        cy.get('[for="exampleInputEmail1"]').then((inputLabel) => {
            // Here inputLabel is a JQuery object
            expect(inputLabel.text()).to.equal('Email address');
        });

        // Approach 3 [Using invoke() command]
        cy.get('[for="exampleInputEmail1"]').invoke('text').then((labelText) => {
            // Here labelText is a string object
            expect(labelText).to.equal('Email address');
        });


        // Use case 2: Retrieving and verifying the attribute of an element
        // Verify if the checkbox of 'Basic form' is checked
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked');
            .then((classValue) => {
                // classValue is a string object
                expect(classValue).to.contain('checked');
            });


        // Use case 3: Retrieving and verifying the value of an HTML property
        // Go to 'Datepicker' > Select any date of the current month from 'Common Datepicker' > Verify the value of the date selected
        // Once you select a date from the datepicker > Inspect the element > Click "Properties" tab from the box on the RHS > expand 'input.size-medium.shape-rectangle' > find 'value' property in it
        cy.contains('Datepicker').click();

        // Click on the month and year selector
        const date  = '15';
        const month = 'Aug';
        const year  = '2021';

        cy.contains('nb-card', 'Common Datepicker').find('input').then((tagInput) => {
            cy.wrap(tagInput).click();

            cy.get('nb-calendar-navigation').find('button').click();
            cy.contains('nb-calendar-year-cell', year).click();
            cy.contains('nb-calendar-month-cell', month).click();
            cy.contains('nb-calendar-day-cell', date).click();

            cy.wrap(tagInput).invoke('prop', 'value').should('contains', `${month} ${date}, ${year}`);
        });
    });
});