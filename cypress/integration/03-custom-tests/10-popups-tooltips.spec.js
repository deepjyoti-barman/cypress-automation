/// <reference types="cypress" />

describe('Suite containing tests to demonstrate how to handle popups and tool-tips in Cypress', () => {

    it('Test to handle the popups and tool-tips', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        // Click on Default tooltip and verify that the correct tooltip value is displayed or not
        // Two difficulties in this case: 1. Cypress does not have hover functionality, 2. You can't right click on the tooltip content to inspect it
        // So, in such case take help of Cypress runner and inspect the element from there. You will get the locator because Cypress runner makes recording of all the steps for us and freezes the application for every step that has been executed
        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });

    it('Test to handle browser popups', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // Approach 1: Not so good way
        // The problem with this approach is this code will not fail if we did not have any popup with a confirm message
        // That means, the following expected condition will only get executed if the cy.on() method is able to detect that 'window.confirm' event is fired, this is why we won't be able to actually verify whether the popup window was there or not
        // Popups can be of may types: 'window:confirm', 'window:alert' etc, hence you need to know which type of popup is used in your application before handling it
        // The difficultly here in this case is, Cypress is configured to automatically confirm those messages so the popup won't even come up during execution of the test case
        // Click on the trash icon for the first row, then click on either 'Yes' or 'No' and finally verify the popup message
        cy.get('tbody tr').first().find('.nb-trash').click();

        // Click on 'Yes' button of the popup
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Are you sure you want to delete?');
        // });

        // Click on the 'No' button of the popup
        cy.on('window:confirm', () => false);

        // Approach 2
        const stub = cy.stub();
        cy.on('window:confirm', stub)
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    });

    it('Test to handle dialog boxes / hidden division popups', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Dialog').click();

        // Click on 'OPEN DIALOG WITH TEMPLATE' button under 'Open Dialog' section to open the dialog box. Verify the header text, verify the text in the body and finally click on the 'CLOSE DIALOG' button
        cy.contains('nb-card', 'Open Dialog').contains('button', 'Open Dialog with template').click();
        cy.get('nb-card nb-card-header').should('contain', 'Template Dialog');
        cy.get('nb-card nb-card-body').should('contain', 'this is some additional data passed to dialog');
        cy.get('nb-card nb-card-footer').find('button').click();

        // Click on 'ENTER NAME' button under 'Return Result From Dialog' section. Enter name 'Deepjyoti' inside of the dialog box and click on 'SUBMIT' button. Verify that the name you have submitted is present under the 'Names' un-ordered list section
        cy.contains('nb-card', 'Return Result From Dialog').contains('button', 'Enter Name').click();
        cy.get('input[placeholder="Name"]').type('Deepjyoti');
        cy.get('button[status="success"]').click();
        cy.contains('nb-card', 'Return Result From Dialog').find('li').should('contain', 'Deepjyoti');
    });
});