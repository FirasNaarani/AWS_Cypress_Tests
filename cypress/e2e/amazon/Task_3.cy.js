// // cypress/integration/amazon-shopping-cart.spec.js

// describe('Amazon Shopping Cart Tests', () => {
//     // Use these credentials for your test account

//     // Product URLs and details
//     const PENCIL_SHARPENER = {
//         name: 'Bostitch Office Personal Electric Pencil Sharpener',
//         fullName: 'Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Gray (EPS4-KTGRAY)',
//         searchTerm: 'Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Gray (EPS4-KTGRAY)'
//     };

//     const SCISSORS = {
//         name: 'iBayam Scissors',
//         url: 'https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z',
//         color: 'Red, Black, Blue'
//     };

//     const addToCart = () => {
//         cy.get('body').then($body => {
//             if ($body.find('#add-to-cart-button').length) {
//                 cy.get('#add-to-cart-button').scrollIntoView().should('be.visible').click();
//             } else {
//                 cy.contains('Add to Cart').scrollIntoView().should('be.visible').click();
//             }
//         });
//         cy.contains('Added to Cart', { timeout: 5000 }).should('exist');
//     };

//     const emptyCart = () => {
//         cy.visit('https://amazon.com/gp/cart/view.html');
//         cy.wait(2000);
//         cy.get('body').then($body => {
//             if ($body.find('input[value="Delete"]').length) {
//                 cy.get('input[value="Delete"]').click({ multiple: true, force: true });
//             }
//         });
//     };

//     before(() => {
//         cy.viewport(1280, 800);
//         cy.visit('https://www.amazon.com/gp/sign-in.html');
//         cy.get('#ap_email').type(EMAIL);
//         cy.get('#continue').click();
//         cy.get('#ap_password').type(PASSWORD, { log: false });
//         cy.get('#signInSubmit').click();
//     });

//     beforeEach(() => {
//         cy.visit('/');
//         cy.get('#twotabsearchtextbox').type(PENCIL_SHARPENER.searchTerm);
//         cy.get('input[value="Go"]').click();
//         cy.contains(PENCIL_SHARPENER.name, { timeout: 10000 })
//             .scrollIntoView()
//             .should('be.visible')
//             .click();
//         addToCart();

//         cy.visit(SCISSORS.url);
//         cy.contains(SCISSORS.color).scrollIntoView().should('be.visible').click();
//         cy.contains('Color:').parent().contains(SCISSORS.color).should('exist');
//         addToCart();

//         cy.contains('Cart').first().click();
//         cy.contains(PENCIL_SHARPENER.name).should('exist');
//         cy.contains(SCISSORS.name).should('exist');
//     });

//     afterEach(() => {
//         emptyCart();
//     });

//     it('Should verify free shipping eligibility after increasing quantity', () => {
//         cy.visit('/');
//         cy.contains('Deliver to').scrollIntoView().should('be.visible').click();
//         cy.wait(1000);
//         cy.contains('Israel').scrollIntoView().should('be.visible').click();
//         cy.contains('not eligible for FREE Shipping').should('exist');

//         cy.contains(PENCIL_SHARPENER.name)
//             .parents('[data-item-count]')
//             .within(() => {
//                 cy.get('select.quantity').scrollIntoView().should('be.visible').select('4');
//             });

//         cy.wait(3000);
//         cy.contains('Eligible for FREE Shipping').should('exist');
//     });

//     it('Should clear the cart', () => {
//         emptyCart();
//     });
// });

/////////////////////////////////

// describe('Amazon Shopping Cart Tests', () => {
//     // Common setup for all tests
//     beforeEach(() => {
//         // Visit Amazon homepage
//         cy.visit('https://amazon.com');

//         // Add first item to cart - Pencil Sharpener
//         cy.get('#twotabsearchtextbox').type('Bostitch Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Gray (EPS4-KTGRAY)');
//         cy.get('#nav-search-submit-button').click();
//         cy.contains('Bostitch Office Personal Electric Pencil Sharpener').click();
//         cy.get('#add-to-cart-button').click();
//         cy.contains('Added to Cart').should('be.visible');

//         // Add second item to cart - Scissors
//         cy.visit('https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z');
//         cy.get('[data-defaultasin="B07H3QKN2Z"]').should('be.visible');

//         // Select the "Red, Black, Blue" color option
//         cy.contains('Red, Black, Blue').click();
//         cy.contains('Color:').next().should('contain', 'Red, Black, Blue');

//         // Add scissors to cart
//         cy.get('#add-to-cart-button').click();
//         cy.contains('Added to Cart').should('be.visible');
//     });

//     // Cleanup after each test
//     afterEach(() => {
//         // Navigate to cart
//         cy.get('#nav-cart').click();

//         // Empty the cart - select all items and delete them
//         cy.get('input[data-action="delete"]').click({ multiple: true });

