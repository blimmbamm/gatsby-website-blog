# Fixes for 

In `\node_modules\gatsby-remark-prismjs\highlight-code.js` adjust in the following way, because otherwise jsx/tsx will not properly be highlighted (highlighted code lines):

```js
codeSplits.forEach((split, idx) => {
  finalCode += split.highlight ? split.code : `${split.code}`;
  // finalCode += split.highlight ? split.code : `${split.code}${idx == lastIdx ? `` : `\n`}`;
});
```

In `node_modules\prismjs\plugins\line-highlight\prism-line-highlight.css`, use this rule:

```css
@media print {
	.line-highlight {
		/*
		 * This will prevent browsers from replacing the background color with white.
		 * It's necessary because the element is layered on top of the displayed code.
		 */
		-webkit-print-color-adjust: exact;
		print-color-adjust: exact; /* previously was only 'color-adjust' and thus webpack complained*/
	}
}
```