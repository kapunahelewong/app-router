// "use client";
import { builder } from "@builder.io/sdk";

// Replace with your Public API Key.
builder.init("2b5ffc858d74425485135b88d2fc307a");

export default async function Home() {
  const links = await builder.getAll("nav-link", { prerender: false });
  //   console.log("Rendering nav links:", links);
  return (
    <>
      <header>
        <nav>
          {links.map((link, index) => (
            <a key={index} href={link.data.url}>
              {link.data.label}
            </a>
          ))}
        </nav>
      </header>
      {/* <RestOfYourPage /> */}
    </>
  );
}
