/// <reference types="cypress" />

describe('Test suite to automate DELETE API calls', () => {

    const accessToken = '2dc4a626f94fdcd1a461669ad7e92ec7e1704d779c3430a97e5c61346d04d016';
    const baseUrl     = 'https://gorest.co.in/public/v1';

    it('TC_001: Create a user via a POST call, delete the user via a DELETE call and verify the deletion via a GET call', () => {
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
                    method: 'DELETE',
                    url: baseUrl + '/users/' + id,
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'authorization': 'Bearer ' + accessToken,
                        'content-type': 'application/json; charset=utf-8'
                    },
                }).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.be.empty;

                    return id;
                }).then((id) => {
                    cy.log(`User with id ${id} has been deleted`);

                    cy.request({
                        method: 'GET',
                        url: baseUrl + '/users/' + id,
                        headers: {
                            'accept': 'application/json, text/plain, */*',
                            'authorization': 'Bearer ' + accessToken,
                            'content-type': 'application/json; charset=utf-8'
                        },
                        failOnStatusCode: false
                    }).then((response) => {
                        expect(response.status).to.equal(404);
                        expect(response.body.data).to.have.property('message', 'Resource not found');

                        cy.log(`User having id ${id} is deleted and verified by a GET call`);
                    });
                });
            });
        });
    });
});