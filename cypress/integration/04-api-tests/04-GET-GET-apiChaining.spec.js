/// <reference types="cypress" />

describe('Test suite to demonstrate a practical example of API chaining in Cypress', () => {

    const baseUrl = 'https://www.metaweather.com/api/location/search';

    it('TC_001: Get weather information of multiple locations via GET API call and verify each one of them via another GET API call', () => {
        cy.request({
            method: 'GET',
            url: baseUrl + '/?query=san',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            expect(response.status).to.equal(200);

            // Sending location data from one then block to another
            const locations = response.body;
            return locations;
        }).then((locations) => {
            // Accessing each location title to send it as an input to another GET API
            // locations = ['Santiago', 'Santa Cruz', 'San Francisco'...]
            for (let location of locations) {
                cy.request({
                    method: 'GET',
                    url: baseUrl + '/?query=' + location.title,
                    headers: {
                        'accept': 'application/json, text/plain, */*',
                        'content-type': 'application/json; charset=utf-8'
                    }
                }).then((response) => {
                    expect(response.status).to.equal(200);

                    // Searching with each location title can also fetch multiple location data
                    // Santa Cruz => Santa Cruz, Santa Cruz de Tenerife
                    let multiLocData = response.body;
                    for (let locData of multiLocData) {
                        expect(locData.title).to.contain(location.title);
                    }
                });
            }
        });
    })
});