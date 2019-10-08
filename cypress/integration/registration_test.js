describe("Registration Test", function (){
  
  // before(function(){
  //   cy.fixture("registration/successful.json").as("success");
  //   cy.fixture("registration/wrong_password.json").as("wrong");
  //   cy.fixture("registration/email_already_exist.json").as("exist");
  // })

  beforeEach(function(){
    cy.visit("localhost:9992/register");
  })


  // Check for successful registration
  it("Successful Registration", function(){
    /* 
    * feedRegistrationDetails command defined in support/commands.js
    * This command will fill the details in the registration form.
    */
   cy.fixture("registration/successful.json").then(function(obj){
     cy.feedRegistrationDetails(obj);
   });

    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "Account created successfully.");
      
  })

  // Check if password not match
  it("Password not match", function(){
    cy.fixture("registration/wrong_password.json").then(function(obj){
      cy.feedRegistrationDetails(obj);
    });

    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "Passwords do not match.");
  })

  // Check if email already exists
  it("Email Already Exists", function(){
    cy.fixture("registration/email_already_exist.json").then(function(obj){
      cy.feedRegistrationDetails(obj);
    });
    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "EMAIL ALREADY EXIST");
  })  
})

