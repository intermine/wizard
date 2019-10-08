describe("Logout Test", function(){
    before(function(){
        // First we have to seed the database with one user details
        // After the we are able to perform successful login.
        cy.visit("localhost:9992/register");
        cy.fixture("logout/register_user.json").then(function(obj){
            cy.feedRegistrationDetails(obj);
        });

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
        cy.fixture("logout/login.json").then(function(obj){
            cy.feedLoginDetails(obj)
        });

        cy.get("#signinForm > .back")
            .click();
        cy.location('pathname').should('eq', '/wizard/upload');

        // After login we test for logout
        cy.visit("http://localhost:9992/users/profile")
        cy.get("#logout").click()
        cy.location('pathname').should('eq', '/register');
    })
})