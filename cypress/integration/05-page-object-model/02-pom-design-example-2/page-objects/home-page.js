/// <reference types="cypress" />

class HomePage {
    
    elements = {
        /*
            Similar ES5 statement for the following:
            ----------------------------------------
            formsMenu: function() {
                return cy.contains('Forms');
            }

            The methods used will do similar job to the following function:
            ---------------------------------------------------------------
            getFormsMenu() {
                return cy.contains('Forms');
            }
        */
        formsMenu: () => cy.contains('Forms'),
        formLayoutsMenu: () => cy.contains('Form Layouts'),
        datepickerMenu: () => cy.contains('Datepicker'),
    };

    navToFormLayouts() {
        this.elements.formsMenu().click();
        this.elements.formLayoutsMenu().click();
    }

    navToDatepicker() {
        this.elements.formsMenu().click();
        this.elements.datepickerMenu().click();
    }
}

// Node.js exports
// module.exports = new HomePage();

// Plain JS ES6 exports
// 'default' keyword is suitable only while exporting the class and not its properties like methods, class variables or objects
// We can export an object of the class as the following
export const homePage = new HomePage();