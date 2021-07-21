/// <reference types="cypress" />

// Node.js imports (2 types)
// const HomePage = require('./page-objects/home-page');
// import HomePage from "./page-objects/home-page";

// Plain JS ES6 imports
// For importing non-default exports of a class we need to use curly braces {} around it (not required for default exports)
import HomePage from "./page-objects/home-page";

describe('Suite containing tests to demonstrate implementation of POM design pattern in Cypress', () => {
    
    beforeEach('Open the application in the given web-browser', () => {
        cy.visit('/');
    });
    
    it('Test with Page Objects', () => {

        // cy.get(), cy.contains() and cy.xpath() these methods can't be invoked outside the it() block so we need to initialize the HomePage object here, we can't initialize it outside or in another file and export the object to use here directly.
        const home = new HomePage();
        home.navToDatepicker();
    });
});