import { Phrase } from "../Phrase";

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
      expect(true).toEqual(false)
   });

   // it('should intersect phrases', () => {
   //    expect(true).toEqual(false)
   // });

   // it('should clean spaces', () => {
   //    expect(true).toEqual(false)
   // });

});