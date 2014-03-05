# generator-webapp

## Depandency

Those modules are required in global.

### node     : v0.10.25

    sudo brew install node

### yo       : latest

    npm install -g yo

### easymock(optional) : 0.2.5

    npm install -g easymock

## Outline

This generator is made based on [generator-webapp](https://github.com/yeoman/generator-webapp)

## Usage

### install

    $ git clone https://github.com/kashiro/generator-webapp.git
    $ cd generator-webapp
    $ npm insatll -g .
  
### initialize

    $ yo webapp ${appName}

## Additional function

Following functions will be added.

- jade task
- easymock task

## Attention

Due to a bug correspondence of grunt-connect-proxy
You should comment out following line of generated folders.


file: `node_modules/grunt-connect-proxy/lib/utils.js`

line:

```javascript
utils.log.verbose.....
```

* There are 3 line utils.log.verbose are used.

