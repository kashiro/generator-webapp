# generator-webapp-kashiro

## Outline

This generator is made based on [generator-webapp](https://github.com/yeoman/generator-webapp)

## Addition function

Following functions will be added.

- jade task
- easymock task

## Attention

Due to a bug correspondence of grunt-connect-proxy
you should comment out following line of generated folders.

`node_modules/grunt-connect-proxy/lib/utils.js`

```javascript
utils.log.verbose.....
```
* There are 3 line utils.log.verbose are used.

