// https://github.com/bpatrik/ts-exif-parser
var path = require('path');
var fs = require('fs');

import { exception } from "console";
import { fileURLToPath } from "url";
import { Photo } from "../Photo"; 

describe('Import media test', () => {
   it('should extract photo date from exif content', () => {
        
    let filepath:string = __dirname + '/data/photo.jpeg';
    console.log(filepath);
    let photo:Photo = new Photo(filepath);
    expect(photo).not.toBeNull();
 
    let date:string|undefined = photo.getCreationDate();
    expect(date).toEqual("2014-03-31_17-58-25");
    // expect(date).toEqual("2014-03-31T17:58:25.000Z")
    expect(photo.getNewName()).toEqual("2014-03-31_17-58-25-photo.jpeg");
    expect(photo.getFilename()).toEqual("photo.jpeg")
    // path.
    expect(photo.getDirectoryName()).toEqual("2014/03/31")
    
   let out_path =  photo.export(path.join(__dirname ,"out"));
    expect(fs.existsSync(out_path)).toBeTruthy();

    let new_filename = path.join(out_path,photo.getNewName());
    expect(fs.existsSync(new_filename)).toBeTruthy();


});

//    it('should extract video date from exif content', () => {
    
//    });

//    it('should import media to destination director with new name', () => {
    
//    });


   



});