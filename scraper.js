const puppeteer = require('puppeteer');
const fs = require('fs');
var base = "https://lomex.hu/hu/homepage";

var scraperStart = async function (){
    console.log("starting scraping...");
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(base);
    const id = await page.$("#nick");
    await id.type("Arnaudls1");
    // await page.waitForTimeout(4000)
    const pass = await page.$("#pass");
    await pass.type("Anna20130621")
    const button = await page.$('td > input[type="image"]')
    await Promise.all([
        button.click(),
        page.waitForNavigation(),
    ])
    const page1 = await browser.newPage();
    await page1.setDefaultNavigationTimeout(0);
    await page.waitForSelector(".boxbody")
    const {argv} = require('process')
    const targetUrl = argv[2]
    console.log("url", targetUrl);
    await page1.goto(targetUrl, {waitUntil: 'load'});
    // await page1.waitForNavigation({waitUntil: 'networkidle2'});
    console.log("---")
    const data = await page1.content()
    // console.log("data: " + (data));
    
    fs.writeFile('result.txt', data, function (err) {
        if (err) return console.log(err);
        console.log('Wrote');
    });
    // await page.$eval("nick", el => console.log("elemnet is:", el.innerText));
    page.close();
    page1.close();
    browser.close();
}   


exports.scraperStart = scraperStart;