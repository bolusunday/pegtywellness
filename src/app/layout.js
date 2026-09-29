import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://pegtywellness.com",
  ),
  title: "Pegty Wellness",
  description: "A blog dedicated to balanced living and holistic health.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Forcefully terminates BOTH API fetch routes and native HTML link-tag prefetching blocks */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // 1. Intercept standard API network fetch triggers
                const originalFetch = window.fetch;
                window.fetch = function (url, options) {
                  if (options && options.headers && (options.headers['X-NextJS-Data'] || options.method === 'HEAD')) {
                    if (typeof url === 'string' && (url.includes('/category/') || url.includes('/about') || url.includes('/blog/'))) {
                      return Promise.reject(new Error('Prefetch blocked for Hostinger compatibility'));
                    }
                  }
                  return originalFetch.apply(this, arguments);
                };

                // 2. Intercept and destroy physical <link rel="prefetch"> tags dynamically injected by Next.js
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                      if (node.tagName === 'LINK' && node.rel === 'prefetch') {
                        node.remove(); // Drops the element locally before the browser can issue a network request
                      }
                    });
                  });
                });
                
                // Monitor document changes early during DOM assembly
                observer.observe(document.documentElement, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-oat text-charcoal font-sans antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
