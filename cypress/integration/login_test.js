describe("Login Test", function(){
    beforeEach(function(){
        
        // Creating alias of fixture/login.json
        cy.fixture("login.json").as("log");
        cy.visit("localhost:9992/register");
    })

    // Check for successfull registration
    it("Successful Login", function(){
        /* 
        * feedLoginDetails command defined in support/commands.js
        * This command will fill the details in the login form.
        */
        cy.feedLoginDetails(this.log)
        cy.get("#signinForm > .back")
            .click();
        cy.location('pathname').should('eq', '/wizard/upload');
    })
})