//         // Verify cart is empty
//         cy.contains('Your Amazon Cart is empty').should('be.visible');
//     });

//     it('should validate items in cart and confirm no free shipping', () => {
//         // Go to cart to validate items
//         cy.get('#nav-cart').click();

//         // Check that both products are in the cart
//         cy.contains('Bostitch Office Personal Electric Pencil Sharpener').should('be.visible');
//         cy.contains('iBayam Scissors').should('be.visible');

//         // Set shipping to Israel to check free shipping threshold
//         cy.contains('Deliver to').click();
//         cy.get('#GLUXCountryListDropdown').click();
//         cy.contains('Israel').click();
//         cy.get('#GLUXZipUpdateInput').type('12345');
//         cy.contains('Apply').click();

//         // Verify no free shipping available for current cart
//         cy.contains('FREE Shipping').should('not.exist');
//     });

//     it('should qualify for free shipping after adding more items', () => {
//         // Go to cart
//         cy.get('#nav-cart').click();

//         // Find the pencil sharpener item
//         cy.contains('Bostitch Office Personal Electric Pencil Sharpener')
//             .parents('.sc-list-item')
//             .within(() => {
//                 // Update quantity to 4 (original + 3 more)
//                 cy.get('.quantity').select('4');
//             });

//         // Wait for cart to update
//         cy.contains('Cart updated').should('be.visible');

//         // Set shipping to Israel to check free shipping threshold
//         cy.contains('Deliver to').click();
//         cy.get('#GLUXCountryListDropdown').click();
//         cy.contains('Israel').click();
//         cy.get('#GLUXZipUpdateInput').type('12345');
//         cy.contains('Apply').click();

//         // Verify free shipping is now available
//         cy.contains('FREE Shipping').should('be.visible');
//     });

//     it('should allow a user to log in and clear the cart', () => {
//         // Navigate to login page
//         cy.contains('Sign in').click();

//         // Fill in login credentials
//         cy.get('#ap_email').type('your_test_email@example.com');
//         cy.get('#continue').click();
//         cy.get('#ap_password').type('your_test_password');
//         cy.get('#signInSubmit').click();

//         // Verify login was successful
//         cy.get('#nav-link-accountList-nav-line-1').should('contain', 'Hello');

//         // Go to cart
//         cy.get('#nav-cart').click();

//         // Verify both items are in cart before clearing
//         cy.contains('Bostitch Office Personal Electric Pencil Sharpener').should('be.visible');
//         cy.contains('iBayam Scissors').should('be.visible');

//         // Empty the cart - select all items and delete them
//         cy.get('input[data-action="delete"]').click({ multiple: true });

//         // Verify cart is empty
//         cy.contains('Your Amazon Cart is empty').should('be.visible');
//     });
// });

////////////////////////////////

describe('Amazon Shopping Cart Test Suite', () => {
    beforeEach(() => {
        cy.visit('https://www.amazon.com');

        // Search and add the first item to cart
        cy.get('#twotabsearchtextbox').type('Bostitch Office Personal Electric Pencil Sharpener{enter}');
        cy.contains('Bostitch Office Personal Electric Pencil Sharpener').click();
        cy.get('#add-to-cart-button').click();
        cy.contains('Added to Cart').should('be.visible');

        // Search and add the second item to cart
        cy.visit('https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z');
        cy.get('#variation_color_name').contains('Red, Black, Blue').click();
        cy.get('#add-to-cart-button').click();
        cy.contains('Added to Cart').should('be.visible');

        // Open cart and verify items are present
        cy.get('#nav-cart').click();
        cy.contains('Bostitch Office Personal Electric Pencil Sharpener').should('be.visible');
        cy.contains('Scissors iBayam Crafting Scrapbooking Knitting').should('be.visible');
    });

    it('Verifies Free Shipping Eligibility Based on Quantity', () => {
        // Set country to Israel (simulate shipping settings)
        cy.get('#nav-global-location-popover-link').click();
        cy.get('#GLUXCountryList').select('Israel');
        cy.get('#GLUXConfirmClose').click();
        cy.reload();

        // Confirm no free shipping initially
        cy.get('.sc-subtotal').should('contain', 'You do not qualify for free shipping');

        // Increase quantity of sharpeners to 3 more (total 4)
        cy.get('input[name="quantityBox"]').clear().type('4{enter}');
        cy.wait(2000); // Wait for cart to update

        // Confirm free shipping eligibility
        cy.get('.sc-subtotal').should('contain', 'You qualify for free shipping');
    });

    afterEach(() => {
        // Clear the cart
        cy.get('#nav-cart').click();
        cy.get('[value="Delete"]').each(($el) => {
            cy.wrap($el).click();
            cy.wait(1000); // Ensure each item is removed
        });

        // Verify cart is empty
        cy.contains('Your Amazon Cart is empty').should('be.visible');
    });
});
