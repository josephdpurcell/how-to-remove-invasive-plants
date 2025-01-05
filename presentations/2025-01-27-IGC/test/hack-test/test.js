const fs = require("fs");
const markdownInput = fs.readFileSync("test.md");
const markdownPlugin = require("./plugin/markdown/markdown");

// const SCRIPT_END_PLACEHOLDER = "__SCRIPT_END__";

// function createMarkdownSlide(content, options) {
//   options = getSlidifyOptions(options);

//   const notesMatch = content.split(new RegExp(options.notesSeparator, "mgi"));

//   if (notesMatch.length === 2) {
//     content =
//       notesMatch[0] +
//       '<aside class="notes">' +
//       marked(notesMatch[1].trim()) +
//       "</aside>";
//   }

//   // prevent script end tags in the content from interfering
//   // with parsing
//   content = content.replace(/<\/script>/g, SCRIPT_END_PLACEHOLDER);

//   return '<script type="text/template">' + content + "</script>";
// }

// const DEFAULT_SLIDE_SEPARATOR = "\r?\n---\r?\n",
//   DEFAULT_VERTICAL_SEPARATOR = null,
//   DEFAULT_NOTES_SEPARATOR = "^s*notes?:",
//   DEFAULT_ELEMENT_ATTRIBUTES_SEPARATOR = "\\.element\\s*?(.+?)$",
//   DEFAULT_SLIDE_ATTRIBUTES_SEPARATOR = "\\.slide:\\s*?(\\S.+?)$";

// function getSlidifyOptions(options) {
//   const markdownConfig = {};
//   // const markdownConfig = deck?.getConfig?.().markdown;

//   options = options || {};
//   options.separator =
//     options.separator || markdownConfig?.separator || DEFAULT_SLIDE_SEPARATOR;
//   options.verticalSeparator =
//     options.verticalSeparator ||
//     markdownConfig?.verticalSeparator ||
//     DEFAULT_VERTICAL_SEPARATOR;
//   options.notesSeparator =
//     options.notesSeparator ||
//     markdownConfig?.notesSeparator ||
//     DEFAULT_NOTES_SEPARATOR;
//   options.attributes = options.attributes || "";

//   return options;
// }

// function slidify(markdown, options) {
//   options = getSlidifyOptions(options);

//   const separatorRegex = new RegExp(
//       options.separator +
//         (options.verticalSeparator ? "|" + options.verticalSeparator : ""),
//       "mg"
//     ),
//     horizontalSeparatorRegex = new RegExp(options.separator);

//   let matches,
//     lastIndex = 0,
//     isHorizontal,
//     wasHorizontal = true,
//     content,
//     sectionStack = [];

//   // iterate until all blocks between separators are stacked up
//   while ((matches = separatorRegex.exec(markdown))) {
//     const notes = null;

//     // determine direction (horizontal by default)
//     isHorizontal = horizontalSeparatorRegex.test(matches[0]);

//     if (!isHorizontal && wasHorizontal) {
//       // create vertical stack
//       sectionStack.push([]);
//     }

//     // pluck slide content from markdown input
//     content = markdown.substring(lastIndex, matches.index);

//     if (isHorizontal && wasHorizontal) {
//       // add to horizontal stack
//       sectionStack.push(content);
//     } else {
//       // add to vertical stack
//       sectionStack[sectionStack.length - 1].push(content);
//     }

//     lastIndex = separatorRegex.lastIndex;
//     wasHorizontal = isHorizontal;
//   }

//   // add the remaining slide
//   (wasHorizontal ? sectionStack : sectionStack[sectionStack.length - 1]).push(
//     markdown.substring(lastIndex)
//   );

//   let markdownSections = "";

//   // flatten the hierarchical stack, and insert <section data-markdown> tags
//   // for (let i = 0, len = sectionStack.length; i < len; i++) {
//   //   // vertical
//   //   if (sectionStack[i] instanceof Array) {
//   //     markdownSections += "<section " + options.attributes + ">";

//   //     sectionStack[i].forEach(function (child) {
//   //       markdownSections +=
//   //         "<section data-markdown>" +
//   //         createMarkdownSlide(child, options) +
//   //         "</section>";
//   //     });

//   //     markdownSections += "</section>";
//   //   } else {
//   //     markdownSections +=
//   //       "<section " +
//   //       options.attributes +
//   //       " data-markdown>" +
//   //       createMarkdownSlide(sectionStack[i], options) +
//   //       "</section>";
//   //   }
//   // }

//   // return markdownSections;
//   return sectionStack;
// }


// TODO: right now I'm just using this to quickly do a breakpoint but this could become a proper test if I wanna contrib back
const output = markdownPlugin().slidify(markdownInput.toString(), {
  // separator: "^\n(?=##.*)",
  separator: "^##",
  verticalSeparator: "^\r?\n---[\r\n]*",
  // notesSeparator: "",
});

const expected = `<section>
          <section data-markdown>
            <script type="text/template">
              ## Slide 1

              Content
            </script>
          </section>
          <section data-markdown>
            <script type="text/template">
              ## Slide 2

              Content
            </script>
          </section>
        </section>
        <section>
          <section data-markdown>
            <script type="text/template">
              ## Slide 3

              Content
            </script>
          </section>
          <section data-markdown>
            <script type="text/template">
              ## Slide 4

              Content
            </script>
          </section>
        </section>`;
console.log(output);
