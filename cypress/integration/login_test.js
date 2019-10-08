describe("Login Test", function(){
    before(function(){
        // First we have to seed the database with one user details
        // After the we are able to perform successful login test.
        cy.visit("localhost:9992/register");
        cy.fixture("login/register_user.json").then(function(obj){
            cy.feedRegistrationDetails(obj);
        });

        cy.get("#registerForm > .back")
            .click();
    })

    beforeEach(function(){
        cy.visit("localhost:9992/register");
    })

    // Check for successful login
    it("Successful Login", function(){
        /* 
        * feedLoginDetails command defined in support/commands.js
        * This command will fill the details in the login form.
        */
        cy.fixture("login/success.json").then(function(obj){
            cy.feedLoginDetails(obj)
        });

        cy.get("#signinForm > .back")
            .click();
        cy.location('pathname').should('eq', '/wizard/upload');

        // After login we have to logout
        cy.visit("http://localhost:9992/users/profile")
        cy.get("#logout").click()
        cy.location('pathname').should('eq', '/register');
    })

    // Check for unsuccessful login
    it("Successful Login", function(){
        cy.fixture("login/failure.json").then(function(obj){
            cy.feedLoginDetails(obj)
        });

        cy.get("#signinForm > .back")
            .click();
        cy.get("#alertbox").should("contain", "Wrong credentials");
    })

})