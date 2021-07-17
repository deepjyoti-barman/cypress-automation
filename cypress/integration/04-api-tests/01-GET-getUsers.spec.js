/// <reference types="cypress" />

// URL to get the APIs for Testing: https://reqres.in/
describe('Test suite to automate GET API calls', () => {

    const baseUrl = 'https://reqres.in/api';

    it('TC_001: Get all users', () => {
        cy.request({
            // The default method for Cypress is GET.
            method: 'GET',
            url: baseUrl + '/users?page=2',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json; charset=utf-8'
            }   
        }).then((response) => {
            // Tip: Once Cypress completes running your test in the browser, open developer console and click on request, assert step to have a much deeper understanding of the response you are getting, which can be very helpful for debugging
            expect(response.body).not.to.be.null;
            expect(response.headers).to.have.property('content-type', 'application/json; charset=utf-8');
            expect(response.headers.server).to.equal('cloudflare');
            expect(response.status).equal(200);
            expect(response.body.data).to.have.lengthOf(6);
            expect(response.body.total).to.eql(12);
            
            // [Algorithm-1]: Validate if a key value pair (i.e. "first_name": "Rachel") is present in the 'data' json array of the response or not
            // let isAvailable = false;
            // for (let key in response.body.data) {
            //     if (response.body.data[key].first_name ==='Rachel') {
            //         isAvailable = true;
            //         break;
            //     }
            // }
            // (isAvailable) ? expect(true).be.true : expect(false).be.true;

            // [Algorithm-2]: Validate if a key value pair (i.e. "first_name": "Rachel") is present in the 'data' json array of the response or not
            for (let key in response.body.data) {
                if (response.body.data[key].first_name !== 'Rachel') {
                    if (key == response.body.data.length - 1)
                        expect(false).to.be.true;
                } else {
                    expect(true).to.be.true;
                    break;
                }
            }
        });
    });

    it('TC_002: Get all users by id', () => {
        cy.request({
            method: 'GET',
            url: baseUrl + '/users/2',
            headers: {
                'accept': 'application/json, text/plain, */*',
                'content-type': 'application/json; charset=utf-8'
            }
        }).then((response) => {
            expect(response.requestHeaders).to.have.property('content-type');
            expect(response.statusText).to.eq('OK');
            expect(response.body).not.to.be.empty;

            // Other ways to implement the same validation
            // expect(response.duration).to.be.lt(500);
            // expect(response.duration).to.be.lte(500);
            expect(response.duration).to.be.lessThan(1000);
            expect(response.body.data.id).to.be.a('number');
            expect(response.body.data.first_name).to.be.a('string');
            
            // Other ways to implement the same validation
            // expect(JSON.stringify(response.body)).to.include('Weaver');
            // expect(JSON.stringify(response.body)).to.includes('Weaver');
            // expect(JSON.stringify(response.body)).to.contain('Weaver');
            // expect(JSON.stringify(response.body)).to.contains('Weaver');
            // expect(JSON.stringify(response.body)).to.match(/Weaver/);
            expect(JSON.stringify(response.body)).to.have.string('Weaver');
            expect(response.body).to.deep.equal({
                "data": {
                    "id": 2,
                    "email": "janet.weaver@reqres.in",
                    "first_name": "Janet",
                    "last_name": "Weaver",
                    "avatar": "https://reqres.in/img/faces/2-image.jpg"
                },
                "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                }
            });
        });
    });
});