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
describe("Registration Test " + i, function (){

  beforeEach(function(){
    cy.visit("localhost:9992/register");
  })


  // Check for successful registration
  it("Successful Registration", function(){
    /* 
    * feedRegistrationDetails command defined in support/commands.js
    * This command will fill the details in the registration form.
    */
    cy.feedRegistrationDetails(Object.assign({}, data, {confirm_password: data.password}));

    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "Account created successfully");
      
  })

  // Check if password not match
  it("Password not match", function(){
    cy.feedRegistrationDetails(Object.assign({}, data, {
      confirm_password: data.password + "wrong"   // Add wrong at the last of the original password. So that confirm password did not match with the original password
    }));
    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "Passwords do not match.");
  })

  // Check if email already exists
  it("Email Already Exists", function(){
    cy.feedRegistrationDetails(Object.assign({}, data, {confirm_password: data.password}));
    cy.get("#registerForm > .back")
      .click();
    cy.get("#alertbox").should("contain", "EMAIL ALREADY EXIST");
  })  
})
}
