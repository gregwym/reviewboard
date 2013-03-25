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

/* Linkify all URLs in the text */
function linkifyURLs(text) {
    text = text.replace(
        /\b([a-z]+:\/\/[\-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*([\-A-Za-z0-9+@#\/%=~_();|]|))/g,
        function(url) {
            /*
             * We might catch an entity at the end of the URL. This is hard
             * to avoid, since we can't rely on advanced RegExp techniques
             * in all browsers. So, we'll now search for it and prevent it
             * from being part of the URL if it exists. However, a URL with
             * an open bracket will not have its close bracket removed. This
             * was a modification to the original bug fix.
             *
             * See bug 1069.
             */

            var extra = '',
                parts = url.match(/^(.*)(&[a-z]+;|\))$/),
                openParen = url.match(/.*\(.*/);

            if (parts !== null && openParen === null) {
                /* We caught an entity. Set it free. */
                url = parts[1];
                extra = parts[2];
            }

            return '<a target="_blank" href="' + url + '">' + url + '</a>' + extra;
        });
    return text;
}

/* Linkify /r/#/ review request numbers in the text */
function linkifyReviewRequests(text) {
    text = text.replace(
        /(^|\s|&lt;)\/(r\/\d+(\/[\-A-Za-z0-9+&@#\/%?=~_()|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|])?)/g,
        '$1<a target="_blank" href="' + SITE_ROOT + '$2">/$2</a>');
    return text;
}

/* Linkify Bug numbers in the text */
function linkifyBugNumbers(text) {
    if (gBugTrackerURL !== "") {
        text = text.replace(/\b(bug|issue) (#([^.\s]+)|#?(\d+))/gi,
            function(text, m2, m3, bugnum1, bugnum2) {
                /*
                 * The bug number can appear in either of those groups,
                 * depending on how this was typed, so try both.
                 */
                var bugnum = bugnum1 || bugnum2;

                return '<a target="_blank" href="' +
                       gBugTrackerURL.replace("%s", bugnum) +
                       '">' + text + '</a>';
            });
    }
    return text;
}

/*
 * Linkifies a block of text, turning URLs, /r/#/ paths, nad bug numbers
 * into clickable links.
 *
 * @param {string} text  The text to linkify.
 *
 * @returns {string} The resulting HTML.
 */
function linkify(text) {
    // text = text.htmlEncode();

    /* Linkify all URLs. */
    text = linkifyURLs(text);

    /* Linkify /r/#/ review request numbers */
    text = linkifyReviewRequests(text);

    /* Bug numbers */
    text = linkifyBugNumbers(text);

    return text;
}
