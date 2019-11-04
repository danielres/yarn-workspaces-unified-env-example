describe("login", () => {
  it("should successfully log into our app", () => {
    cy.login().then(({ body: { access_token } }) => {
      cy.visit(`http://localhost:1234/#access_token=${access_token}`);
      cy.get("[data-test-id=button-logout]").should("contain.text", "Logout");
      cy.get("[data-test-id=main]").should(
        "contain.text",
        "GraphQL response: Hello World"
      );
    });
  });
});
