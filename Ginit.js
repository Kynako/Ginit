// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: cube;
/*!
 * Ginit.js
 *
 * Copyright (c) ©︎ 2021 Kynako
 *
 * This software is released under the MIT license.
 * https://github.com/Kynako/Ginit/blob/main/LICENSE
*/

/* # Example
   let list = [
     'Jhon/MyRepo/main/index.js',
     {
       dir: 'modules/',
       list: [
         'Jhon/MyRepo/main/modules/funcA.js',
         'Smith/UsefulLib/master/src/AAAAA.js'',
         {
           dir: 'images/',
           list: [
             'Kynako/MyRepo/main/modules/imgs/img.png'
           ]
         }
       ]
     }
   ];
   let fm = FileManager.iCloud();
   let root = fm.documentsDirectory();
   let ginit = new Ginit();
   await ginit.set(list, root);

  # Result
   iCloud/Scriptable/
   ├ index.js
   ├ modules/
   │ ├ funcA.js
   │ └ AAAAA.js
   └ images/
     └ img.png
*/
class Ginit {
  constructor(){
    this.fm = FileManager.iCloud();
    this.base = 'https://raw.githubusercontent.com/'
  };
  
  async set(list, parent, hierarky=0){
    let tab = '  '.repeat(hierarky)
    for(let data of list){
      if(typeof data === 'object'){
        console.warn(`${tab}${data.dir}`)
        let familly = parent + data.dir;
        if(!this.fm.fileExists(familly)){
          fm.createDirectory(familly, false);
        };
        await this.set(
          data.list,
          parent + data.dir,
          hierarky + 1
        );
      } else if(typeof data === 'string'){
        console.warn(`${tab}${data}`)
        let fileName = this.fm.fileName(data, true);
        let filePath = parent + fileName;
        if(!this.fm.fileExists(filePath)){
          console.log(`${tab}NOT EXISTS`);
          await this._load(data, parent, tab);
        };
        console.log(`${tab}EXISTS`);
      } else {
        console.error('Error');
      };
    }
  };
  
  async _load(data, parent, tab){
    try {
      let url = this.base + data;
      console.log(`${tab}url: ${url}`)
      let r = new Request(url);
      let res = await r.load();
      if(r.response.statusCode >= 400){
        throw this._pj(r.response);
      }
      let fileName = this.fm.fileName(data, true);
      console.log(`${tab}${parent+fileName}`);
      this.fm.write(parent+fileName, res)
    } catch (e) {
      console.error(e)
    }
      
  };
  
  _pj(value){
    return JSON.stringify(value, null, 2);
  }
};
module.exports = Ginit;