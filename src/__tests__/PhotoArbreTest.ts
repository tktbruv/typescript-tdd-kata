// https://github.com/bpatrik/ts-exif-parser
// https://github.com/NagRock/ts-mockito
var rimraf = require("rimraf");
var mime = require('mime-types')
var path = require('path');
var fs = require('fs');
import {instance, when, spy } from 'ts-mockito';

import { Console, exception } from "console";
import { endianness } from "os";
import { memoryUsage } from "process";
import { fileURLToPath } from "url";
import { Photo } from "../Photo"; 
 
describe('Import arbre test', () => {
    let root_path:string;
    let filename:string;
    let photo:Photo;
    let archive_path = path.join(__dirname ,"archive")
    let thumbnail_path = path.join(__dirname ,"thumbnail")
    let photos_path = path.join(__dirname ,"photos")
    let archive_filename = path.join(__dirname,'/archive/2008/03/08/2008-03-08_11-35-22-arbre_gps.jpeg');
    let thumbnail_filename = path.join(__dirname,'/thumbnail/2008/03/08/2008-03-08_11-35-22-arbre_gps.jpeg');
    let symlink_geocoding_filename =  path.join(__dirname,'/photos/Canada/Quebec/Montérégie/Rouville Regional County Municipality/Richelieu/2008-03-08_11-35-22-arbre_gps.jpeg');
    let symlink_photo_filename = path.join(__dirname, '/photos/folder1/folder11/2008-03-08_11-35-22-arbre_gps.jpeg');
    
    beforeEach(async () => {
        if(fs.existsSync(archive_filename)) fs.unlinkSync(archive_filename);
        if(fs.existsSync(thumbnail_filename)) fs.unlinkSync(thumbnail_filename);
        if(fs.existsSync(symlink_geocoding_filename)) fs.unlinkSync(symlink_geocoding_filename);
        if(fs.existsSync(symlink_photo_filename)) fs.unlinkSync(symlink_photo_filename);

        root_path = path.join(__dirname, 'data');
        filename= path.join('folder1','folder11','arbre_gps.jpeg');
        photo = new Photo(root_path,filename);
	})
    
   it('should archive photo in archive directory', async () => {
        let archived = await photo.archive(archive_path,undefined,undefined);
        expect(archived.archive_filename).toEqual(archive_filename)
        expect(archived.thumbnail_filename).toEqual(thumbnail_filename)
        expect(fs.existsSync(archive_filename)).toBeTruthy();
        expect(fs.existsSync(thumbnail_filename)).toBeTruthy();
    });

    //  // https://jestjs.io/docs/en/asynchronous
     it('should generate reverse geocoding data', async ()  =>   {
        let archived = await photo.archive(archive_path,thumbnail_path,photos_path);
        expect(archived.symlink_geocoding_filename).toEqual(symlink_geocoding_filename);
        expect(archived.symlink_photo_filename).toEqual(symlink_photo_filename);        
        expect(fs.existsSync(symlink_geocoding_filename)).toBeTruthy();
        expect(fs.existsSync(symlink_photo_filename)).toBeTruthy();
        // expect(mime.lookup(geoFilename)).toEqual("image/jpeg");
    });
 
   it('Get date from file creation date', async () => {

        const spiedPhoto = spy(photo);
        when(spiedPhoto.getExifTags()).thenReturn(undefined);
        let archived = await photo.archive(archive_path,thumbnail_path,photos_path);
        expect(archived.symlink_geocoding_filename).toEqual("");
    
   });


});