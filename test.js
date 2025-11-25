const { test, isEqual, end } = require("./falcon.js");

var rewire = require("rewire");
var chai = require("chai");
chai.should();
chai.use(require("chai-dom"));
chai.use(require("chai-things"));
let expect = chai.expect;
const jquery = require("jquery");
let fs = require("fs");

// elementExists
let elementName = "div";
let startIndex = 10;
let code = fs.readFileSync("./test.html", "utf8");

test(
  "Make sure there's an opening " +
    elementName +
    " tag, <" +
    elementName +
    ">.",
  () => {
    let openingTagIndex = code.indexOf("<" + elementName, startIndex);
    expect(openingTagIndex).to.greaterThanOrEqual(0);
  },
);

test(
  "Make sure there's a closing " +
    elementName +
    " tag, </" +
    elementName +
    ">.",
  () => {
    let closingTagIndex = code.indexOf("</" + elementName + ">", startIndex);
    expect(closingTagIndex).to.greaterThanOrEqual(0);
  },
);

test(
  "Make sure there are opening and closing " +
    elementName +
    " tags, <" +
    elementName +
    "></" +
    elementName +
    ">.",
  () => {
    let openingTagIndex = code.indexOf("<" + elementName, startIndex);
    let closingTagIndex = code.indexOf("</" + elementName + ">", startIndex);
    expect(closingTagIndex - openingTagIndex).to.greaterThanOrEqual(0);
  },
);

async function start() {
  // await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
  //   let dom = await domLoaded("./testrunner-examples/index2.html");
  //   let button = dom.window.document.getElementsByTagName("button")[0];
  //   button.click();
  //   let span = dom.window.document.getElementsByTagName("span")[0];
  //   expect(span.innerHTML).to.equal("saved");
  // });
  end();
  // await test(`Make sure to set the color property to purple for the h1 selector.'`, async () => {
  //   let dom = await domLoaded('../testrunner-examples/index2.html');
  //   let h1 = dom.window.document.getElementsByTagName('h1')[0];
  //   expect(h1.style.backgroundColor).to.equal('lightGray');
  // });
  // end();
}

start();

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let path = require("path");

// HELPER
async function domLoaded(file) {
  const dom = await JSDOM.fromFile(path.resolve(file), {
    resources: "usable",
    runScripts: "dangerously",
  });
  return await new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      reject("Loading the DOM timed out");
    }, 5000);
    dom.window.document.addEventListener("load", () => {
      clearTimeout(timeout);
      resolve(dom);
    });
  });
}
