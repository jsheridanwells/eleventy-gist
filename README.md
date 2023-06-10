# Eleventy Gist
An [Eleventy](https://www.11ty.dev/) plugin to display your Github gists in markdown.

This plugin came from the process of converting a Jekyll site to one generated with Eleventy. In the old site, I made extensive use of the [jekyll-gist](https://github.com/jekyll/jekyll-gist) gem for rendering code snippets from [Github Gist](https://gist.github.com/). After copying markdown files from the old to the new `_posts` directories, I had to figure out how to avoid manually replacing a bunch of `{% gist %}` shortcodes. __Eleventy Gist__ helps replace the Jekyll Gist gem in Javascript-based static site generators. 

## Installation and setup

1. You will need a Github personal access token. [These instructions should help](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). If the token is scoped to just Github Gist, that should be okay.

2. In the root of your static site project, run:
```
$ npm install eleventy-gist --save-dev
```

3. If you are using this in Eleventy, add the following to your `eleventy.config.js` file:
```javascript
const gist = require('eleventy-gist');

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(gist, {
		authToken: '<MY ACCESS TOKEN FROM STEP ONE, USED FOR AN Authorization HEADER>',
		userAgent: '<NAME TO PASS TO A User-Agent HEADER>'
	});
}
```

## Configuration
The following configuration options are available:

### authToken
 - __type__: string
 - __required__: yes
 - __default?__: none

This is your Github Gist API bearer token (see Installation and setup).

### userAgent
 - __type__: string
 - __required__: yes
 - __default?__: none

This value gets passed to a `User-Agent` header when calling the Github Gist API.

### useCache
 - __type__: boolean
 - __required__: no
 - __default?__: false

If set to true, caches the rendered Gist content after making a first call to the Github Gist API. It is recommended to set it to true while using an eleventy project in development to reduce build times and API traffic.

### debug
 - __type__: boolean
 - __required__: no
 - __default?__: false

If set to true, if there are any errors returned while rendering your Gist, this will render the error in your Eleventy page. _Not recommended for production_. If set to false, eleventy-gist will just render an empty string.

### Example config using environment variables:
```javascript
const config = {
	authToken: process.env.github_access_token,
	userAgent: process.env.github_user_agent,
	debug: process.env.NODE_ENV === 'development', 
	useCache: process.env.NODE_ENV === 'development'
};

module.exports = function(eleventyConfig) {
    eleventyConfig.addPlugin(gist, config);
}
```

## Usage
1. Use the `gist` shortcode as follows in Liquid or Nunjucks templates: 

When you have some code in a Github Gist, get the ID of the Gist and the name of the file with the code, then add those as strings following the `gist` shortcode. For example, at this url [https://gist.github.com/jsheridanwells/1fee874ca9e0addefd0241419dcc561e](https://gist.github.com/jsheridanwells/1fee874ca9e0addefd0241419dcc561e) the Gist ID is `1fee874ca9e0addefd0241419dcc561e` and it has a file called `ng-example.ts`. In your template, fetch the code like this:
```
{% gist '1fee874ca9e0addefd0241419dcc561e' 'ng-example.ts' %}
```

2. If you want to access the main function to fetch the code in a Gist file and output it to markdown:
```javascript
const { gist } = require('eleventy-gist/gist');
const authToken = 'MY ACCESS TOKEN';
const userAgent = 'my-user-agent';
const myCodeInMarkdown = gist('1fee874ca9e0addefd0241419dcc561e', 'ng-example.ts', { authToken, userAgent });
```

__Note:__ If an error is thrown while generating your site with the plugin, the error message will print in the console. The plugin will return an empty string so as to not to completely blow up the process.
