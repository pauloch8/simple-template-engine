# Simple template engine

This is an exemple of creation of a simple template engine mechanism.

## app.engine() method
Engine method of express's app object is used to create the template engine. 

As parameters it recieves the **name of the engine** and a **function** with three params:
* **filePath :** The path to the template file. It has to be readed to retrieve the content
* **options :** An object passed by the app script with the contents to replace in the template's placeholders
* **callback :** An optional function that can be passed from the caller

```js
app.engine('md', async (filePath, options, callback) => {
    try{
        const content = await fsreadfile(filePath);
        const rendered = content.toString().replace('{headline}', options.headline);
        return callback(null, marked(rendered));
    }catch(err){
        return callback(err);
    }
});
```

## set as the template engine
```js
app.set('views', 'views-folder');
app.set('view engine', 'md');
```

## call render method from the router
```js
app.get('/', (req, res) => {
    return res.render('index', {headline: 'Hello World'});
});
```
