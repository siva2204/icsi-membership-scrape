const puppeteer = require("puppeteer");
const fs = require("fs");

// start scraping data from site, by paginating syncronosly
const scrape = async (type) => {
  try {
    const startUrl = "https://stimulate.icsi.edu/memTemp/MemberSearch";
    const browser = await puppeteer.launch({ headless: false }); // TODO change this to false
    const page = await browser.newPage();
    // opening the search page i.e startUrl
    await page.goto(startUrl, { waitUntil: "networkidle2" });
    await page.select(".panelInputs", type);
    const list = [];

    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle2" }),
      page.click(".SearchCrtSubmitBtn"),
    ]);

    let data = await page.evaluate(() => {
      let result = [];
      let parentElement = document.getElementById("pagesearchtbid");
      let childrens = parentElement.children;

      let text =
        document.getElementById("ulpgdnid").firstChild.childNodes[3].innerText;

      Array.from(childrens).forEach((tr) => {
        let rdata = [];

        Array.from(tr.children).forEach((td) => {
          rdata.push(td.innerText);
        });

        result.push(rdata);
      });

      return [result, text.substr(text.length - 4)];
    });

    list.push(...data[0]);
    let totalPages = parseInt(data[1]);

    for (let pgn = 2; pgn <= totalPages; pgn++) {
      const data = await fetchData(pgn.toString(), page);
      list.push(...data);
    }

    fs.writeFileSync(`${type}-data.json`, JSON.stringify(list)); //saving data as json file

    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

const fetchData = async (pgn, page) => {
  const input = await page.$("#paginationid");
  await input.click({ clickCount: 3 });
  await input.type(pgn);

  page.click("#ulpgid > li:nth-child(1) > input[type=button]:nth-child(2)");

  // waiting for the request to complete
  await page.waitForResponse(
    "https://stimulate.icsi.edu/Home/AjaxPagenationSearch",
    {
      timeout: 100000000,
    }
  );

  let data = await page.evaluate(() => {
    let result = [];
    let parentElement = document.getElementById("pagesearchtbid");
    let childrens = parentElement.children;

    Array.from(childrens).forEach((tr) => {
      let rdata = [];
      Array.from(tr.children).forEach((td) => {
        rdata.push(td.innerText);
      });
      result.push(rdata);
    });

    return result;
  });

  fs.writeFileSync(`./acs/acs-${pgn}-data.json`, JSON.stringify(data));
  return data;
};

// scrape ACS and FCS type data
const scrapeData = async () => {
  await scrape("A"); // A -> ACS
  await scrape("F"); // F -> FCS
};

scrapeData();
