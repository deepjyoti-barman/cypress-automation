/// <reference types="cypress" />

describe('Suite containing tests to demonstrate different types of assertions in Cypress', () => {

    it('Test to demonstrate different types of assertions in Cypress', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // For more details pay a visit to: https://docs.cypress.io/guides/references/assertions
        // Chai-jQuery assertions can be used inside should command as following
        // have.text can be used for extract string match
        cy.get('[for="exampleInputEmail1"]')
            .should('contain', 'Email address')
            .should('have.class', 'label')
            .and('have.text', 'Email address');

        // Chai-BDD assertions
        cy.get('[for="exampleInputEmail1"]').then((inputLabel) => {
            expect(inputLabel.text()).to.equal('Email address');
            expect(inputLabel).to.have.class('label');
            expect(inputLabel).to.have.text('Email address');
        });

        // Replacement of invoke('prop'. 'value') can be done with Chai-jQuery assertions in the following way
        cy.contains('Datepicker').click();
        
        const date  = '15';
        const month = 'Aug';
        const year  = '2021';

        cy.contains('nb-card', 'Common Datepicker').find('input').then((tagInput) => {
            cy.wrap(tagInput).click();

            cy.get('nb-calendar-navigation').find('button').click();
            cy.contains('nb-calendar-year-cell', year).click();
            cy.contains('nb-calendar-month-cell', month).click();
            cy.contains('nb-calendar-day-cell', date).click();

            // cy.wrap(tagInput).invoke('prop', 'value').should('contains', `${month} ${date}, ${year}`);
            cy.wrap(tagInput).should('have.value', `${month} ${date}, ${year}`);
        });
    });
});