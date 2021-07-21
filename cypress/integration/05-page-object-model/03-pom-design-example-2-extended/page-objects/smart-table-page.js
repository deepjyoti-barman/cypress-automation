/// <reference types="cypress" />

class SmartTablePage {
    
    elements = {
        tableHeader: () => cy.get('thead'),
        tableBody: () => cy.get('tbody'),
        addRecordBtn: () => cy.get('thead .nb-plus'),
        newIdTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="ID"]'),
        newFirstNameTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="First Name"]'),
        newLastNameTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="Last Name"]'),
        newUsernameTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="Username"]'),
        newEmailTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="E-mail"]'),
        newAgeTF: () => cy.get('tr[ng-reflect-create-confirm] input[placeholder="Age"]'),
        createRecordCheckbox: () => cy.get('thead .nb-checkmark'),
        cancelRecordCheckbox: () => cy.get('thead .nb-close')
    };

    updateAgeByFirstName(name, age) {
        this.elements.tableBody().contains('tr', name).then((tableRow) => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type(age);
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').last().should('contain', age);
        });
    }

    addNewRecordWithDetails(id, firstName, lastName, userName, email, age) {
        this.elements.addRecordBtn().click();
        this.elements.newIdTF().type(id);
        this.elements.newFirstNameTF().type(firstName);
        this.elements.newLastNameTF().type(lastName);
        this.elements.newUsernameTF().type(userName);
        this.elements.newEmailTF().type(email);
        this.elements.newAgeTF().type(age);
        this.elements.createRecordCheckbox().click();

        this.elements.tableBody().find('tr').first().find('td').then((tableCols) => {
            cy.wrap(tableCols).eq(1).should('contain', id);
            cy.wrap(tableCols).eq(2).should('contain', firstName);
            cy.wrap(tableCols).eq(3).should('contain', lastName);
            cy.wrap(tableCols).eq(4).should('contain', userName);
            cy.wrap(tableCols).eq(5).should('contain', email);
            cy.wrap(tableCols).eq(6).should('contain', age);
        });
    }

    deleteRowByIndex(index) {
        const stub = cy.stub();
        cy.on('window:confirm', stub)
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    }
}

export const smartTablePage = new SmartTablePage();