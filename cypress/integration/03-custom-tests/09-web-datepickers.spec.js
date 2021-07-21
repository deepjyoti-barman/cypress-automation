/// <reference types="cypress" />

describe('Suite containing tests to demonstrate how to handle web date-pickers in Cypress', () => {

    it('Test to handle the web date-pickers', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();
        
        function selectDateFromCal(days) {
            let date = new Date();
            date.setDate(date.getDate() + days);
            let futureDate = date.getDate();
            // let futureMonth = date.getMonth();   // We can't use this as it will return the number of the month not the month string
            let futureMonth = date.toLocaleDateString('en-us', {month: 'short'});
            let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear();

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then((dateAttr) => {
                if (!dateAttr.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click();
                    selectDateFromCal(days);
                }
                else {
                    // While using contains() you must know, using a string finds the first element containing it (i.e. in the calendar it can select the inactive date '29' from the next month instead of selecting '2'). Using regular expression finds the exact text match.
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(new RegExp(futureDate, "g")).click();
                }
            });

            return dateAssert;
        }

        // Get the current date and add X days to the current date > Select the date right away if the future date is available in the current month, else change the month and then select the date > Verify that the correct date and month is selected
        cy.contains('nb-card', 'Common Datepicker').find('input').then((input) => {
            cy.wrap(input).click();
            let dateAssert = selectDateFromCal(46);

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(input).should('have.value', dateAssert);        // The above validation can be implemented this way as well
        });
    });
});