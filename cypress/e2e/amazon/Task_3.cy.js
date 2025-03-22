import AmazonProduct from "../../support/AmazonProd.js";
import AmazonTestBase from "../../support/BaseTestCase.js";

describe('Amazon Shopping Cart Tests', () => {

    const BaseTestCase = new AmazonTestBase();

    const PENCIL_SHARPENER = new AmazonProduct(
        'Bostitch',
        'Office Personal Electric Pencil Sharpener, Powerful Stall-Free Motor, High Capacity Shavings Tray, Gray (EPS4-KTGRAY)',
        'Gray',
        'https://a.co/d/2WAHre0'
    );

    const SCISSORS = new AmazonProduct(
        'iBayam Scissors',
        'Scissors, iBayam 8" All Purpose Scissors Bulk 3-Pack, Ultra Sharp 2.5mm Thick Blade Shears Comfort-Grip for Office Desk Accessories Sewing Fabric Home Craft Teacher School Supplies, Right/Left Handed',
        'Red, Black, Blue',
        'https://www.amazon.com/Scissors-iBayam-Crafting-Scrapbooking-Knitting/dp/B07H3QKN2Z'
    );

    const PENCIL_SHARPENER_PENCIL_1 = new AmazonProduct(
        'Bostitch',
        'Personal Electric Pencil Sharpener, Electrical Automatic Powerful Motor for Fast Sharpening, Compact Electric Sharpener, Includes Sharpening Tray & Safety Switch for Home, School, Office.',
        'Silver',
        'https://a.co/d/i8JAmTG'
    )

    const PENCIL_SHARPENER_PENCIL_2 = new AmazonProduct(
        'Bostitch',
        'Office Vertical Electric Pencil Sharpener, Powerful Stall-Free Motor, Prevents Over-Sharpening, Black (EPS5V-BLK)',
        'Black',
        'https://a.co/d/1XVByGL'
    )

    const PENCIL_SHARPENER_PENCIL_3 = new AmazonProduct(
        'Bostitch',
        'Office Vertical Electric Pencil Sharpener, Powerful Stall-Free Motor, Prevents Over-Sharpening, Blue (EPS5V-Blue)',
        'Blue',
        'https://a.co/d/26O8qII'
    )


    beforeEach(() => {
        // Start the test by visiting Amazon
        BaseTestCase.Start();

        // Dismiss any popups
        BaseTestCase.DismissPopup();

        // Add pencil sharpener to cart
        PENCIL_SHARPENER.SearchByName(PENCIL_SHARPENER);
        PENCIL_SHARPENER.SelectColor();
        PENCIL_SHARPENER.AddToCart();

        // Add scissors to cart
        SCISSORS.SearchByUrl(SCISSORS);
        SCISSORS.SelectColor();
        SCISSORS.AddToCart();
    });

    it('Should have all items in cart', () => {
        cy.log('Adds Pencil Sharpener 1');
        PENCIL_SHARPENER_PENCIL_1.SearchByUrl(PENCIL_SHARPENER_PENCIL_1);
        PENCIL_SHARPENER_PENCIL_1.SelectColor();
        PENCIL_SHARPENER_PENCIL_1.AddToCart();

        cy.log('Adds Pencil Sharpener 2');
        PENCIL_SHARPENER_PENCIL_2.SearchByUrl(PENCIL_SHARPENER_PENCIL_2);
        PENCIL_SHARPENER_PENCIL_2.SelectColor();
        PENCIL_SHARPENER_PENCIL_2.AddToCart();

        cy.log('Adds Pencil Sharpener 3');
        PENCIL_SHARPENER_PENCIL_3.SearchByUrl(PENCIL_SHARPENER_PENCIL_3);
        PENCIL_SHARPENER_PENCIL_3.SelectColor();
        PENCIL_SHARPENER_PENCIL_3.AddToCart();
    });

    it('Adds PENCIL_SHARPENER_1', () => {
        PENCIL_SHARPENER_PENCIL_1.SearchByName(PENCIL_SHARPENER_PENCIL_1);
        PENCIL_SHARPENER_PENCIL_1.SelectColor();
        PENCIL_SHARPENER_PENCIL_1.AddToCart();
    });

    it('Adds PENCIL_SHARPENER_2', () => {
        PENCIL_SHARPENER_PENCIL_2.SearchByName(PENCIL_SHARPENER_PENCIL_2);
        PENCIL_SHARPENER_PENCIL_2.SelectColor();
        PENCIL_SHARPENER_PENCIL_2.AddToCart();
    });

    it('Adds PENCIL_SHARPENER_3', () => {
        PENCIL_SHARPENER_PENCIL_3.SearchByName(PENCIL_SHARPENER_PENCIL_3);
        PENCIL_SHARPENER_PENCIL_3.SelectColor();
        PENCIL_SHARPENER_PENCIL_3.AddToCart();
    });

    afterEach(() => {
        BaseTestCase.Login();
        BaseTestCase.cleanupCart();
    });
});