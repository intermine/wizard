describe("Alertbox Test", function(){
    it("Success alertbox test", function(){
        cy.visit("localhost:9992/dev")
        cy.wait(1000)

        // Warning alertbox check
        cy.get("[cy-id='warning']").click()
        cy.wait(1000)
        cy.get("#alertbox").should("have.class", "warning").then(($element) =>{
            cy.checkInViewPort($element[0], true)
        })
        // close the alertbox
        cy.get("#alertbox > .alert-close").click()
        cy.wait(1000)
        cy.get("#alertbox").then(($element) =>{
            cy.checkInViewPort($element[0], false)
        })
        
        // Error alertbox check
        cy.get("[cy-id='error']").click()
        cy.wait(1000)
        cy.get("#alertbox").should("have.class", "error").then(($element) =>{
            cy.checkInViewPort($element[0], true)
        })
        // close the alertbox
        cy.get("#alertbox > .alert-close").click()
        cy.wait(1000)
        cy.get("#alertbox").then(($element) =>{
            cy.checkInViewPort($element[0], false)
        })

        // Success alertbox check
        cy.get("[cy-id='success']").click()
        cy.wait(1000)
        cy.get("#alertbox").should("have.class", "success").then(($element) =>{
            cy.checkInViewPort($element[0], true)
        })
        // close the alertbox
        cy.get("#alertbox > .alert-close").click()
        cy.wait(1000)
        cy.get("#alertbox").then(($element) =>{
            cy.checkInViewPort($element[0], false)
        })

        // Info alertbox check
        cy.get("[cy-id='info']").click()
        cy.wait(1000)
        cy.get("#alertbox").should("have.class", "info").then(($element) =>{
            cy.checkInViewPort($element[0], true)
        })
        // close the alertbox
        cy.get("#alertbox > .alert-close").click()
        cy.wait(1000)
        cy.get("#alertbox").then(($element) =>{
            cy.checkInViewPort($element[0], false)
        })
    })
})