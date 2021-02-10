// https://www.npmjs.com/package/search-google-geocode
// https://www.npmjs.com/package/bigdatacloud-reverse-geocodingv2
// https://www.npmjs.com/package/reverse-geocoding
// https://www.npmjs.com/package/image-thumbnail
// https://www.npmjs.com/package/mime-types
// https://www.npmjs.com/package/symlink-dir
// https://www.npmjs.com/package/filelink

// - Objectif Archiver les photos sur un disque externe et conserver les thumbnails sur l'ordinateur local
// - archiver sous forme year/month/date/2001-12-01_10-32-59-nom-fichier.png
// - pays/province/ville/rue
// - conserver structure des répertoire d'origine avec de symlink

var path = require('path');
import {ExifParserFactory} from "ts-exif-parser";
var fs = require('fs');

export class Photo {

  private url: string;
  private year: string|undefined
  private month: string|undefined
  private day:string|undefined

  constructor(url: string) {
    this.url = url;
  }
   
  getCreationDate(): string|undefined {
   let humanDateFormat: string|undefined = undefined;
    const buf = fs.readFileSync(this.url);
    const parser = ExifParserFactory.create(buf).parse();

    let tags = parser.tags;
    if(tags != undefined){
      let nbMillisecond:number = tags.DateTimeOriginal!;
      // console.log(nbMillisecond);
      let date = new Date(nbMillisecond*1000);
      // let options = {  year: 'numeric',  month: 'long', day: 'numeric' };
      // humanDateFormat = date.toLocaleString("en-US",options) ;
       this.month = date.toLocaleString("en-US", {month: "2-digit"}) // December
       this.day = date.toLocaleString("en-US", {day: "numeric"}) // 9
       this.year = date.toLocaleString("en-US", {year: "numeric"}) // 2019
      let hour = date.toLocaleString("en-US", {hour: "numeric",hour12: false,timeZone: 'UTC'}) // 10 AM
      let min = date.toLocaleString("en-US", {minute: "numeric"}) // 30
      let sec = date.toLocaleString("en-US", {second: "numeric"}) // 15
      humanDateFormat = this.year+"-"+this.month+"-"+this.day+"_"+hour+"-"+min+"-"+sec;
      // humanDateFormat = date.toLocaleString("en-US" ) ;
      // console.log(humanDateFormat);//2019-12-9 10:30:15
      console.log(humanDateFormat);
    }
    return humanDateFormat?.toString();
  }
  getFilename():string{
    return path.basename(this.url); 
  }
  getDirectoryName(): string{
    return path.join(this.year,this.month,this.day);
  }

  getNewName() : string{
    return this.getCreationDate()+"-"+this.getFilename();
  }

 

  export(root:string): string{
    let new_path = path.join(root,this.getDirectoryName());
    if (!fs.existsSync(new_path)) 
      fs.mkdirSync(new_path, { recursive: true }); 

    console.log("XXXXXXXX");
    console.log(new_path);
    fs.copyFile(this.url,path.join(new_path,this.getNewName()), callback);
    return new_path;
  }  


}
function callback(err:any) {
  if (err) throw err;
  // console.log('source.txt was copied to destination.txt');
}