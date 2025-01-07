import React from 'react';
import Layout from './src/components/Layout';

import "./src/styles/prism-theme.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "./src/global.css";

export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
