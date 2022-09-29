var scraperStart = require('./scraper')

const moment = require("moment");

async function start(){
    const startT = moment().format("HH:mm:ss");
    console.log("Scraper start in ", startT)
    await scraperStart.scraperStart();
    const startE = moment().format("HH:mm:ss");
    console.log("Scraper ended in ", startE);
}
start();