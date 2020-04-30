module.exports = {
    click: async function(page, selector){
        try {
            await page.waitForSelector(selector);
            await page.click(selector)
        } catch (error) {
            throw new Error(`Could not click on selector: ${selector}`)
        }
    },
    
    getText: async function(page, selector) {
        try{
            await page.waitForSelector(selector);
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error(`Cannot get text from the selector: ${selector}`)
        }
    },

    getCount: async function(page, selector) {
        try{
            await page.waitForSelector(selector);
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error(`Can't get count for the selecor: ${selector}`)
        }
    },

    typeText: async function(page, selector, text) {
        try{
            await page.waitForSelector(selector);
            await page.type(selector, text)

        } catch(error) {
            throw new Error(`Couldn't type into selector: ${selector}`)
        }
    },

    waitForText: async function(page, selector, text) {
        try{
            await page.waitForSelector(selector);

        } catch (error) {


        }
    }
    
};