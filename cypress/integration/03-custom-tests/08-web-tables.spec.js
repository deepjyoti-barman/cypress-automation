/// <reference types="cypress" />

describe('Suite containing tests to demonstrate how to handle web tables in Cypress', () => {

    it('Test to handle the web tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // Find the table row having first name 'Larry' > Click on the edit icon > Change his age to 25 > Click on the check-mark icon to save the changes > Verify that his age is successfully changed to 25
        cy.get('tbody').contains('tr', 'Larry').then((tableRow) => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').last().should('contain', '25');
        });


        // Click on the + icon to add new row into the table > Enter any random first and last name > Click on the check-mark to add the data into the table > Verify that the data is added successfully
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').last().then((tableRow) => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Deepjyoti');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Barman');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then((tableCols) => {
            cy.wrap(tableCols).eq(2).should('contain', 'Deepjyoti');
            cy.wrap(tableCols).eq(3).should('contain', 'Barman');
        });


        // Search for 20 followed by 30, 40 and 200 in the 'Age' text-field > Verify that all the entries that showed up on the table now are having 20 in the 'Age' column when 20 is entered in the search field, same behaviour to be followed for others as well (i.e. 30, 40). For an invalid age (i.e. 200) verify that 'No data found' is showed up on the table
        const ageGroup = [20, 30, 40, 200];

        cy.wrap(ageGroup).each((age) => {
            cy.get('thead input[placeholder="Age"]').clear().type(age);
            cy.wait(500);                       // Adding delay to take the updated table row entries
            cy.get('tbody tr').each((tableRow) => {
                if (age === 200)
                   cy.wrap(tableRow).should('contain', 'No data found');
                else
                    cy.wrap(tableRow).find('td').last().should('contain', age);
            });
        });
    });
});