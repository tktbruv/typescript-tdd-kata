
var SortedSet = require("collections/sorted-set");

export class Phrase {

  private phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase;
  }
   
  unique(): string[] {
    return this._unique(this.phrase);
  }

  intersect(str2: string): String[] {
    let array1: string[] = this.unique();
    let array2: string[] = this._unique(str2);

    return array1.filter((value) => array2.includes(value));
  }

  private _unique(phrase: string): string[] {
    let words: string[] = phrase
      .replace(/[\.]|’s|,/gm, '')
      .replace(/\//gm, ' ')
      .split(' ');

    return SortedSet(words).toArray();
  }

}