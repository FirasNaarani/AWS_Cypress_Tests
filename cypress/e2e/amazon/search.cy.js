
describe('Amazon Search Functionality Test', () => {
    beforeEach(() => {
        cy.visit('/', { timeout: 30000 });

        cy.get('body').then($body => {
            // Check if the international shipping popup exists
            if ($body.find('.glow-toaster[data-toaster-type="AIS_INGRESS"]').length > 0) {
                // Click the Dismiss button
                cy.get('.glow-toaster-button-dismiss input[data-action-type="DISMISS"]')
                    .should('exist')
                    .click({ force: true });

                // Wait for the popup to disappear
                cy.get('.glow-toaster[data-toaster-type="AIS_INGRESS"]').should('not.be.visible');
            }
        });
    });

    it('should return relevant results when searching for "iPhone"', () => {

        // Define search term as a constant for easy reuse
        const searchTerm = 'iPhone';

        // Wait for search box to be fully loaded and visible
        cy.get('#twotabsearchtextbox').should('be.visible');

        // Clear any existing text and type search term
        cy.get('#twotabsearchtextbox').clear().type(searchTerm);

        // Click the search button instead of using Enter key
        // This is more reliable across different browsers and environments
        cy.get('#nav-search-submit-button').click();

        // Wait for search results to load with an explicit assertion
        // This is better than a hardcoded wait time
        cy.get('.s-search-results', { timeout: 10000 }).should('be.visible');

        // Multiple verification checks:

        // 1. Verify search results container exists and has items
        cy.get('.s-main-slot').should('exist');
        cy.get('.s-main-slot').children('.s-result-item').should('have.length.greaterThan', 0);

        // 2. Verify URL contains search term
        cy.url().should('include', encodeURIComponent(searchTerm));

        // 3. Look for search term in results using appropriate selector
        // Use a more reliable approach that works across different result layouts
        cy.get('body').then($body => {
            // Opt 1: Check for search term in title elements
            if ($body.find('.a-color-state.a-text-bold').length > 0) {
                cy.get('.a-color-state.a-text-bold').should('contain.text', searchTerm);
            }
            // Opt 2: Check product titles if they exist
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
            // Opt 3: Look for search term in any product detail
            else {
                cy.get('.s-search-results').should('contain.text', searchTerm);
            }
        });

        // 4. Verify search results count is displayed
        cy.get('[data-component-type="s-result-info-bar"]').should('exist');
    });
});