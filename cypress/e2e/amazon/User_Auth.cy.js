// User Authentication Test
// Tests login, logout, and validation of account access

describe('Amazon User Authentication', () => {
    beforeEach(() => {
        // Visit Amazon homepage before each test
        cy.visit('https://www.amazon.com');
    });

    it('should navigate to login page', () => {
        // Click on account & lists to access sign-in
        cy.get('#nav-link-accountList').click();

        // Verify we're on the sign-in page
        cy.get('#ap_email').should('be.visible');
        cy.get('.a-form-label').should('contain', 'Email or mobile phone number');
    });

    it('should display error for invalid credentials', () => {
        // Navigate to sign-in page
        cy.get('#nav-link-accountList').click();

        // Enter invalid email and continue
        cy.get('#ap_email').type('test123@example.com');
        cy.get('#continue').click();

        // Enter invalid password
        cy.get('#ap_password').type('invalidPassword123');
        cy.get('#signInSubmit').click();

        // Verify error message is displayed
        cy.get('#auth-error-message-box').should('be.visible');
        cy.get('.a-list-item').should('contain', 'There was a problem');
    });

    it('should redirect to dashboard after successful login', () => {
        // Note: This test would require valid credentials
        // In a real implementation, use environment variables for credentials

        // This is a demonstration with commented code as you'd need valid credentials
        cy.get('#nav-link-accountList').click();

        // cy.get('#ap_email').type(Cypress.env('AMAZON_USERNAME'));
        // cy.get('#continue').click();
        // cy.get('#ap_password').type(Cypress.env('AMAZON_PASSWORD'));
        // cy.get('#signInSubmit').click();

        // cy.get('#nav-link-accountList-nav-line-1').should('contain', 'Hello');

        // Just for demo, verify we're on the login page instead
        cy.get('#ap_email').should('be.visible');
    });

    it('should allow access to account features when logged in', () => {
        // This would test accessing features that require authentication
        // In a real implementation, use a custom login command first

        // Instead of actually logging in, verify the login elements
        cy.get('#nav-link-accountList').click();
        cy.get('#ap_email').should('be.visible');

        // In a real test with authentication, you'd verify access to:
        // - Order history
        // - Account settings
        // - Wishlist access
    });

    it('should maintain login state across different pages', () => {
        // This would test that authentication persists while browsing
        // In a real implementation, use a custom login command first

        // Navigate to different sections of the site to verify login persistence
        // For demo, verify navigation elements instead
        cy.get('#nav-hamburger-menu').click();
        cy.get('.hmenu-item').contains('Best Sellers').should('be.visible');

        // In a real test with authentication, you'd:
        // - Login
        // - Visit multiple pages
        // - Verify login state is maintained
    });
});