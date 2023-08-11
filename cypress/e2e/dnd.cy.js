describe("Application", () => {
	
	it("should open modal and close", () => {
		cy.visit('http://localhost:3000/');
		cy.get("[data-test='Краторная булка N-200i']").click()
		cy.get("[data-test='modal-title']").should("have.text",
			"Детали ингредиента"
		);
		cy.get("[data-test='modal-close']").click()
	});
	
	it("should drag and drop ingredient", () => {
		cy.visit('http://localhost:3000/');
		cy.get("[data-test='Флюоресцентная булка R2-D3']").trigger("dragstart");
		cy.get("[data-test='constructor-burgers'").trigger("drop");
		cy.get("[data-test='constructor-burger-top'] .constructor-element__text").should(
			"have.text",
			"Флюоресцентная булка R2-D3\n(верх)"
		);
		cy.get("[data-test='constructor-burger-bottom'] .constructor-element__text").should(
			"have.text",
			"Флюоресцентная булка R2-D3\n(низ)"
		);
	});
	
	it('modal close on overlay click', () => {
		cy.visit('http://localhost:3000/');
		cy.get("[data-test='Краторная булка N-200i']").click()
		cy.get("[data-test='overlay']").should('exist');
		cy.get("[data-test='overlay']").click('left', { force: true })
		cy.get("[data-test='overlay']").should('not.exist');
	});
	
})