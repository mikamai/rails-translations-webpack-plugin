# rails-translations-webpack-plugin

Shares Rails i18n translations with your javascripts without duplicating contents

## Usage

- Install it with `npm install rails-translations-webpack-plugin --save-dev`
- To access the generated translations remember to install also `json-loader` with `npm install json-loader --save-dev`
- Require it in your `webpack.config.js`:

  ```js
  const RailsTranslationsPlugin = require("rails-translations-webpack-plugin")
  ```
- Add it to your plugins block. See below for options documentation:

  ```js
  plugins: [
    new RailsTranslationsPlugin({
      localesPath: path.resolve(__dirname, "../rails-app/config/locales"),
      root       : "src"
    })
  ]
  ```
- Now you can require the translations from your code. E.g.

  ```js
  // somewhere inside your javascripts
  const translations = require("translations.json")
  console.log(`English translation for hello.world key: ${translations["en"]["hello.world"]}`)
  ```

## Options

The followings are the available options you can set for RailsTranslationsPlugin:

- `localesPath`: Path where to look for yml files. __Default: current dir__
- `pattern`: Pattern used to find yml files. __Default: `**/*.yml`__
- `name`: Name of the generated json file. __Default: translations__
- `root`: Root path of your javascripts. __Default: current dir__

So let's say you have the following file structure:

- config/
  - locales/
    - en.yml
    - it.yml
  - client/
    - app/
      - index.js
    - webpack.config.js

Your webpack entry point is probably `app/index.js`. This can be the configuration for RailsTranslationsPlugin:

```js
{
  root: path.resolve(__dirname, "app"),
  localesPath: path.resolve(__dirname, "../config/locales"),
  name: "my_translations"
  pattern: "*.yml"
}
```

Your `client/app/index.js` will then be able to require the translations with:

```js
const translations = require("my_translations.json")
```
