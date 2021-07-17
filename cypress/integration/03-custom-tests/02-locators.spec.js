// Type definitions for Cypress object "cy". Visual Studio's intellisense will help us to identify Cypress methods
/// <reference types="cypress" />

describe('Suite containing tests with all types of locators', () => {

	it('Cypress locator test', () => {
		// Opens up the browser and loads the baseUrl specified in the cypress.json config file
		cy.visit('/');

		// Locator: Inner Text
		// Syntax: get(selector) -> Used to locate an element on the web page
		// Cypress is using the jQuery selector engine
		// Cypress does not have xpath as a selector which selenium has. We can optionally install the xpath plugin for Cypress but, its not required because jQuery selector is much powerful and does most of our job.
		cy.contains('Forms').click();
		cy.get('span').contains('Form Layouts').click();

		// Locator: Tag Name
		cy.get('input');

		// Locator: ID
		cy.get('#inputEmail1');
		cy.get('input#inputEmail1');

		// Locator: Class Name, we can provide one class value out of multiple
		cy.get('.input-full-width');
		cy.get('input.input-full-width');

		// Locator: Attribute Name
		cy.get('[placeholder]');

		// Locator: Attribute Name and Value
		cy.get('[placeholder="Email"]');
		cy.get('input[placeholder^="Em"]');
		cy.get('input[placeholder$="il"]');
		cy.get('input[placeholder*="mai"]');

		// Locator: Class Value, we have to provide the entire value for the class attribute
		cy.get('[class="input-full-width size-medium shape-rectangle"]');

		// Locator: Tagname + Attribute Name and Value
		cy.get('input[placeholder="Email"]');

		// Locator: Two different attributes
		cy.get('[placeholder="Email"][fullwidth]')

		// Locator: Tagname + Attribute Name and Value + ID + Class Name
		cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

		// Locator: Create your own attribute by modifying the source code html document (Most recommended way)
		cy.get('[data-cy="imputEmail1"]');

		// Locator: Complex CSS Selector via Cypress Selector Playground
		cy.get('nb-radio-group > :nth-child(1) > label > .text');
	});
});