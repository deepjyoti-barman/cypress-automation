/// <reference types="cypress" />

describe('Test suite to automate PUT API calls', () => {

    // PUT call has two purposes: Replacing an existing resource or creating a resource if it does not exist
    // PUT call is idempotent in nature, that means, if you PUT a resource twice, it has not effect
    // PUT /newEmailId > Creates a new user and returns the user
    // PUT /existingEmailId > Overwrites a user with the email id, returns the updated user
    const accessToken = '2dc4a626f94fdcd1a461669ad7e92ec7e1704d779c3430a97e5c61346d04d016';
    const baseUrl     = 'https://gorest.co.in/public/v1';

    it('TC_001: Create a user via a POST call, modify it via PUT call and finally verify it via a GET call', () => {
        cy.fixture('payload_createUser.json').as('userData');
        cy.get('@userData').then((payload) => {
            cy.request({
                method: 'POST',
                url: baseUrl + '/users',
                headers: {
                    'accept': 'application/json, text/plain, */*',
                    'authorization': 'Bearer ' + accessToken,
                    'content-type': 'application/json; charset=utf-8'
                },
                body: payload
            }).then((response) => {
                // Un-commenting cy.log() calls will make the script go fail
                // This is because cy.log() is a Synchronous call and we can't use this call inside an Asynchronous call
                // We can use cy.log() before cy.request() call and it will work fine
                // cy.log(response);
                // cy.log("User ID: " + response.body.data.id);
                expect(response.status).to.equal(201);
                expect(response.body.data).has.property('name', payload.name);
                expect(response.body.data).has.property('email', payload.email);
                expect(response.body.data).has.property('gender', payload.gender);
                expect(response.body.data).has.property('status', payload.status);

                const userId = response.body.data.id;
                return userId;
            }).then((id) => {
                cy.log(`User with id ${id} has been created`);

                cy.request({
                    method: 'PUT',
                    url: baseUrl + '/users/' + id,
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'authorization': 'Bearer ' + accessToken,
                        'content-type': 'application/json; charset=utf-8'
                    },
                    body: {
                        "name": "Cypress Automation Updated",
                        "email": payload.email,
                        "gender": payload.gender,
                        "status": 'inactive'
                    }
                }).then((response) => {
                    cy.log(response);

                    expect(response.status).to.equal(200);
                    expect(response.body.data).has.property('name', 'Cypress Automation Updated');
                    expect(response.body.data).has.property('email', payload.email);
                    expect(response.body.data).has.property('gender', payload.gender);
                    expect(response.body.data).has.property('status', 'inactive');
                }).then((response) => {
                    cy.request({
                        method: 'GET',
                        url: baseUrl + '/users/' + response.body.data.id,
                        headers: {
                            'accept': 'application/json, text/plain, */*',
                            'authorization': 'Bearer ' + accessToken,
                            'content-type': 'application/json; charset=utf-8'
                        }
                    }).then((response) => {
                        cy.log(response);

                        expect(response.status).to.equal(200);
                        expect(response.body.data).has.property('name', 'Cypress Automation Updated');
                        expect(response.body.data).has.property('email', payload.email);
                        expect(response.body.data).has.property('gender', payload.gender);
                        expect(response.body.data).has.property('status', 'inactive');
                    });
                });
            });
        });
    });
});