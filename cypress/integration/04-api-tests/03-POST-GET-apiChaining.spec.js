/// <reference types="cypress" />

const jsonData = require('../../fixtures/payload_createUser');

describe('Test suite to demonstrate API chaining in Cypress', () => {

    const accessToken = '2dc4a626f94fdcd1a461669ad7e92ec7e1704d779c3430a97e5c61346d04d016';
    const baseUrl     = 'https://gorest.co.in/public/v1';

    it('TC_001: Create a user using a POST API call and verify via GET API call', () => {
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
        }).then((response) => {
            // Verifying if the user is created via GET call (getUser service call for a particular id)
            const userId = response.body.data.id;

            cy.request({
                method: 'GET',
                url: baseUrl + '/users/' + userId,
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'authorization': 'Bearer ' + accessToken,
                    'content-type': 'application/json; charset=utf-8'
                }
            }).then((response) => {
                cy.log(response);
                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal({
                    "meta": null,
                    "data": {
                        "id": userId,
                        "name": jsonData.name,
                        "email": testEmail,
                        "gender": jsonData.gender,
                        "status": jsonData.status
                    }
                });
            });
        });
    });
});