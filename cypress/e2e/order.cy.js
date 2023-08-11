describe("Application", () => {
	
	const USER_EMAIL = 'aleksey-burger2023@yandex.ru';
	const USER_PASSWORD = '12345678';

	it("make order", () => {
		cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
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
		)
		cy.get("[data-test='order-button']").click();
		cy.get("[data-test='email-field']").type(USER_EMAIL);
		cy.get("[data-test='password-field']").type(USER_PASSWORD);
		cy.get("[data-test='login-button']").click();
		cy.wait(2000);
		cy.get("[data-test='Флюоресцентная булка R2-D3']").trigger("dragstart");
		cy.get("[data-test='constructor-burgers'").trigger("drop");
		cy.get("[data-test='constructor-burger-top'] .constructor-element__text").should(
			"have.text",
			"Флюоресцентная булка R2-D3\n(верх)"
		);
		cy.get("[data-test='constructor-burger-bottom'] .constructor-element__text").should(
			"have.text",
			"Флюоресцентная булка R2-D3\n(низ)"
		)
		cy.get("[data-test='order-button']").click();
		cy.get("[data-test='order-count']").should("have.text",
			"99999"
		);
	});
})