// works for Pages and Sections
// app/[[...page]]/page.tsx
import { builder } from "@builder.io/sdk";
import Head from "next/head";
import { RenderBuilderContent } from "@/components/builder";

// Replace with your Public API Key
builder.init("2b5ffc858d74425485135b88d2fc307a");

// Define the expected shape of the props
// object passed to the Page function
interface PageProps {
  params: {
    page: string[];
  };
}

// Async function called Page takes a single
// argument called props of type PageProps
export default async function Page(props: PageProps) {
  const content = await builder
    // Get the page content from Builder with the specified options
    .get("page", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to prevent infinite rendering loops
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} />
      <RenderBuilderContent model="announcement-bar" content={content} />
    </>
  );
}

// SECTIONS
// this returns a 404

// import React from "react";
// import { builder } from "@builder.io/sdk";
// import Head from "next/head";
// import { RenderBuilderContent } from "@/components/builder";

// // Replace with your Public API Key
// builder.init("2b5ffc858d74425485135b88d2fc307a");

// interface PageProps {
//   params: {
//     page: string[];
//   };
// }

// export default async function Page(props: PageProps) {
//   const content = await builder
//     .get("announcement-bar", {
//       prerender: false,
//     })
//     .toPromise();

//   return (
//     <>
//       <Head>
//         <title>{content?.data.title}</title>
//       </Head>
//       {/* Render the Builder page */}
//       <RenderBuilderContent content={content} />
//     </>
//   );
// }

// DATA

// import Home from "../nav-links/page";

// export default function HomePage() {
//   return <Home />;
// }
