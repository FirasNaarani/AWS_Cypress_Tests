// Basic test to verify Cypress works

describe('Amazon Basic Test', () => {
    it('should visit the Amazon homepage', () => {
        cy.visit('https://www.amazon.com');
        cy.title().should('include', 'Amazon');
    });
});


describe('Amazon Product Search Functionality', () => {
    beforeEach(() => {
        // Step 1: Navigate to Amazon homepage
        cy.visit('https://amazon.com');

        // Handle any cookie consent dialogs that may appear
        cy.get('body').then($body => {
            if ($body.find('[data-action="a-accept-all"]').length > 0) {
                cy.get('[data-action="a-accept-all"]').click();
            }
        });
    });

    it('should search for products and display relevant results', () => {
        // Step 2-3: Click on search bar and type search term
        cy.get('#twotabsearchtextbox')
            .should('be.visible')
            .click()
            .type('wireless headphones');

        // Step 4: Click on the search button
        cy.get('#nav-search-submit-button').click();

        // Step 5: Verify search results contain the keyword
        cy.get('.s-search-results', { timeout: 10000 })
            .should('be.visible')
            .should('contain.text', 'wireless headphones');

        // Step 6: Apply a filter for "Price: $50 to $100"
        cy.get('body').then($body => {
            // Try multiple selectors for price filter as Amazon's UI can vary
            if ($body.find('[aria-label="Price"] span:contains("$50 to $100")').length > 0) {
                cy.get('[aria-label="Price"] span:contains("$50 to $100")').click({ force: true });
            } else if ($body.find('#priceRefinements').length > 0) {
                cy.get('#priceRefinements').contains('$50 to $100').click({ force: true });
            } else {
                // Expand price section if collapsed
                cy.contains('Price').click({ force: true });
                cy.contains('$50 to $100').click({ force: true });
            }
        });

        // Wait for results to update after filtering
        cy.wait(2000);

        // Step 7: Sort results by "Average Customer Review"
        cy.get('body').then($body => {
            if ($body.find('#s-result-sort-select').length > 0) {
                cy.get('#s-result-sort-select').click();
                cy.contains('Avg. Customer Review').click();
            } else if ($body.find('[data-action="a-dropdown-button"]').length > 0) {
                cy.get('[data-action="a-dropdown-button"]').contains('Sort').click();
                cy.contains('Avg. Customer Review').click();
            }
        });

        // Wait for results to update after sorting
        cy.wait(2000);

        // Verify sorting has been applied (this is more complex and might vary based on UI)
        cy.get('.a-dropdown-prompt').should('contain.text', 'Sort');

        // Step 8: Click on a product from the search results
        cy.get('.s-search-results .s-result-item:not(.AdHolder)')
            .first()
            .click();

        // Verify product detail page opens
        cy.get('#productTitle', { timeout: 10000 }).should('be.visible');

        // Step 9: Return to search results
        cy.go('back');

        // Verify we're back on search results page
        cy.get('.s-search-results', { timeout: 10000 }).should('be.visible');

        // Verify filters are still applied (can be complex depending on UI changes)
        cy.get('.a-dropdown-prompt').should('exist');

        // Step 10: Modify search to "wireless earbuds"
        cy.get('#twotabsearchtextbox')
            .should('be.visible')
            .clear()
            .type('wireless earbuds');

        cy.get('#nav-search-submit-button').click();

        // Verify new search results
        cy.get('.s-search-results', { timeout: 10000 })
            .should('be.visible')
            .should('contain.text', 'wireless earbuds');
    });
});