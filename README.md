# Languagecontrol

This is a Webapp to manage multiple languages for multiple application. You can easily create new terms in multiple languages and assign them to all of your applications. You can access the term in all languages through the declined variable.


Build with Angular, NodeJS & PostgreSQL


### Getting Started

Install via Docker

1. Create Docker Image 
``` docker build -t languagecontrol . ```

2. Run Image
``` docker run -d -p 5434:9000 --name languagecontrol <containername>```


### Development
   ```bash
$ git clone https://github.com/juli0n/languagecontrol.git
$ cd languagecontrol
$ npm install
```


### Upcoming Features
- [ ] CSV Import
- [ ] More default languages (spanish, french)




### License
The MIT License (MIT)

Copyright (c) 2021 [juli0n](https://www.google.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


