# temperature monitoring service
ES6, Sass, Gulp, Node.js, MongoDB, Express

###Installation

`npm install gulp -g`

`npm i`

`gem install neat`

`gem install sass`

`gem install bourbon`

`bourbon install`

`neat install`

###Usage

use `forever` or `nodemon` to run node.js.

installation:
`npm install -g forever` or
`npm install -g nodemon`

to run the server:
`forever start index.js` or
`nodemon index.js`

to stop the server:
`forever stop index.js` or
`ctrl+c` if using nodemon

run task `gulp` for development compilation.

default url: http://localhost:8001

##Production info
To run on a remote server, use the following task.

`sudo NODE_ENV=prod forever start index.js`

`NODE_ENV=prod` tells the application to run on port 80.
