describe("login", () => {
  it("should successfully log into our app", () => {
    cy.login().then(({ body: { access_token } }) => {
      const port = Cypress.env("UI_DEV_SERVER_PORT");
      const url = `http://localhost:${port}/#access_token=${access_token}`;

      cy.visit(url);
      cy.get("[data-test-id=button-logout]").should("contain.text", "Logout");
      cy.get("[data-test-id=main]").should(
        "contain.text",
        "GraphQL response: Hello World"
      );
    });
  });
});
