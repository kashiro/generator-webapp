# generator-webapp

## Outline

This generator is made based on [generator-webapp](https://github.com/yeoman/generator-webapp)

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

