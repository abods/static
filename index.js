var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-markdown');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var metadata = require('metalsmith-metadata');
var drafts = require('metalsmith-drafts');

Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./src')
  .destination('./build')
  .clean(true)

  // .use(collections({
  // service: {
  //   pattern: 'service/*.md',
  //   sortBy: 'date',
  //   reverse: true
  // }
  // }))
  .use(collections({          // group all blog posts by internally
    myshit: 'project/*.md'       // adding key 'collections':'posts'
  }))
  .use(drafts())

  .use(markdown())
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
