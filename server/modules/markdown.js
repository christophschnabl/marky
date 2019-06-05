const MarkdownIt = require('markdown-it'),
      md = new MarkdownIt();


const render = (text) => {
  return md.render(text);
}


module.exports = {
  Render: render
}
