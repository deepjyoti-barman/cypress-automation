/// <reference types="cypress" />

// Node.js imports (2 types)
// const home = require('./page-objects/home-page');
// import home from "./page-objects/home-page";

// Plain JS ES6 imports
// For importing non-default exports of a class we need to use curly braces {} around it (not required for default exports)
import { homePage as home } from "./page-objects/home-page";

describe('Suite containing tests to demonstrate implementation of POM design pattern in Cypress', () => {
    
    beforeEach('Open the application in the given web-browser', () => {
        cy.visit('/');
    });
    
    it('Test with Page Objects', () => {
        home.navToDatepicker();
    });
});