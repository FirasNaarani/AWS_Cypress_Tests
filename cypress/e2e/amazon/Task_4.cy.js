import AmazonProduct from "../../support/AmazonProd.js";
import AmazonTestBase from "../../support/BaseTestCase.js";

describe('Amazon Shopping Cart Tests', () => {

    const BaseTestCase = new AmazonTestBase();

    const PENCIL_SHARPENER = new AmazonProduct(
        'Bostitch',
        'Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Gray (EPS4-KTGRAY)',
        'Gray',
        null
    );

    const SCISSORS = new AmazonProduct(
        'iBayam Scissors',
        'Scissors, iBayam 8" All Purpose Scissors Bulk 3-Pack, Ultra Sharp 2.5mm Thick Blade Shears Comfort-Grip for Office Desk Accessories Sewing Fabric Home Craft Teacher School Supplies, Right/Left Handed',
        'Red, Black, Blue',
        'https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z'
    );



    beforeEach(() => {
        // Start the test by visiting Amazon
        BaseTestCase.Start();

        // Dismiss any popups
        BaseTestCase.DismissPopup();

        // Add pencil sharpener to cart
        PENCIL_SHARPENER.SearchByName(PENCIL_SHARPENER);
        PENCIL_SHARPENER.AddToCart();

        // Add scissors to cart
        SCISSORS.SearchByUrl(SCISSORS);
        SCISSORS.AddToCart();

        // Use our standalone function to find products with specific text
        // Alternatively, you can also click on a product and add it to cart using the class methods
        // cy.contains('h2', 'Bostitch').click();
        // PENCIL_SHARPENER.addToCart();

    });

    it('should', () => {
    });
    // afterEach(() => {
    //     emptyCart();
    // });
});