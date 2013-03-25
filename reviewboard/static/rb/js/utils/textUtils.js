// If `marked` is defined, initialize it with markdown options
if(typeof marked == 'function') {
    marked.setOptions({
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        langPrefix: 'language-',
        highlight: function(code, lang) {
            // Use google code prettify to render syntax highlight with line num.
            return prettyPrintOne(code, lang, true);
        }
    });
}
