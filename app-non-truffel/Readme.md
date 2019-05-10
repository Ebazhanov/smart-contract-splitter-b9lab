How to
------

#### Preparation stepts
* switch to app directory by `cd app/`
* make sure you did
    * `$ npm install`
    * `$ ./node_modules/.bin/truffle unbox metacoin`
    * `$ truffle compile`
    
#### Run the test
* check that you are still in `app/` directory
    > `$ npm test test/metacoin_standalone.js`
    

#### Tip's
* If you are facing an error like TypeError: Invalid entropy, try:
    > `$ npm install bip39@2.3.0 --save-dev`

