
const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const { click } = require('../lib/helpers');

describe('My first test', () => {
    let browser;
    let page;
    before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            devtools: false});
        const context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();
    });
    after(async function() {
        await browser.close()
    });
    it('log in with correct credentials', async () => {
        await page.goto('https://jira.hillel.it');
        const title = await page.title();
        const url = await page.url();
        await page.type('#login-form-username', 'webinar5', {delay: 0});
        await page.setDefaultTimeout(1000);
        await page.type('#login-form-password', 'webinar5');
        await click(page, '#login-form-remember-me');
        //await page.click('#login-form-remember-me', {clickCount: 1});
        //await page.click('#login');
        await click(page, '#login');
        await page.waitFor(() => !document.querySelector('#login'));
        await page.waitFor('#login', {hidden: true});
        expect(title).to.be.a('string', 'System Dashboard - Hillel IT School JIRA');
        expect(url).to.include('jira.hillel.it');
    });

    it('create an issue', async () => {
        await page.goto('https://jira.hillel.it');
        await page.type('#login-form-username', 'webinar5', {delay: 10});
        await page.type('#login-form-password', 'webinar5');
        await page.click('#login');
        await page.waitFor(4000);
        await page.waitForSelector('#create_link');
        await page.click('#create_link');
        await page.waitForSelector('#project-field');
        await page.type('#project-field', 'Webinar (WEBINAR)');
        await page.waitForSelector('#summary');
        await page.type('#summary', 'test', {delay: 10});
        await page.waitFor(4000);
    })
});
