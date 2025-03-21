import AmazonTestBase from "../../support/BaseTestCase.js";

describe('Task 2', () => {
    const BaseTestCase = new AmazonTestBase();

    beforeEach(() => {
        // Start the test by visiting Amazon
        BaseTestCase.Start();

        // Dismiss any popups
        BaseTestCase.DismissPopup();
    });

    it('should validate main menu and navigate to Customer Service', () => {
        const customerServiceText = 'Customer Service';
        const whereIsMyStuffText = 'Where\'s My Stuff?';

        // 2.2 Validate main menu items in the top navigation bar
        // Validate main menu items in the top navigation bar
        cy.get('#nav-xshop')
            .should('be.visible')
            .should('contain', customerServiceText);

        // 2.3 Navigate to Customer Service page using the direct link
        // We'll use the contains approach which is more resilient
        cy.contains(customerServiceText).click();

        // Verify we are on the Customer Service page
        cy.url().should('include', '/gp/help/customer/display.html');
        cy.get('body').should('contain', customerServiceText);

        // 2.4 Search for "where is my stuff"
        // The search box may have different IDs depending on the page
        cy.get('input[type="search"], .a-input-text').first()
            .should('be.visible')
            .type(whereIsMyStuffText + '{enter}');

        // Wait for search results to load by checking for the search results stats element
        cy.get('#help-result-stats', { timeout: 10000 })
            .should('be.visible')
            .should('contain', 'search results for');

        // Try clicking the element directly without the fallback logic
        cy.get('a.same_window')
            .contains(whereIsMyStuffText, { matchCase: false })
            .should('exist')
            .first()
            .click({ force: true });

        // Verify we're on a relevant page
        cy.url().should('include', '/gp/help/customer');

        // Check for any of the expected content using separate assertions
        cy.get('body').then(($body) => {
            const bodyText = $body.text();
            const hasWhereIsMyStuff = bodyText.includes(whereIsMyStuffText);

            // At least one of these should be true
            expect(hasWhereIsMyStuff).to.be.true;
        });
    });

});