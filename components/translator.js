const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')


class Translator {
  exec(inputText, method) {
    let handler = new Handler()

    let endmark = inputText.match(/[\W]$/)
    if (endmark) inputText = inputText.substring(0, inputText.length-1)

    // time handling
    let timeHandledText = handler._timeConvert(inputText, method)

    // deal with spelling, titles, american/british-only without space
    // time complexity O(n + m), n is the length of input text, m is the length of dict object
    let [spelling, titles] = handler._dictConverter(method)

    let textArray = timeHandledText.split(' ')
    textArray = textArray.map((text, index) => {
                  let lowerCaseText = text.toLowerCase()
                  return spelling[lowerCaseText]
                      ?  handler._highlight(spelling[lowerCaseText]) 
                      :  titles[lowerCaseText]
                      ?  handler._highlight(handler._titleCase(titles[lowerCaseText]))
                      :  method == 'american-to-british' && americanOnly[lowerCaseText]
                      ?  handler._highlight(americanOnly[lowerCaseText])
                      :  method == 'british-to-american' && britishOnly[lowerCaseText]
                      ?  handler._highlight(britishOnly[lowerCaseText])
                      :  text
                })

    let translatedText = textArray.join(' ') 
    // phrases with space in these *-only dicts will not be converted in the above 
    // time complexity O(n*m), n is the length of input text, m is the length of dict object
    let arrFromDictWithSpace = method == 'american-to-british'
                             ? handler._arrFromDictWithSpace(americanOnly)
                             : handler._arrFromDictWithSpace(britishOnly)

    arrFromDictWithSpace.forEach((pair) => {
      let re = new RegExp(`(?<![\w-])${pair[0]}(?![\w-])`, 'gi') // hyphen should be excluded in the word boundary
      translatedText = translatedText.replace(re, handler._highlight(pair[1]))
    })
    
    if (endmark) translatedText += endmark[0]

    return handler._titleCase(translatedText)      
  }
}

module.exports = Translator;

class Handler {
  _timeConvert(text, method) {
    const timeRegex = method == 'british-to-american'
                    ? /((?<=\s|^)[0-9]|0[1-9]|1[0-9]|2[0-3])\.([0-5][0-9])/g
                    : /((?<=\s|^)[0-9]|0[1-9]|1[0-9]|2[0-3]):([0-5][0-9])/g

    let times = text.match(timeRegex)
    if (times){
      if (method == 'british-to-american') 
        times.forEach(time => text = text.replace(time, this._highlight(time.replace(".", ":"))))
      else 
        times.forEach(time => text = text.replace(time, this._highlight(time.replace(":", "."))))
    }
    return text
  }

  _highlight(translatedText) {
    return `<span class=\"highlight\">${translatedText}</span>`
  }

  _dictConverter(method) {
    let spelling, titles

    if (method == 'british-to-american') {
      spelling = this._objInvert(americanToBritishSpelling)
      titles = this._objInvert(americanToBritishTitles)
    } 

    else {
      spelling = this._objClone(americanToBritishSpelling)
      titles = this._objClone(americanToBritishTitles)
    }

    return [spelling, titles]
  }

  _arrFromDictWithSpace(dict) {
    return Object.keys(dict).reduce((arr, key) => {
          if (key.match(/\s/)) 
            arr.push([key, dict[key]])
          return arr
        }, [])
  }

  _objInvert(obj){
    return Object.keys(obj).reduce((newObj, key) => {
          newObj[obj[key]] = key
          return newObj
        }, {})
  }

  // object import from module is called by reference
  _objClone(obj){
    return Object.keys(obj).reduce((newObj, key) => {
          newObj[key] = obj[key]
          return newObj
        }, {})
  }

  _titleCase(text){
    let newText = text.split('')
    newText[0] = newText[0].toUpperCase()
    return newText.join('')
  }
}