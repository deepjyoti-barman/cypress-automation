/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

class HomePage {
    
    constructor() {
        // Approach 1: Using XPaths
        cy.xpath('//span[text()="Forms"]').as('formsMenu');
        cy.xpath('//span[text()="Form Layouts"]').as('formLayoutsMenu');
        cy.xpath('//span[text()="Datepicker"]').as('datepickerMenu');

        // Approach 2: Using CSS Selector
        cy.get('span:contains("Forms")').as('formsMenu');
        cy.get('span:contains("Form Layouts")').as('formLayoutsMenu');
        cy.get('span:contains("Datepicker")').as('datepickerMenu');

        // Approach 3: Using Cypress contains() method
        cy.contains('Forms').as('formsMenu');
        cy.contains('Form Layouts').as('formLayoutsMenu');
        cy.contains('Datepicker').as('datepickerMenu');
    }

    navToFormLayouts() {
        cy.get('@formsMenu').click();
        cy.get('@formLayoutsMenu').click();
    }

    navToDatepicker() {
        cy.get('@formsMenu').click();
        cy.get('@datepickerMenu').click();
    }
}

// Node.js exports
// module.exports = HomePage;

// Plain JS ES6 exports
// 'default' keyword is suitable only while exporting the class and not its properties like methods, class variables or objects
// We can export a class directly by using 'export default class HomePage { ... }' or simply we can export at the end like the following
export default HomePage;