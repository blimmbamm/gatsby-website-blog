import React from 'react';
import Layout from './src/components/Layout/Layout';

import "./src/styles/prism-theme.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "./src/styles/markdown.css";
import "./src/global.css";

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
