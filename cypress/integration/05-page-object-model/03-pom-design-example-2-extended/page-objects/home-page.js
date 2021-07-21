/// <reference types="cypress" />

function selectGroupMenuItem(groupMenuElement) {
    groupMenuElement.then((menu) => {
        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then((attr) => {
            if (attr.includes('left'))
                cy.wrap(menu).click();
        });
    });
}

class HomePage {
    
    elements = {
        // Group menu header elements
        formsMenu: () => cy.contains('a', 'Forms'),
        modalAndOverlaysMenu: () => cy.contains('a', 'Modal & Overlays'),
        tablesAndDataMenu: () => cy.contains('a', 'Tables & Data'),

        // Group menu inner elements
        formLayoutsMenu: () => cy.contains('Form Layouts'),
        datepickerMenu: () => cy.contains('Datepicker'),
        toastrMenu: () => cy.contains('Toastr'),
        smartTableMenu: () => cy.contains('Smart Table'),
        tooltipMenu: () => cy.contains('Tooltip'),
    };


    navToFormLayoutsPage() {
        selectGroupMenuItem(this.elements.formsMenu());
        this.elements.formLayoutsMenu().click();
    }

    navToDatepickerPage() {
        selectGroupMenuItem(this.elements.formsMenu());
        this.elements.datepickerMenu().click();
    }

    navToToasterPage() {
        selectGroupMenuItem(this.elements.modalAndOverlaysMenu());
        this.elements.toastrMenu().click();
    }

    navToTooltipPage() {
        selectGroupMenuItem(this.elements.modalAndOverlaysMenu());
        this.elements.tooltipMenu().click();
    }

    navToSmartTablePage() {
        selectGroupMenuItem(this.elements.tablesAndDataMenu());
        this.elements.smartTableMenu().click();
    }
}

export const homePage = new HomePage();