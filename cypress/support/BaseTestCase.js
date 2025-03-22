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
        cy.log('Amazon.com homepage loaded');
    }

    /**
     * Login to Amazon.com
     */
    Login() {
        this.Start();

        // Use a more stable approach by directly clicking the account list instead of hovering
        cy.get('#nav-link-accountList', { timeout: 10000 }).click({ force: true });

        // If we're already at the login page, go directly to entering credentials
        cy.url().then(url => {
            if (url.includes('signin')) {
                cy.log('Already on the signin page');
            } else {
                // If we need to click the sign-in button
                cy.get('a[data-nav-role="signin"], .nav-action-signin-button', { timeout: 5000 })
                    .should('be.visible')
                    .click({ force: true });
            }
        });

        // Type email more reliably
        cy.get('#ap_email', { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(Cypress.env('email')); // Type email from environment variables

        // Click continue with force true to ensure it works
        cy.get('#continue').click();

        // Type password more reliably
        cy.get('#ap_password', { timeout: 10000 })
            .should('be.visible')
            .clear()
            .type(Cypress.env('password')); // Type password from environment variables

        // Click submit with force true
        cy.get('#signInSubmit').click({ force: true });

        // Wait for navigation to complete after login
        cy.wait(3000); // Allow time for the login to process

        // Verify successful login by checking for elements that appear only when logged in
        cy.get('#nav-link-accountList-nav-line-1', { timeout: 15000 })
            .should('be.visible')
            .should('not.contain', 'Sign in');

        cy.log('Login successful');
    };

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

    /**
     * Clean up after test by emptying the cart
     */
    CleanUpCart() {
        // Go to cart
        this.GoToCart();

        // Empty the cart
        this.EmptyShoppingCart();
    }

    /**
     * Empty the shopping cart
     */
    EmptyShoppingCart() {
        // Use a simple approach: look for items and delete the first one repeatedly
        const checkAndDeleteFirstItem = () => {
            cy.get('body').then($body => {
                // If cart has items
                if ($body.find('.sc-list-item').length > 0) {
                    // Try to find delete buttons
                    cy.get('body').then($body => {
                        // Check if delete button exists in the DOM
                        if ($body.find('input[data-action="delete"]').length > 0) {
                            // Use jQuery to check if button exists before attempting Cypress commands
                            cy.get('input[data-action="delete"]').first().click();
                            cy.wait(1000); // Wait for the deletion to take effect
                            // Check for more items
                            checkAndDeleteFirstItem();
                        } else {
                            cy.log('No more delete buttons found');
                        }
                    });
                } else {
                    // Verify cart is empty
                    cy.get('#nav-cart-count').should('contain', '0');
                    cy.log('Shopping cart is empty');
                }
            });
        };

        // Start the process
        checkAndDeleteFirstItem();

        return this;
    }

    /**
     * Navigate to the cart page
     */
    GoToCart() {
        cy.get('#nav-cart').click();
    }
}

export default AmazonTestBase;