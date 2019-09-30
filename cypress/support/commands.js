Cypress.Commands.add("feedRegistrationDetails", (obj)=>{
    cy.get("#register-email")
        .type(obj.email);
    cy.get("#register-first-name")
        .type(obj.first_name);
    cy.get("#register-last-name")
        .type(obj.last_name);
    cy.get("#register-organisation")
        .type(obj.organisation);
    cy.get("#register-password")
        .type(obj.password);
    cy.get("#register-password-confirm")
        .type(obj.confirm_password);
})

Cypress.Commands.add("feedLoginDetails", (obj) =>{
    cy.get("#signin-email")
        .type(obj.email);
    cy.get("#signin-password")
        .type(obj.password);
})