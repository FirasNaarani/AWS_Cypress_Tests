import AmazonProduct from "../../support/AmazonProd.js";
import AmazonTestBase from "../../support/BaseTestCase.js";
let productData;

describe('Amazon Shopping Cart Tests', () => {

    const BaseTestCase = new AmazonTestBase();

    // Product objects will be initialized in the before() hook
    let PENCIL_SHARPENER;
    let SCISSORS;
    let PENCIL_SHARPENER_PENCIL_1;
    let PENCIL_SHARPENER_PENCIL_2;
    let PENCIL_SHARPENER_PENCIL_3;

    before(() => {
        cy.fixture('Data.json').then((data) => {
            productData = data;

            // Create product objects from the JSON data
            PENCIL_SHARPENER = new AmazonProduct(
                productData.products[0].brand,
                productData.products[0].name,
                productData.products[0].color,
                productData.products[0].url
            );

            SCISSORS = new AmazonProduct(
                productData.products[1].brand,
                productData.products[1].name,
                productData.products[1].color,
                productData.products[1].url
            );

            PENCIL_SHARPENER_PENCIL_1 = new AmazonProduct(
                productData.products[2].brand,
                productData.products[2].name,
                productData.products[2].color,
                productData.products[2].url
            );

            PENCIL_SHARPENER_PENCIL_2 = new AmazonProduct(
                productData.products[3].brand,
                productData.products[3].name,
                productData.products[3].color,
                productData.products[3].url
            );

            PENCIL_SHARPENER_PENCIL_3 = new AmazonProduct(
                productData.products[4].brand,
                productData.products[4].name,
                productData.products[4].color,
                productData.products[4].url
            );
        });
    });

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
        BaseTestCase.CleanUpCart();
    });
});