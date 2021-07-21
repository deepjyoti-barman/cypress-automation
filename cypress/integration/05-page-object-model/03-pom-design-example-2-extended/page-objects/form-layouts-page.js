/// <reference types="cypress" />

class FormLayoutsPage {
    
    elements = {
        inlineFormFullNameTF: () => cy.get('.form-inline input[placeholder="Jane Doe"]'),
        inlineFormEmailTF: () => cy.get('.form-inline input[placeholder="Email"]'),
        inlineFormRememberMeCheckbox: () => cy.get('.form-inline input[type="checkbox"]'),
        inlineFormSubmitBtn: () => cy.get('.form-inline button[type="submit"]'),

        basicFormEmailTF: () => cy.get('#exampleInputEmail1'),
        basicFormPasswordTF: () => cy.get('#exampleInputPassword1'),
        basicFormCheckMeOutCheckbox: () => cy.get('nb-card:contains("Basic form") input[type="checkbox"]'),
        basicFormSubmitBtn: () => cy.get('.form-group + button[status="danger"]')
    };

    submitInlineFormWithDetails(fullName, email, isRememberMeChecked) {
        this.elements.inlineFormFullNameTF().type(fullName);
        this.elements.inlineFormEmailTF().type(email);

        if (isRememberMeChecked)
            this.elements.inlineFormRememberMeCheckbox().check({force: true});

        // If your web form starts with HTML tag <form> you can either click on the 'Submit' button or use cy.submit() method to submit the form
        this.elements.inlineFormSubmitBtn().click();
    }

    submitBasicFormWithDetails(email, password, isCheckMeOutChecked) {
        this.elements.basicFormEmailTF().type(email);
        this.elements.basicFormPasswordTF().type(password);

        if (isCheckMeOutChecked)
            this.elements.basicFormCheckMeOutCheckbox().check({force: true});

        // If your web form starts with HTML tag <form> you can either click on the 'Submit' button or use cy.submit() method to submit the form
        this.elements.basicFormSubmitBtn().click();
    }
}

export const formLayoutsPage = new FormLayoutsPage();