import AmazonTestBase from "../../support/BaseTestCase.js";

describe('Task 1.2', () => {

    it('1 - User Authentication Test', () => {
        cy.log('Verify login functionality with valid and invalid credentials')
    });

    it('2 - Product Search Test', () => {
        cy.log('Verify search functionality returns relevant results');
    });

    it('3 - Shopping Cart Test', () => {
        cy.log('Verify add/remove items and cart persistence');
    });

    it('4 - Checkout Process Test', () => {
        cy.log('Verify complete checkout flow through payment');
    });

    it('5 - Product Filtering Test', () => {
        cy.log('Verify product filtering and sorting options work correctly');
    });

});

describe('Task 1.3', () => {
    const BaseTestCase = new AmazonTestBase();

    beforeEach(() => {
        // Start the test by visiting Amazon
        BaseTestCase.Start();

        // Dismiss any popups
        BaseTestCase.DismissPopup();
    });

    it('should return relevant results when searching for "iPhone"', () => {
        const searchTerm = 'iPhone';

        // Wait for search box to be fully loaded and visible
        cy.get('#twotabsearchtextbox').should('be.visible');

        // Clear any existing text and type search term
        cy.get('#twotabsearchtextbox').clear().type(searchTerm);

        // Click the search button instead of using Enter key
        cy.get('#nav-search-submit-button').click();

        // Wait for search results to load with an explicit assertion
        cy.get('.s-search-results', { timeout: 1000 }).should('be.visible');

        // Multiple verification checks:

        // 1. Verify search results container exists and has items
        cy.get('.s-main-slot').should('exist');
        cy.get('.s-main-slot').children('.s-result-item').should('have.length.greaterThan', 0);

        // 2. Verify URL contains search term
        cy.url().should('include', encodeURIComponent(searchTerm));

        // 3. Look for search term in results using appropriate selector
        // Use a more reliable approach that works across different result layouts
        cy.get('body').then($body => {
            // Option 1: Check for search term in title elements
            if ($body.find('.a-color-state.a-text-bold').length > 0) {
                cy.get('.a-color-state.a-text-bold').should('contain.text', searchTerm);
            }
            // Option 2: Check product titles if they exist
            else if ($body.find('.s-result-item h2').length > 0) {
                // Check at least one product title contains our search term (case insensitive)
                cy.get('.s-result-item h2').should($elements => {
                    // Convert NodeList to Array
                    const titles = Array.from($elements).map(el => el.textContent.toLowerCase());
                    // Some titles should contain our search term
                    const hasMatch = titles.some(title => title.includes(searchTerm.toLowerCase()));
                    expect(hasMatch).to.be.true;
                });
            }
            // Option 3: Look for search term in any product detail
            else {
                cy.get('.s-search-results').should('contain.text', searchTerm);
            }
        });

        // 4. Verify search results count is displayed
        cy.get('[data-component-type="s-result-info-bar"]').should('exist').should('contain.text', searchTerm);
    });
});
