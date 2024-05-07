const puppeteer = require("puppeteer");

const url = "https://www.mediakod.com";
const visitedLinks = new Set();

// Script
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const domainUrl = page.url();

  console.log("Exploring domain: ", domainUrl);
  await exploreLinks(browser, domainUrl);

  console.log(visitedLinks);

  await browser.close();
})();

/**
 * Visits the given URL and gets all internal links
 * @param Puppeteer browser
 * @param {String} url
 */
const exploreLinks = async (browser, url) => {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const links = await getInternalLinks(page, url);

  for (const link of links) {
    if (!visitedLinks.has(link)) {
      visitedLinks.add(link);
      await exploreLinks(browser, link);
    }
  }

  await page.close();
};

/**
 * Obtains all internal links from the given page
 * @param {*} page
 * @param {String} domainUrl
 * @returns {Array} - Internal links
 */
const getInternalLinks = async (page, domainUrl) => {
  const _internalLinks = [];

  const links = await page.$$eval("a", (links) =>
    links.map((link) => link.href)
  );

  links.forEach((link) => {
    if (checkIfInternalLink(link, domainUrl)) {
      _internalLinks.push(link);
    }
  });

  return _internalLinks;
};

/**
 *
 * @param {*} link
 * @param {*} domainUrl
 * @returns {Boolean} - True if the link is an internal link, otherwise false
 */
const checkIfInternalLink = (link, domainUrl) => {
  if (link.startsWith(domainUrl) && !link.includes("#")) {
    return true;
  }
};
