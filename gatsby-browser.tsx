import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './src/components/Layout';


// import "prismjs/themes/prism-solarizedlight.css";
import "./src/styles/prism-theme.css";
import "prismjs/plugins/line-highlight/prism-line-highlight.css";
import "./src/global.css";

const queryClient = new QueryClient();

const RootElement = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>;
};


// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
export const wrapPageElement = ({ element, props }) => (
  <Layout {...props}>{element}</Layout>
)
