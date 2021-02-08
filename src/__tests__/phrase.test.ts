import { fileURLToPath } from "url";
import { Phrase } from "../Phrase";
import { PhraseStub} from '../PhraseStub';

var str2: string = "With Advent of Html5 , we have got various option to cache or store info on client browser. Previously we were having only cookies , which were very restrictive and size of cookies was very small. but now we local storage and session storage as well. and cookies has been talk of past , though it is getting used for various purposes let's talk about all these"

// todo:
//  - Développer une fonction permettant d'extraire les mots uniques d'une phrase
// let str1: string = "LocalStorage is a way to store data on the client’s computer. It allows the saving of key/value pairs in a web browser and it stores data with no expiration date. localStorage can only be accessed via JavaScript, and HTML5. However, the user has the ability to clear the browser data/cache to erase all localStorage data."

//  - Développer une fonction permettant de faire l'intesection des mots de deux phrases
// let str1:string = "LocalStorage is a way to store data on the.";
// let str2:string = "way to get the data";
// let expected:string[] = ["data","the","to","way"]

//  - Développer une fontion permettant d'éliminer les espaces en superflu dans un phrase
// let str1: string = "LocalStorage   is  a   way     to  store    data  on    the  .";
// let expected: string = "LocalStorage is a way to store data on the.";


describe('Phrase tests', () => {
   it('should extract phrase worlds', () => {
      let str1: string = "LocalStorage is a way to store data on the client’s computer. It allows the saving of key/value pairs in a web browser and it stores data with no expiration date. localStorage can only be accessed via JavaScript, and HTML5. However, the user has the ability to clear the browser data/cache to erase all localStorage data."
      let phrase: Phrase = new Phrase(str1);
      let words: string[] = phrase.unique();
      expect(words).toEqual([
         'HTML5', 'However', 'It',
         'JavaScript', 'LocalStorage', 'a',
         'ability', 'accessed', 'all',
         'allows', 'and', 'be',
         'browser', 'cache', 'can',
         'clear', 'client', 'computer',
         'data', 'date', 'erase',
         'expiration', 'has', 'in',
         'is', 'it', 'key',
         'localStorage', 'no', 'of',
         'on', 'only', 'pairs',
         'saving', 'store', 'stores',
         'the', 'to', 'user',
         'value', 'via', 'way',
         'web', 'with'
      ]);
   });

   it('should intersect phrases', () => {
      let str1: string = "LocalStorage is a way to store data on the.";
      let str2: string = "way to get the data";
      let expected: string[] = ["data", "the", "to", "way"]

      let phrase:Phrase = new Phrase(str1);
      let intersect:String[] = phrase.intersect(str2);
      
      expect(intersect).toEqual(expected);
   });

   it('should stub phrase unique', () => {
      let str1: string = "LocalStorage is a way to store data on the client’s computer. It allows the saving of key/value pairs in a web browser and it stores data with no expiration date. localStorage can only be accessed via JavaScript, and HTML5. However, the user has the ability to clear the browser data/cache to erase all localStorage data."
      let phrase: Phrase = new PhraseStub(str1);
      let words: string[] = phrase.unique();
      expect(words).toEqual(["123456"]);
   });


   



});