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

  const announcementBarContent = await builder
    // Get the page content from Builder with the specified options
    .get("announcement-bar", {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      // Set prerender to false to prevent infinite rendering loops
      prerender: false,
    })
    // Convert the result to a promise
    .toPromise();

  // This is an example of how to use a Builder data model
  const links = await builder.getAll("nav-link", { prerender: false });

  return (
    <>
      <Head>
        <title>{content?.data.title}</title>
      </Head>
      <nav style={{ marginTop: 20 }}>
        {links.map((link, index) => (
          <a style={{ margin: 10 }} key={index} href={link.data?.url}>
            {link.data?.label}
          </a>
        ))}
      </nav>

      {/* This is an example of how to add a builder section to the page */}
      <RenderBuilderContent
        model="announcement-bar"
        content={announcementBarContent}
      />
      {/* Render the Builder page */}
      <RenderBuilderContent model="page" content={content} />
    </>
  );
}
