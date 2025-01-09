# Fixes for 

In `\node_modules\gatsby-remark-prismjs\highlight-code.js` adjust in the following way, because otherwise jsx/tsx will not properly be highlighted (highlighted code lines):

```js
codeSplits.forEach((split, idx) => {
  finalCode += split.highlight ? split.code : `${split.code}`;
  // finalCode += split.highlight ? split.code : `${split.code}${idx == lastIdx ? `` : `\n`}`;
});
```