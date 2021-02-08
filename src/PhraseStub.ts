import { Phrase } from "./Phrase";

export class PhraseStub extends Phrase{
  constructor(phrase:string){
    super(phrase);
  }
  unique(): string[] {
    return ["123456"];
  }

}