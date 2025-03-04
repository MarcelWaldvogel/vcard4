import {
  TextType,
  URIType
} from '../src/esm/values.js';

import {
  FNProperty,
  MemberProperty,
  NoteProperty
} from '../src/esm/properties.js';

import VCARD from '../src/esm/card.js';

import { assert } from 'chai';

describe('ESM VCARD tests', () => {
  it('Accepts valid input', () => {
    assert.doesNotThrow(() => new VCARD([
      new FNProperty(
        [],
        new TextType('James Bond')
      )
    ]));
  });

  it('Rejects invalid input', () => {
    assert.throws(() => new VCARD([
      new NoteProperty(
        [],
        new TextType('James Bond')
      )
    ]));
    assert.throws(() => new VCARD([
      new FNProperty(
        [],
        new TextType('James Bond')
      ),
      new MemberProperty(
        [],
        new URIType('uuid:blah-blah-blah')
      )
    ]));
    assert.throws(() => new VCARD);
    assert.throws(() => new VCARD({}));
    assert.throws(() => new VCARD(1));
    assert.throws(() => new VCARD('Hi'));
  });
  it('Formats value properly', () => {
    assert.strictEqual(
      new VCARD([
        new FNProperty(
          [],
          new TextType('James Bond')
        )
      ]).repr(),
      "BEGIN:VCARD\r\n" +
      "VERSION:4.0\r\n" +
      "FN:James Bond\r\n" +
      "END:VCARD\r\n"
    );
  });
});
