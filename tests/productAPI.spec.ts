import { test, expect, request } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://dummyjson.com/docs/products')
})

test('Get products API Test', async ({page}) => {

    await page.route('https://dummyjson.com/products', async route => {
        const getResponse = await route.fetch()
        const getResponseBody = await getResponse.json()
        expect(getResponseBody.status()).toEqual(200)
    })

})

test('Create Products API Test', async ({request}) => {

    const articleResponse = await request.post('https://dummyjson.com/products/add', {
        headers: { 
                    'Content-Type': 'application/json'
                 },
        data: {
                "title": "BMW Pencil",
                "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
                "category": "beauty",
                "price": 9.99,
                "discountPercentage": 7.17,
                "rating": 4.94,
                "stock": 5,
                "tags": [
                    "beauty",
                    "mascara"
                ],
                "brand": "Essence",
                "sku": "RCH45Q1A",
                "weight": 2,
                "dimensions": {
                    "width": 23.17,
                    "height": 14.43,
                    "depth": 28.01
                },
                "warrantyInformation": "1 month warranty",
                "shippingInformation": "Ships in 1 month",
                "availabilityStatus": "Low Stock"
                }
    })
    expect(articleResponse.status()).toEqual(201)
    const responseBody = await articleResponse.json()
    console.log(responseBody)

})