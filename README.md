# Ginit
Import scripts from guthub easily

## Usage
```javascript
let list = [
  'Kynako/Ginit/main/Ginit.js',
  'Kynako/Ginit/main/Example.js',
  {
    dir: 'GinitTestDir/',
    list: [
      'Kynako/Ginit/main/LICENSE',
      'Kynako/Ginit/main/README.md'
      {
        dir: 'images',
        list: [
          'Kynako/Ginit/main/images/Kynako.jpeg'
        ]
      }
    ]
  }
];
const ginit = new Ginit();
await ginit.set(list);
```

## Requirememt
- Scriptable v1.6.3

## License
[MIT license](/LICENSE)
