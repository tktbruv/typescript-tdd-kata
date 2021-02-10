// https://www.npmjs.com/package/search-google-geocode
// https://www.npmjs.com/package/bigdatacloud-reverse-geocodingv2
// https://www.npmjs.com/package/reverse-geocoding
// https://www.npmjs.com/package/image-thumbnail
// https://www.npmjs.com/package/mime-types
// https://www.npmjs.com/package/symlink-dir
// https://www.npmjs.com/package/filelink
// - Objectif Archiver les photos sur un disque externe et conserver les thumbnails sur l'ordinateur local
// - archiver sous forme year/month/date/2001-12-01_10-32-59-nom-fichier.png
// - pays/province/ville/rue => symlink
// - conserver structure des répertoire d'origine avec de symlink

var path = require('path');
import {ExifParserFactory} from "ts-exif-parser";
var fs = require('fs');

export class Photo {

  private url: string;
  private year: string|undefined
  private month: string|undefined
  private day: string|undefined
  private hour: string|undefined
  private minute: string|undefined
  private second: string|undefined

  constructor(url: string) {
    console.log(url);
    this.url = url;
  }

  private extract_exif_data(){
    console.log()
    const buf = fs.readFileSync(this.url);
    const parser = ExifParserFactory.create(buf).parse();

    let tags = parser.tags;
  
    
    if(tags != undefined){
      let nbMillisecond:number = tags.DateTimeOriginal!;
      let date = new Date(nbMillisecond*1000);
       this.month = date.toLocaleString("en-US", {month: "2-digit"}) // December
       this.day = date.toLocaleString("en-US", {day: "numeric"}) // 9
       this.year = date.toLocaleString("en-US", {year: "numeric"}) // 2019
       this.hour = date.toLocaleString("en-US", {hour: "numeric",hour12: false,timeZone: 'UTC'}) // 10 AM
       this.minute = date.toLocaleString("en-US", {minute: "numeric"}) // 30
      this.second = date.toLocaleString("en-US", {second: "numeric"}) // 15
    }
  }

  getCreationDate(): string|undefined {
   let humanDateFormat: string|undefined = undefined;
    humanDateFormat = this.year+"-"+this.month+"-"+this.day+"_"+this.hour+"-"+this.minute+"-"+this.second;
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

 

  archive(archive_path:string, thumbnail_path:string|undefined): string{
    this.extract_exif_data();
   
    let new_path = path.join(archive_path,this.getDirectoryName());
    if (!fs.existsSync(new_path)) 
      fs.mkdirSync(new_path, { recursive: true }); 

    fs.copyFile(this.url,path.join(new_path,this.getNewName()), callback);
    return new_path;
  }  


}
function callback(err:any) {
  if (err) throw err;
  // console.log('source.txt was copied to destination.txt');
}


