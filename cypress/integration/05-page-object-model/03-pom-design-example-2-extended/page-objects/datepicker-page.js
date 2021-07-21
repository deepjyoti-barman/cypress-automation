/// <reference types="cypress" />

function selectDateFromCal(days) {
    let date = new Date();
    date.setDate(date.getDate() + days);
    let futureDate = date.getDate();
    let futureMonth = date.toLocaleDateString('en-us', {month: 'short'});
    let dateAssert = futureMonth + ' ' + futureDate + ', ' + date.getFullYear();

    cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then((dateAttr) => {
        if (!dateAttr.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDateFromCal(days);
        }
        else {
            cy.get('.day-cell').not('.bounding-month').contains(new RegExp(futureDate, "g")).click();
        }
    });

    return dateAssert;
}

class DatepickerPage {
    
    elements = {
        commonDatepickerForm: () => cy.get('nb-card:contains("Common Datepicker") input'),
        rangeDatepickerForm: () => cy.get('nb-card:contains("Datepicker With Range") input'),
    };

    selectCommonDatepickerDateFromToday(dayFromToday) {
        this.elements.commonDatepickerForm().then((input) => {
            cy.wrap(input).click();
            let dateAssert = selectDateFromCal(dayFromToday);

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(input).should('have.value', dateAssert);
        });
    }

    selectDatepickerWithRangeDateFromToday(firstDay, secondDay) {
        this.elements.rangeDatepickerForm().then((input) => {
            cy.wrap(input).click();

            const dateAssertFirst = selectDateFromCal(firstDay);
            const dateAssertSecond = selectDateFromCal(secondDay);
            const finalDate = dateAssertFirst + ' - ' + dateAssertSecond;

            cy.wrap(input).invoke('prop', 'value').should('contain', finalDate);
            cy.wrap(input).should('have.value', finalDate);
        });
    }
}

export const datepickerPage = new DatepickerPage();
