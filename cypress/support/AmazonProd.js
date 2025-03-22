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

        cy.xpath(`//h2/span[contains(text(), '${product.description}')]`).then($elements => {
            // Check if we have at least 2 elements
            if ($elements.length >= 2) {
                cy.xpath(`//h2/span[contains(text(), '${product.description}')]`)
                    .eq(1) // This ensures we have a single element (the second one)
                    .scrollIntoView()
                    .should('be.visible')
                    .click({ force: true })
                    .then(() => {
                        cy.log('Clicked on the second element');
                    });
            } else {
                cy.log(`Found only ${$elements.length} elements, needed at least 2`);
            }
        });
    }

    SearchByUrl = (product = AmazonProduct) => {
        cy.visit(product.url);
    };

    AddToCart = () => {
        cy.get('body').then($body => {
            let buttonSelector;
            if ($body.find('#add-to-cart-button').length) {
                buttonSelector = '#add-to-cart-button';
            } else if ($body.find('input[name="submit.add-to-cart"]').length) {
                buttonSelector = 'input[name="submit.add-to-cart"]';
            }
            else {
                buttonSelector = 'span[id="submit.add-to-cart"]';
            }

            cy.get(buttonSelector).as('addToCartButton');
        });

        cy.get('@addToCartButton').scrollIntoView()
            .should('be.visible')
            .should('not.be.disabled')
            .then($button => {
                try {
                    cy.wrap($button).click({ force: true });
                } catch (e) {
                    cy.log('Regular click failed, trying alternative methods');

                    cy.wrap($button).then($el => {
                        $el[0].click();
                    });
                }
            });

        // Wait for confirmation
        cy.wait(1000);

        cy.get('body').then($body => {
            if ($body.find('#NATC_SMART_WAGON_CONF_MSG_SUCCESS').length) {
                cy.log('Successfully added to cart!');
            } else {
                // If we can't find a success message, wait longer and check again
                cy.wait(3000);
                cy.get('body').then($updatedBody => {
                    if ($updatedBody.find('#NATC_SMART_WAGON_CONF_MSG_SUCCESS').length
                    ) {
                        cy.log('Successfully added to cart after waiting!');
                    } else {
                        cy.log('Failed to add to cart even after waiting!');
                    }
                });
            }
        });
    };

    SelectColor(maxAttempts = 10) {
        cy.xpath("//span[contains(text(), 'Color:')]/following-sibling::span")
            .first()
            .should('exist')
            .invoke('text')
            .then(text => {
                const initialValue = text.trim();
                cy.log(`Initial color value: ${initialValue}`);
                cy.log(`Looking for color: ${this.color}`);

                // Check if the initial color already matches the desired color
                if (initialValue.includes(this.color)) {
                    cy.log(`Current color already matches the desired color: ${this.color}. Exiting.`);
                    // Don't do anything else
                } else {
                    // Focus on and click the color option to start
                    cy.get('#color_name_0').first().click();

                    // Use a recursive function to tab through elements
                    const tabAndCheck = (attempt) => {
                        // If we've exceeded max attempts, stop
                        if (attempt > maxAttempts) {
                            cy.log(`Exceeded maximum tab attempts (${maxAttempts}) without finding color: ${this.color}`);
                            return;
                        }

                        // Press tab to move to next element
                        cy.tab().then(() => {
                            // Get the focused element
                            cy.focused()
                                .should('exist')
                                .then($focusedElement => {
                                    // Log info about the current focused element
                                    cy.log(`Tab attempt ${attempt}`);

                                    // Trigger mouseover on the focused element
                                    cy.wrap($focusedElement).trigger('mouseover');
                                    cy.wrap($focusedElement).trigger('mouseenter');

                                    // Wait for any UI updates
                                    cy.wait(500);

                                    // Check if the color value changed to our expected color
                                    cy.xpath("//span[contains(text(), 'Color:')]/following-sibling::span")
                                        .first()
                                        .invoke('text')
                                        .then(newValue => {
                                            const trimmedNewValue = newValue.trim();
                                            cy.log(`Current color value: ${trimmedNewValue}`);

                                            // If we found our expected color
                                            if (trimmedNewValue.includes(this.color)) {
                                                cy.log(`Found expected color: ${this.color} after ${attempt} tab(s)`);

                                                // Click on the element that gave us the right color
                                                cy.focused().click();
                                                cy.wait(3000); // Wait for selection to complete
                                            } else {
                                                // Continue to the next element
                                                tabAndCheck(attempt + 1);
                                            }
                                        });
                                });
                        });
                    };

                    // Start the recursive tabbing process
                    tabAndCheck(1);
                }
            });

        // Return this outside of any callback to maintain proper chaining
        return this;
    }

}

export default AmazonProduct;