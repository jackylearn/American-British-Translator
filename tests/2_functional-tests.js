const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');

suite('Functional Tests', () => {
  test('with text and locale fields', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I spent the bank holiday at the funfair.', locale: 'british-to-american' })
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'translation')
        assert.equal(res.body.translation, 'I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.')
        done()
      })
  })

  test('invalid locale', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I spent the bank holiday at the funfair.', locale: 'to-american' })
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Invalid value for locale field')
        done()
      })
  })

  test('missing text', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ textToTranslate: 'I spent the bank holiday at the funfair.', locale: 'british-to-american' })
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  test('missing locale', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I spent the bank holiday at the funfair.', local: 'british-to-american' })
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'Required field(s) missing')
        done()
      })
  })

  test('empty text', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: '', locale: 'british-to-american'})
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'error')
        assert.equal(res.body.error, 'No text to translate')
        done()
      })
  })

  test('no traslation required', (done) => {
    chai
      .request(server)
      .post('/api/translate')
      .send({ text: 'I spent the holiday at the home.', locale: 'british-to-american' })
      .end((err, res) => {
        if (err) return console.log(err)
        assert.equal(res.status, 200)
        assert.property(res.body, 'translation')
        assert.equal(res.body.translation, 'Everything looks good to me!')
        done()
      })
  })
});
