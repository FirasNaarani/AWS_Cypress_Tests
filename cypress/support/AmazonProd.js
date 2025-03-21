class AmazonProduct {
    constructor(title, description, color, url) {
        this.title = String(title);
        this.description = String(description);
        this.color = String(color);
        this.url = String(url);
    }

    SearchByName(product = AmazonProduct) {
        cy.get('#twotabsearchtextbox').type(`${product.title} ${product.description}`);
        cy.get('input[value="Go"]').click();

        cy.xpath(`//h2/span[contains(text(), '${product.description}')]`).each(($el) => {
            // Check if the element is visible and enabled (clickable)
            cy.wrap($el).should('be.visible').and('not.be.disabled').then(($element) => {
                // If it's clickable, click it
                cy.wrap($element).click();
                cy.log('Clicked on a clickable element');
            });
        });
    }

    SearchByUrl = (product = AmazonProduct) => {
        cy.visit(product.url);
    };

    AddToCart = () => {
        cy.get('body').then($body => {
            if ($body.find('#add-to-cart-button').length) {
                cy.get('#add-to-cart-button').scrollIntoView().should('be.visible').click();
            } else {
                cy.contains('Add to Cart').scrollIntoView().should('be.visible').click();
            }
        });
        cy.contains('Added to cart', { timeout: 5000 }).should('exist');
    };
}

export default AmazonProduct;