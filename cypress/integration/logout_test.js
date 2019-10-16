const faker = require('faker/locale/en');

// Runnig test 5 times
for ( let i = 1; i <= 5; i++){
/*
* Random login and registration data
* generated using faker
*/
const data = {
email: faker.internet.email(),
first_name: faker.name.firstName(),
last_name: faker.name.lastName(),
organisation: faker.company.companyName(),
password: faker.internet.password()
}    

describe("Logout Test " + i, function(){
    before(function(){
        // First we have to seed the database with one user details
        // After the we are able to perform successful login.
        cy.visit("localhost:9992/register");
        cy.feedRegistrationDetails(Object.assign({}, data, {confirm_password: data.password}));
        cy.get("#registerForm > .back")
            .click();
    })

    beforeEach(function(){
        cy.visit("localhost:9992/register");
    })

    // Check for logout
    it("Logout test", function(){
        /* 
        * feedLoginDetails command defined in support/commands.js
        * This command will fill the details in the login form.
        */
        cy.feedLoginDetails(data)

        cy.get("#signinForm > .back")
            .click();
        cy.location('pathname').should('eq', '/wizard/upload');

        // After login we test for logout
        cy.visit("http://localhost:9992/users/profile")
        cy.get("#logout").click()
        cy.location('pathname').should('eq', '/register');
    })
})
}