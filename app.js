const fs = require('fs');

const data = fs.readFileSync(`${process.cwd()}/apidoc.json`, "utf8");
let jsonParseData = JSON.parse(data);

const parseData = objectParser(jsonParseData, '',[]);


fs.writeFileSync(`${process.cwd()}/a.txt`, parseData.join('\n'));


function objectParser(object, key, text) {
  const keys = Object.keys(object);

  for (let k of keys) {
    let objectKey = key !== '' ? key + '.' + k : k;
    if (typeof object[k] === 'object') {
      if (Array.isArray(object[k])) {
        text.push(`     * @apiSuccess {Object[]}  ${objectKey}  설명`);
        objectParser(object[k][0], objectKey, text);
      } else {
        text.push(`     * @apiSuccess {Object}  ${objectKey}  설명`);
        objectParser(object[k], objectKey, text);
      }
    } else if (typeof object[k] === 'string') {
      text.push(`     * @apiSuccess {String}  ${objectKey}  설명`);
    } else if (typeof object[k] === 'boolean') {
      text.push(`     * @apiSuccess {Boolean}  ${objectKey}  설명`);
    } else if (typeof object[k] === 'number') {
      text.push(`     * @apiSuccess {Integer}  ${objectKey}  설명`);
    }
  }
  return text;
}

