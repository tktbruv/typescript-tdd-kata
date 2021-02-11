// https://www.npmjs.com/package/search-google-geocode
// https://www.npmjs.com/package/bigdatacloud-reverse-geocodingv2
// https://www.npmjs.com/package/reverse-geocoding
// https://www.npmjs.com/package/mime-types
// https://www.npmjs.com/package/symlink-dir
// https://www.npmjs.com/package/filelink
// - Objectif Archiver les photos sur un disque externe et conserver les thumbnails sur l'ordinateur local
// - archiver sous forme year/month/date/2001-12-01_10-32-59-nom-fichier.png
// - pays/province/ville/rue => symlink
// - conserver structure des répertoire d'origine avec de symlink
// var geocoder = require('search-google-geocode');
import ReverseGeocode, { ILocation, IGeocode } from "bigdatacloud-reverse-geocoding";

var path = require('path');
import {ExifParserFactory} from "ts-exif-parser";
var fs = require('fs');
const imageThumbnail = require('image-thumbnail');

export class Photo {

  private root_path:string;
  private file_path:string;
  private year: string|undefined
  private month: string|undefined
  private day: string|undefined
  private hour: string|undefined
  private minute: string|undefined
  private second: string|undefined
  private longitude: number=0.0;
  private latitude: number=0.0;

  constructor(root_path: string,file_path:string) {
    this.root_path = root_path;
    this.file_path = file_path;
  }

  getNewName() : string{
    return this.getCreationDate()+"-"+this.getFilename();
  }

  async archive(archive_path:string, thumbnail_path:string|undefined): Promise<string>{
    this.extract_exif_data();
    let new_archive_filename = this.archive_photo(archive_path);
    let new_filename = path.join(await new_archive_filename,this.getNewName());
    let new_thumbnail_path = this.generateThumbnail(new_filename);
    await this.reverseGeolocation()
    return new_filename;
  } 

  private async reverseGeolocation(){
    if(this.longitude){
      // var options = { language: 'fr'};
      // await geocoder.reverseGeocode(this.latitude, this.longitude, this.reverse_geocodeing_callback, options);
      const geocode = new ReverseGeocode();
      const location: ILocation = { lat: this.latitude, long: this.longitude};
      const place: IGeocode = await geocode.locate(location);
      console.log(place)
      console.log("------------");
      console.log(place.countryName);
      console.log(place.principalSubdivision);
      console.log(place.locality);
      console.log(place.localityInfo.administrative);
      console.log("---------iii----------");
      console.log(place.localityInfo.informative);


    }

  }
  // use callback to return result from geocoding process
  // private reverse_geocodeing_callback (error:any, result:any) {
  //   if (error) console.log(error); // on error
  //   else console.log(result); // on success
  // }

  private extract_exif_data(){
    // console.log("in extract_exif_data")
    const buf = fs.readFileSync(this.getSourcePath());
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


      this.longitude = tags.GPSLongitude || 0.0;
      this.latitude = tags.GPSLatitude || 0.0;

    } else {
      console.log("TAG undefined");
    }
  }

  private getSourcePath(): string{
    return path.join(this.root_path,this.file_path);
  }

  private getCreationDate(): string|undefined {
   let humanDateFormat: string|undefined = undefined;
    humanDateFormat = this.year+"-"+this.month+"-"+this.day+"_"+this.hour+"-"+this.minute+"-"+this.second;
    return humanDateFormat?.toString();
  }
  
  private getFilename():string{
    return path.basename(this.getSourcePath()); 
  }
  
  private getDirectoryName(): string{
    return path.join(this.year,this.month,this.day);
  }
 

  private confirm_thumbnail_write(err:any){
    if (err) throw err;
    // console.log('Done writing image to file');
  }

  private  generateThumbnail(new_archive_filename:string) : string  {
    let new_thumbnail_path = "";
    try {
        const thumbnail =  imageThumbnail(new_archive_filename);

        let base = path.dirname(this.file_path);
        // console.log(base);

        let thumbnal_filename:string = path.join(path.dirname(this.root_path),'thumbnail',base,this.getNewName());
        if (!fs.existsSync(path.dirname(thumbnal_filename))) 
          fs.mkdirSync(path.dirname(thumbnal_filename), { recursive: true }); 

        // console.log(thumbnal_filename);
        fs.writeFile(thumbnal_filename, thumbnail,this.confirm_thumbnail_write);
    } catch (err) {
      console.error(err);
    }

    return new_thumbnail_path;
  }

  private confirCopyFile(err:any) {
    if ( err) throw err;
  }

  private  archive_photo(archive_path:string){
    let new_path = path.join(archive_path,this.getDirectoryName());
    if (!fs.existsSync(new_path)) 
      fs.mkdirSync(new_path, { recursive: true }); 

    fs.copyFile(this.getSourcePath(),path.join(new_path,this.getNewName()), this.confirCopyFile);
    return new_path;
  }

}
