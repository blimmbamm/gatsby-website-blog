import React from "react";

export default function HeadTag(props: {
  title: string;
  description: string;
  keywords: readonly (string | null)[];
}) {
  return (
    <>
      <title>{`${props.title} | Robin Heinz`}</title>
      <meta name="description" content={props.description} />
      <meta name="author" content="Robin Heinz" />
      <meta name="keywords" content={props.keywords.join(", ")} />
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
    </>
  );
}
