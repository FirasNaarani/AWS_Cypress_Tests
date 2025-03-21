class AmazonTestBase {

    /**
     * Go to Amazon.com
     */
    Start() {
        cy.visit('/');

        function checkSearchBox(attempts = 0) {
            cy.get('body').then(($body) => {
                if (!$body.find('#twotabsearchtextbox').length && attempts < 3) {
                    cy.reload(); // Refresh the page
                    cy.wait(3000); // Wait before retrying
                    checkSearchBox(attempts + 1); // Retry
                } else {
                    cy.get('#twotabsearchtextbox', { timeout: 10000 }).should('be.visible');
                }
            });
        }

        checkSearchBox();
    }

    /**
     * Dismiss the Popup
     */
    DismissPopup = () => {
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
    };

    SetupCart() {
        // Visit Amazon homepage
        cy.visit('/');

        // Dismiss any popups
        this.dismissPopupIfExists();

        // Add first product to cart
        cy.log('Adding first product to cart');
        cy.visit(this.products.pencilSharpener.url);
        this.addItemToCart();

        // Add second product to cart
        cy.log('Adding second product to cart');
        cy.visit(this.products.stickyNotes.url);
        this.addItemToCart();

        // Verify two items are in the cart
        cy.get('#nav-cart-count').should('contain', '2');
    }

    /**
     * Clean up after test by emptying the cart
     */
    cleanupCart() {
        // Go to cart
        cy.get('#nav-cart').click();

        // Empty the cart
        this.emptyShoppingCart();

        // Verify cart is empty
        cy.get('#nav-cart-count').should('contain', '0');
    }

    /**
     * Dismiss popup if it exists on the page
     */
    dismissPopupIfExists() {
        cy.get('body').then($body => {
            if ($body.find('.glow-toaster[data-toaster-type="AIS_INGRESS"]').length > 0) {
                cy.get('.glow-toaster-button-dismiss input[data-action-type="DISMISS"]')
                    .should('exist')
                    .click({ force: true });

                cy.get('.glow-toaster[data-toaster-type="AIS_INGRESS"]').should('not.be.visible');
            }
        });
    }

    /**
     * Add current product to cart
     */
    addItemToCart() {
        cy.get('body').then($body => {
            if ($body.find('#add-to-cart-button').length) {
                cy.get('#add-to-cart-button').scrollIntoView().should('be.visible').click();
            } else {
                cy.contains('Add to Cart').scrollIntoView().should('be.visible').click();
            }
        });

        // Handle different confirmation screens
        cy.get('body').then($body => {
            // Option 1: "Added to Cart" confirmation
            if ($body.find('span:contains("Added to Cart")').length > 0) {
                cy.contains('Cart').click();
            }
            // Option 2: Side sheet confirmation
            else if ($body.find('#attach-sidesheet-view-cart-button').length > 0) {
                cy.get('#attach-sidesheet-view-cart-button').click();
            }
            // Option 3: Go to Cart button
            else if ($body.find('#sw-gtc').length > 0) {
                cy.get('#sw-gtc').click();
            }
            // Option 4: Continue shopping (click on Amazon logo)
            else {
                cy.get('#nav-logo-sprites').click();
            }
        });
    }

    /**
     * Empty the shopping cart
     */
    emptyShoppingCart() {
        // Check if cart is empty
        cy.get('body').then($body => {
            // If cart has items
            if ($body.find('.sc-list-item').length > 0) {
                // Select all items and delete
                cy.get('input[data-action="delete"]').each(($deleteButton) => {
                    cy.wrap($deleteButton).click();
                    cy.wait(500); // Wait for deletion to complete
                });
            }
        });
    }

    /**
     * Navigate to the cart page
     */
    goToCart() {
        cy.get('#nav-cart').click();
    }
}

// Export the base class
export default AmazonTestBase;