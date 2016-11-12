# Node Sass Asset Inliner

Maybe we don't need another one of these modules, but here it is.

I was pretty dissatisfied with the existing options, which, in any number of ways, seemed to subvert the standard Gulp workflow by modifiying files after they'd been written to the destination or before Sass ever had a chance to touch them.

This little helper is used with the `node-sass` `functions` option, which accepts an object of function signatures and closures that are then passed to `libsass` for use in your stylesheets. This is listed as an experimental function, even for `libsass`, so use at your own risk.

All we're doing is:

1. Resolving the passed asset's full path;
2. Reading it from the disk;
3. Inferring the mime-type from the file's extension;
4. Encoding the asset as `base64`.

Other asset-inlineing libraries seemed to be opinionated about which file types could be passed, and had special logic for each.

We're not making assumptions, but _are_ expressing an opinion about the encoding type. Even though some formats (looking at you, SVG) can be more efficiently transmitted as url-encoded XML, some browsers have trouble rendering it. `base64` has been more reliable, and we've adopted it here, despite its inefficiencies.

Note that it's the implementing developer's responsibility to maintain control of the size of their stylesheet. Please use with caution, and make use of `gzip` where possible—especially if you're including the same asset multiple times.

## Usage

This has only been tested with Gulp.

Add it to your `npm` manifest:

```
$ npm install --save https://github.com/AugustMiller/sass-inline-asset.git
```

In your Gulpfile, make sure it's `require`d, then pass the `functions` option to your sass call:

```js
var sassInlineAsset = require('sass-inline-asset');

// ...

return gulp.src('path/to/your/stylesheet.sass')
  .pipe(sass({
    functions: sassInlineAsset()
  }).on('error', sass.logError))
  .pipe(gulp.dest('path/to/your/built/stylesheet'));
```

In any of the sass files downstream from your `src`, simply call the function. Note that it's only useful inside a standard CSS `url()` call:

```sass
body
  background-image: url(inline-asset('assets/images/example.svg'))
```

Consider this a first stab. No tests, no warranty.

:deciduous_tree:
