import fs from 'fs/promises';

async function processYear(year) {
    try {
        const metadata = JSON.parse(await fs.readFile(`./hurdat/${year}.json`, 'utf8'));
        const jsonData = JSON.parse(await fs.readFile(`./hurdat2_json/${year}.json`, 'utf8'));
        let i=0
        const newData = jsonData.map(item => {
            item.image = metadata[i].image;
            item.fatalities = metadata[i].fatalities;
            item.cost_usd = metadata[i].cost_usd;
            item.retired = metadata[i].retired;
            i+=1
            return item;
        })

        await fs.writeFile(`./hurdat2/${year}.json`, JSON.stringify(newData, null, 2));
    } catch (err) {
        console.error(`Error processing year ${year}:`, err);
    }
}

async function processYears(startYear, endYear) {
    for (let year = startYear; year <= endYear; year++) {
        await processYear(year);
    }
}

processYears(1851, 2022);