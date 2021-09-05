const fs = require('fs');
const path = require('path');
const Chromium = require('chrome-aws-lambda');
const handlebars = require('handlebars');

// Set this to false to disable puppeteer headless mode to adjust CSS style.
const puppeteerHeadlessMode = true;

const resourceRootPath = 'handlers/report/pdf/';
const bootstrapCssPath = 'css/bootstrap.min.css';
const customCssPath = 'css/style-pdf.css';
const reportPageTemplate = 'template/pdf-report.html';
const dataUrlHtmlPrefix = 'data:text/html;charset=UTF-8,';
const waitUntilPoint = 'networkidle0';

/**
 * Join and normalise the current path with the parameter's.
 *
 * @param {string} p The path to join.
 * @returns {string}
 */
const pathJoin = (p) => path.join(process.cwd(), p);

/**
 * fs.readFileSync wrapper function with utf8 encoding.
 *
 * @param {string} p The full path of the file to read from.
 * @returns {string}
 */
const fsReadFileSync = (p) => fs.readFileSync(p, 'utf8');

/**
 * The CSS file string contents.
 *
 * @type {string}
 */
const bootStrapCss = fsReadFileSync(
  pathJoin(resourceRootPath + bootstrapCssPath)
);

/**
 * The custom CSS string file content.
 *
 * @type {string}
 */
const customCss = fsReadFileSync(pathJoin(resourceRootPath + customCssPath));

// Options for puppeteer to print PDF file.
const puppeteerPrintPdfOptions = {
  format: 'A4',
  headerTemplate: '<p></p>',
  footerTemplate: '<p></p>',
  displayHeaderFooter: false,
  margin: {
    top: '40px',
    bottom: '100px'
  },
  printBackground: true
};

// const puppeteerLaunchOptions = {
//   args: ['--no-sandbox'],
//   headless: puppeteerHeadlessMode,
//   executablePath: await chromium.executablePath
// };

const puppeteerLaunchOptions = {
  args: Chromium.args
  //defaultViewport: Chromium.defaultViewport,
  // executablePath: await Chromium.executablePath,
  //headless: Chromium.headless
};

/**
 * Convert the file content to base64 encoded string.
 *
 * @param {string} path File's path.
 * @returns {string}
 */
const toBuf = (path) => Buffer.from(fs.readFileSync(path)).toString('base64');

/**
 * Build the image data URL from its given file path.
 *
 * @param {string} filePath The file name.
 * @returns {string}
 */
const bEncode = (filePath) =>
  `data:image/${path.extname(filePath).split('.').pop()};base64,${toBuf(
    filePath
  )}`;

/**
 * Use Regex to match file path in url() function notation in CSS,
 * and replace it with the referenced files base64 string content.
 *
 * @returns {string}
 * @param {string} str
 */
const replaceImgInUrlNotationFuncToBase64String = (str) =>
  str.replace(
    /url\((['"])(.+?)\1\)/g,
    (match) =>
      `url(${bEncode(
        pathJoin(
          resourceRootPath +
            match
              .replace(/(['"])+/g, '')
              .replace(/url\(/g, '')
              .replace(/\)/g, '')
        )
      )})`
  );

/**
 * Return a string like "data:text/html;charset=UTF-8,ENCODED_URI_STRING..."
 *
 * @param {string} htmlStr
 * @returns {string}
 */
const formatDataUrlForHtml = (htmlStr) => `${dataUrlHtmlPrefix}${htmlStr}`;

/**
 * Parse the encoded html data URL string to puppeteer and return a PDF content from it.
 *
 * @param {string} uriStr
 * @returns {Promise<Buffer>}
 */
const generatePdfStringUsingPuppeteer = async (uriStr) => {
  const browser = await Chromium.puppeteer.launch(puppeteerLaunchOptions);
  const page = await browser.newPage();
  await page.goto(formatDataUrlForHtml(uriStr), { waitUntil: waitUntilPoint });
  const pdfContent = await page.pdf(puppeteerPrintPdfOptions);
  await browser.close();
  return pdfContent;
};

/**
 * Compile a Handlebars template, populate the template variables using the properties from the object parameter,
 * and return the completed HTML string encoded as URI string.
 *
 * @param {object} templateObj
 * @param {string} templateHtmlStr
 * @returns {string}
 */
const formatHtmlWithHandlerbars = (templateObj, templateHtmlStr) => {
  // {HandlebarsTemplateDelegate} templateDelegate Compile HTML string to Handlebars TemplateDelegate.
  const templateDelegate = handlebars.compile(templateHtmlStr);

  templateObj.customCss = replaceImgInUrlNotationFuncToBase64String(customCss);
  templateObj.bootStrapCss = bootStrapCss;

  return encodeURIComponent(templateDelegate(templateObj));
};

module.exports = {
  fsReadFileSync,
  pathJoin,
  formatHtmlWithHandlerbars,
  generatePdfStringUsingPuppeteer
};
