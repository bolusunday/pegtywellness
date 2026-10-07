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
  title: {
    default: "Pegty Wellness | Cultivating Peace in a Busy World",
    template: "%s | Pegty Wellness",
  },
  description:
    "Cultivating Peace in a Busy World. Discover holistic health, somatic movement, ergonomics, and natural wellness tips.",
  openGraph: {
    title: "Pegty Wellness | Cultivating Peace in a Busy World",
    description:
      "Cultivating Peace in a Busy World. Discover holistic health, somatic movement, ergonomics, and natural wellness tips.",
    url: "https://pegtywellness.com",
    siteName: "Pegty Wellness",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pegty Wellness",
    description: "Cultivating Peace in a Busy World",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
