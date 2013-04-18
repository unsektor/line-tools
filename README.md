# line-tools - CLI arguments parser

	Node.js Command Line Interface module. Provides CLI argument parsing.
	Project based on http://goo.gl/bSJIV (Patrick Fisher <patrick@pwfisher.com>)

## Install
First change directory to your project

```bash
# Change Directory to your project
cd <...>/myNodeProjectFolder/
```

Install from NPM:
```bash
npm install line-tools
```

You can also install into your project from source:

```bash
# Install from sources...
git clone git://github.com/unsektor/line-tools.git node_modules/line-tools
```

## Usage

Require line-tools into your project:

```javascript
// ...
var arguments = require('line-tools').parse(process.argv);
// Let's print parse result for example
console.log(arguments);
// ...
```

## License: MIT

```
Copyright (c) 2013 Михаил Драгункин <tm.unsektor>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
