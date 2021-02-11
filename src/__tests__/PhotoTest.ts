// https://github.com/bpatrik/ts-exif-parser
// https://github.com/NagRock/ts-mockito


var path = require('path');
var fs = require('fs');

import { Console, exception } from "console";
import { endianness } from "os";
import { fileURLToPath } from "url";
import { Photo } from "../Photo"; 

describe('Import media test', () => {
    let root_path:string;
    let filename:string;
    let photo:Photo;
    
    beforeEach(async () => {
        root_path = path.join(__dirname, 'data');
        filename= path.join('folder1','folder11','arbre_gps.jpeg');
        photo = new Photo(root_path,filename);
      
	})
  
    
   it('should extract photo date from exif content', async () => {
        let new_filename = await photo.archive(path.join(__dirname ,"archive"),undefined);
        expect(fs.existsSync( new_filename)).toBeTruthy();
    });


    // https://jestjs.io/docs/en/asynchronous
    it('should generate thumbnail and save it', async ()  =>   {
        let archive_path = path.join(__dirname ,"archive")
        let thumbnail_path = path.join(__dirname ,"thumbnail")
        
        await photo.archive(archive_path,thumbnail_path);
        
        let thumbnail_filename = path.join(thumbnail_path,"/folder1/folder11/",photo.getNewName());
        console.log(thumbnail_filename);
        expect(fs.existsSync(thumbnail_filename)).toBeTruthy();
    });
 

    //  // https://jestjs.io/docs/en/asynchronous
     it('should generate reverse geocoding data', async ()  =>   {
        let archive_path = path.join(__dirname ,"archive")
        let thumbnail_path = path.join(__dirname ,"thumbnail")
        
        await photo.archive(archive_path,thumbnail_path);
        
        let thumbnail_filename = path.join(thumbnail_path,"/folder1/folder11/",photo.getNewName());
        expect(fs.existsSync(thumbnail_filename)).toBeTruthy();
        // add test to verify geocoding 
    });
 
//    it('should import media to destination director with new name', () => {
    
//    });


});