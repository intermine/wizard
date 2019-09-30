describe("Registration Test", function (){

    beforeEach(function(){
        
        // Creating alias of fixture/registration.json
        cy.fixture("registration.json").as("reg");
        cy.visit("localhost:9992/register");
    })

    // Check for successfull registration
    it("Successful Registration", function(){
        /* 
        * feedRegistrationDetails command defined in support/commands.js
        * This command will fill the details in the registration form.
        */
        cy.feedRegistrationDetails(this.reg)
        cy.get("#registerForm > .back")
            .click();
        cy.get("#alertbox")
            .should("have.text", "Account created successfully.")
    })

    // Check if password not match
    it("Password not match", function(){
        this.reg.password = this.reg.wrong_password
        cy.feedRegistrationDetails(this.reg)
        cy.get("#registerForm > .back")
            .click();
        cy.get("#registerFormAlert")
            .should("have.text", "Passwords do not match.")
    })

    // Check if email already exists
    it("Email Already Exists", function(){
        cy.feedRegistrationDetails(this.reg)
        cy.get("#registerForm > .back")
            .click();
        cy.get("#registerFormAlert")
            .should("have.text", "EMAIL ALREADY EXIST")
    })
    
})