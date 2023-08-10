describe("Application", () => {
	
	it("should drag and drop ingredient", () => {
		cy.visit('http://localhost:3000/');
		cy.get("[data-test='Краторная булка N-200i']").click()
		cy.get("[data-test='modal-title']").should("have.text",
			"Детали ингредиента"
		);
		// cy.get("[data-test='modal-close']").click()
	});
	
})