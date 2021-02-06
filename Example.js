let list = [
  'Kynako/Ginit/main/Ginit.js',
  'Kynako/Ginit/main/Example.js',
  {
    dir: 'GinitTestDirOniCloud/',
    list: [
      'Kynako/Ginit/main/LICENSE',
      'Kynako/Ginit/main/README.md',
      {
        dir: 'images',
        list: [
          'Kynako/Ginit/main/images/Kynako.jpeg'
        ]
      }
    ]
  }
];
const Ginit = importModule('Ginit')
const ginit = new Ginit();
await ginit.set(list);