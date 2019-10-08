describe("Alertbox Test", function(){
    it("Success alertbox test", function(){
        cy.viewport(1024, 768)
        cy.visit("localhost:3000/dev")
        cy.wait(1000)
        cy.get("#warning_alertbox").click()
        cy.wait(1000)
        cy.get("#alertbox").then(($element) =>{
            const width = Cypress.$(cy.state('window')).width()
            const alertbox_dimension = $element[0].getBoundingClientRect()

            cy.log(width, alertbox_dimension.width, alertbox_dimension.left)
            expect(alertbox_dimension.left).not.to.be.greaterThan(width - alertbox_dimension.width)
        })
    })
})