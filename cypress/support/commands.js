// fill registration fields
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

// fill login fields
Cypress.Commands.add("feedLoginDetails", (obj) =>{
    cy.get("#signin-email")
        .type(obj.email);
    cy.get("#signin-password")
        .type(obj.password);
})

// check alertbox is in viewport or not
Cypress.Commands.add("checkInViewPort", (element, inViewPort)=>{
    const width = Cypress.$(cy.state('window')).width()
    const alertbox_dimension = element.getBoundingClientRect()

    // true means check if alertbox is in viewport
    if(inViewPort === true){
        // Alertbox left is the start point. If alertbox is in the viewport
        // then the value of alertbox left is not greater than innerHTML width - alertbox width.
        expect(alertbox_dimension.left).not.to.be.greaterThan(width - alertbox_dimension.width)
    } else {
        // false means check if alertbox is not in viewport
        expect(alertbox_dimension.left).to.be.greaterThan(width - alertbox_dimension.width)
    }
})
