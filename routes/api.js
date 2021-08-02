'use strict';

const Translator = require('../components/translator.js');

const POSSIBLE_METHOD = require('../components/method.js')

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if (!req.body.hasOwnProperty('text') || !req.body.hasOwnProperty('locale'))
        return res.send({ error: 'Required field(s) missing' })

      let inputText = req.body.text
      let method = req.body.locale

      if (!inputText) 
        return res.send({ error: 'No text to translate' })

      if (!POSSIBLE_METHOD.includes(method))
        return res.send({ error: 'Invalid value for locale field' })

      let translatedText = translator.exec(inputText, method)

      console.log("input text:\t\t" + inputText) 
      console.log("translated text:\t" + translatedText)
      if (translatedText.toLowerCase() == inputText.toLowerCase())
        return res.send({ text: inputText, translation: 'Everything looks good to me!' })

      res.send({ text: inputText, translation: translatedText })
    });
};
