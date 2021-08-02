const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  
  let translator = new Translator()
  suite('time', () => {
    test('american to british', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('10:39', method), '<span class=\"highlight\">10.39</span>')
      assert.equal(translator.exec('0:09', method), '<span class=\"highlight\">0.09</span>')
    })
    test('british-to-american', () => {
      let method = 'british-to-american'
      assert.equal(translator.exec('23.00', method), '<span class=\"highlight\">23:00</span>')
      assert.equal(translator.exec('03.13', method), '<span class=\"highlight\">03:13</span>')
    })
    test('not change', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('25:09', method), '25:09')
      assert.equal(translator.exec('13:90', method), '13:90')
      assert.equal(translator.exec('04 : 19', method), '04 : 19')
    })

  })
  suite('spelling', () => {
    test('american to british', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('agonizingly', method), '<span class=\"highlight\">agonisingly</span>', 'agonizingly => agonisingly')
      assert.equal(translator.exec('bevy', method), '<span class=\"highlight\">bevvy</span>', 'bevy => bevvy')
      assert.equal(translator.exec('worshiping', method), '<span class=\"highlight\">worshipping</span>', 'worshiping => worshipping')
    })

    test('british to american', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('visualised', method), '<span class=\"highlight\">visualized</span>', 'visualized => visualised')
      assert.equal(translator.exec('neighbours', method), '<span class=\"highlight\">neighbors</span>', 'neighbors => neighbours')
      assert.equal(translator.exec('discolouring', method), '<span class=\"highlight\">discoloring</span>', 'discolouring => discoloring')
    })

    test('not changed', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('water', method), 'Water', 'water should not be changed.')
      assert.equal(translator.exec('idea', method), 'Idea', 'idea should not be changed')
    })

    test('sentence', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('Caramelizing is good phenomenon.', method), '<span class=\"highlight\">caramelising</span> is good phenomenon.')
    })
  })

  suite('titles', () => {
    test('american to british', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('Mr. Kuo', method), '<span class=\"highlight\">Mr</span> Kuo')
      assert.equal(translator.exec('dr. Woo', method), '<span class=\"highlight\">Dr</span> Woo')
    })

    test('british to american', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('ms Elf', method), '<span class=\"highlight\">Ms.</span> Elf')
      assert.equal(translator.exec('mx Fork', method), '<span class=\"highlight\">Mx.</span> Fork')
    })

    test('not changed', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('ms. Dai', method), 'Ms. Dai')
    })

    test('sentence', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('I met Dr. Chen in the gym this morning.', method), 'I met <span class=\"highlight\">Dr</span> Chen in the gym this morning.')
    })
  })

  suite('american-only and british-only', () => {
    test('american to british', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('candy apple', method), '<span class=\"highlight\">toffee apple</span>')
      assert.equal(translator.exec('paper route', method), '<span class=\"highlight\">paper round</span>')
      assert.equal(translator.exec('You could only order soda pop tonight.', method), 'You could only order <span class=\"highlight\">soft drink</span> tonight.')
    })

    test('british to american', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('brolly', method), '<span class=\"highlight\">umbrella</span>')
      assert.equal(translator.exec('jacket potato', method), '<span class=\"highlight\">baked potato</span>')
      assert.equal(translator.exec('Washing-up liquid is not enough.', method), '<span class=\"highlight\">dish soap</span> is not enough.')
    })

    test('not change', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('rummage sale', method), 'Rummage sale', 'should not convert to jumble sale')
      assert.equal(translator.exec("shopping cart", method), "Shopping cart", 'should not convert to shopping trolley')
    })
  })
  

  suite('fcc', () => {
    test('Mangoes are my favorite fruit.', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('Mangoes are my favorite fruit.', method), 'Mangoes are my <span class=\"highlight\">favourite</span> fruit.')
    })

    test('I ate yogurt for breakfast.', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('I ate yogurt for breakfast.', method), 'I ate <span class=\"highlight\">yoghurt</span> for breakfast.')
    })

    test("We had a party at my friend's condo.", () => {
      let method = 'american-to-british';
      assert.equal(translator.exec("We had a party at my friend's condo.", method), "We had a party at my friend's <span class=\"highlight\">flat</span>.")
    })

    test("Can you toss this in the trashcan for me?", () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('Can you toss this in the trashcan for me?', method), 'Can you toss this in the <span class=\"highlight\">bin</span> for me?')
    })

    test('The parking lot was full.', () => {
      let method = 'american-to-british';
      assert.equal(translator.exec('The parking lot was full.', method), 'The <span class=\"highlight\">car park</span> was full.')
    })

    test('Like a high tech Rube Goldberg machine.', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('Like a high tech Rube Goldberg machine.', method), 'Like a high tech <span class=\"highlight\">Heath Robinson device</span>.')
    })

    test('To play hooky means to skip class or work.', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('To play hooky means to skip class or work.', method), 'To <span class=\"highlight\">bunk off</span> means to skip class or work.')
    })

    test('No Mr. Bond, I expect you to die.', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('No Mr. Bond, I expect you to die.', method), 'No <span class=\"highlight\">Mr</span> Bond, I expect you to die.')
    })

    test('Dr. Grosh will see you now.', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('Dr. Grosh will see you now.', method), '<span class=\"highlight\">Dr</span> Grosh will see you now.')
    })

    test('Lunch is at 12:15 today.', () => {
      let method = 'american-to-british'
      assert.equal(translator.exec('Lunch is at 12:15 today.', method), 'Lunch is at <span class=\"highlight\">12.15</span> today.')
    })

    test('We watched the footie match for a while.', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('We watched the footie match for a while.', method), 'We watched the <span class=\"highlight\">soccer</span> match for a while.')
    })

    test('Paracetamol takes up to an hour to work.', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('Paracetamol takes up to an hour to work.', method), '<span class=\"highlight\">Tylenol</span> takes up to an hour to work.')
    })

    test('First, caramelise the onions.', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('First, caramelise the onions.', method), 'First, <span class=\"highlight\">caramelize</span> the onions.')
    })

    test('I spent the bank holiday at the funfair.', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('I spent the bank holiday at the funfair.', method), 'I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.')
    })

    test('I had a bicky then went to the chippy.', () => {
      let method = 'british-to-american';
      assert.equal(translator.exec('I had a bicky then went to the chippy.', method), 'I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.')
    })

    test("I've just got bits and bobs in my bum bag.", () => {
      let method = 'british-to-american'
      assert.equal(translator.exec("I've just got bits and bobs in my bum bag.", method), "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.")
    })

    test('The car boot sale at Boxted Airfield was called off.', () => {
      let method = 'british-to-american'
      assert.equal(translator.exec('The car boot sale at Boxted Airfield was called off.', method), 'The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.')
    })

    test('Have you met Mrs Kalyani?', () => {
      let method = 'british-to-american'
      assert.equal(translator.exec('Have you met Mrs Kalyani?', method), 'Have you met <span class=\"highlight\">Mrs.</span> Kalyani?')
    })

    test("Prof Joyner of King's College, London.", () => {
      let method = 'british-to-american'
      assert.equal(translator.exec("Prof Joyner of King's College, London.", method), "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.")
    })
        
    test('Tea time is usually around 4 or 4.30.', () => {
      let method = 'british-to-american'
      assert.equal(translator.exec('Tea time is usually around 4 or 4.30.', method), 'Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.')
    })
  })
});
