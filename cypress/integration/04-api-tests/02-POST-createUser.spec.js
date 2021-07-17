/// <reference types="cypress" />

// URL to get the APIs for Testing: https://gorest.co.in/rest-console
describe('Test suite to automate POST API calls', () => {

    const accessToken = '2dc4a626f94fdcd1a461669ad7e92ec7e1704d779c3430a97e5c61346d04d016';
    const baseUrl     = 'https://gorest.co.in/public/v1';

    it('TC_001: Create a user (hardcoded)', () => {
        cy.request({
            method: 'POST',
            url: baseUrl + '/users',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'authorization': 'Bearer ' + accessToken,
                'content-type': 'application/json; charset=utf-8'
            },
            body: {
                "name": "Test Automation",
                "email": "test-automation321@outlook.com",
                "gender": "male",
                "status": "active"
            }
        }).then((response) => {
            // Logging the response in the following way will make the output visible in the browser console window (once clicked on it in the LHS execution pane) instead of directly printing it
            // Printing the response using cy.log(JSON.stringify(response)) may log the entire output on the LHS execution pane but debugging the response from there is a cumbersome task
            cy.log(response);

            expect(response.status).to.equal(201);
            expect(response.statusText).to.equal("Created");
            expect(response.duration).to.be.lte(1000);
            expect(response.body.data).has.property('name', 'Test Automation');
            expect(response.body.data).has.property('email', 'test-automation321@outlook.com');
            expect(response.body.data).has.property('gender', 'male');
            expect(response.body.data).has.property('status', 'active');
        });
    });

    it('TC_002: Create a user (with random email and picking up data from fixtures)', () => {
        // Adding extension to the payload file is optional
        const jsonData = require('../../fixtures/payload_createUser.json');

        // Generating a random email for our test case
        let randomText = "";
        let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        let testEmail = randomText + "@outlook.com";

        cy.request({
            method: 'POST',
            url: baseUrl + '/users',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'authorization': 'Bearer ' + accessToken,
                'content-type': 'application/json; charset=utf-8'
            },
            body: {
                "name": jsonData.name,
                "email": testEmail,
                "gender": jsonData.gender,
                "status": jsonData.status
            }
        }).then((response) => {
            cy.log(response);
            cy.log("User ID: " + response.body.data.id);
            cy.log("Email: " + response.body.data.email);

            expect(response.status).to.equal(201);
            expect(response.statusText).to.equal("Created");
            expect(response.duration).to.be.lte(1000);
            expect(response.body.data).has.property('name', jsonData.name);
            expect(response.body.data).has.property('email', testEmail);
            expect(response.body.data).has.property('gender', jsonData.gender);
            expect(response.body.data).has.property('status', jsonData.status);
        });
    });

    it.only('TC_003: Create a user (with random email and cy.fixtures() method)', () => {
        // Generating a random email for our test case
        let randomText = "";
        let pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++)
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length));
        let testEmail = randomText + "@outlook.com";

        // Adding extension to the payload file is optional
        cy.fixture('payload_createUser.json').then((jsonData) => {
            cy.request({
                method: 'POST',
                url: baseUrl + '/users',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'authorization': 'Bearer ' + accessToken,
                    'content-type': 'application/json; charset=utf-8'
                },
                body: {
                    "name": jsonData.name,
                    "email": testEmail,
                    "gender": jsonData.gender,
                    "status": jsonData.status
                }
            }).then((response) => {
                cy.log(response);
                cy.log("User ID: " + response.body.data.id);
                cy.log("Email: " + response.body.data.email);
    
                expect(response.status).to.equal(201);
                expect(response.statusText).to.equal("Created");
                expect(response.duration).to.be.lte(1000);
                expect(response.body.data).has.property('name', jsonData.name);
                expect(response.body.data).has.property('email', testEmail);
                expect(response.body.data).has.property('gender', jsonData.gender);
                expect(response.body.data).has.property('status', jsonData.status);
            });
        });
    });
});