/// <reference types="cypress" />

import { homePage as home } from "./page-objects/home-page";
import { formLayoutsPage as formLayouts } from './page-objects/form-layouts-page';
import { datepickerPage as datepicker } from "./page-objects/datepicker-page";
import { smartTablePage as smartTable } from "./page-objects/smart-table-page";

describe('Suite containing tests to demonstrate implementation of POM design pattern in Cypress', () => {
    
    beforeEach('Open the application in the given web-browser', () => {
        cy.openApp();
    });
    
    it('TC_001: Verify navigation across the pages', () => {
        home.navToFormLayoutsPage();
        home.navToDatepickerPage();
        home.navToToasterPage();
        home.navToTooltipPage();
        home.navToSmartTablePage();
    });

    it(`TC_002: Complete the following tasks:
        1. Navigate to the 'Form Layouts' page
        2. Submit 'Inline form' and 'Basic form' filling them with necessary data
        3. Navigate to 'Datepicker' page
        4. Select tomorrow's date in 'Common Datepicker' calendar
        5. Select a date ranged from 7-14 days from today in 'Datepicker With Range' calendar
        6. Navigate to the 'Smart Table' page
        7. Add a new record in the table providing necessary details
        8. Modify the age of the last record added to 39
        9. Delete the second record from the table` , () => {

        home.navToFormLayoutsPage();
        formLayouts.submitInlineFormWithDetails('Deepjyoti Barman', 'deepjyotibarman@zoho.com', true);
        formLayouts.submitBasicFormWithDetails('cypress-automation@outlook.com', 'Cypress123', true);

        home.navToDatepickerPage();
        datepicker.selectCommonDatepickerDateFromToday(1);
        datepicker.selectDatepickerWithRangeDateFromToday(7, 14);

        home.navToSmartTablePage();
        smartTable.addNewRecordWithDetails(61, 'Rahul', 'Dravid', 'rahul007', 'rahuldravid007@yahoo.co.in', 37);
        smartTable.updateAgeByFirstName('Rahul', 39);
        smartTable.deleteRowByIndex(1);
    });
});