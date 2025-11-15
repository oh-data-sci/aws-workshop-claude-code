import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "AWS Claude Code Blog",
  description: "A blog about building AI-powered applications with Claude Code on AWS",
  keywords: ["AWS", "Claude Code", "AI", "Machine Learning", "Bedrock", "Development"],
  authors: [{ name: "AWS Workshop" }],
  openGraph: {
    title: "AWS Claude Code Blog",
    description: "Learn to build AI-powered applications with Claude Code on AWS",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* AWS Theme Variables - Inline to bypass MIME type issues with CloudFront proxy */
            :root {
              --aws-orange: #FF9900;
              --aws-dark: #232F3E;
              --aws-blue: #146EB4;
              --aws-light-gray: #F2F3F3;
              --aws-dark-gray: #545B64;
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: ui-sans-serif, system-ui, sans-serif;
              background: #ffffff;
              color: #232F3E;
              line-height: 1.6;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
            }

            .bg-aws-orange { background-color: var(--aws-orange); }
            .bg-aws-dark { background-color: var(--aws-dark); }
            .bg-aws-blue { background-color: var(--aws-blue); }
            .text-white { color: white; }
            .text-aws-dark-gray { color: var(--aws-dark-gray); }
            .text-aws-light-gray { color: var(--aws-light-gray); }

            .container { max-width: 1200px; margin: 0 auto; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
            .px-8 { padding-left: 2rem; padding-right: 2rem; }
            .px-12 { padding-left: 3rem; padding-right: 3rem; }
            .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
            .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
            .py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
            .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
            .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
            .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
            .p-12 { padding: 3rem; }
            .mb-16 { margin-bottom: 4rem; }
            .mb-8 { margin-bottom: 2rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mt-auto { margin-top: auto; }

            .text-center { text-align: center; }
            .text-6xl { font-size: 3.75rem; line-height: 1; }
            .text-5xl { font-size: 3rem; line-height: 1; }
            .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }

            .rounded-lg { border-radius: 0.5rem; }
            .rounded-2xl { border-radius: 1rem; }
            .rounded-3xl { border-radius: 1.5rem; }
            .flex-1 { flex: 1 1 0%; }
            .inline-block { display: inline-block; }
            .no-underline { text-decoration: none; }
            .max-w-4xl { max-width: 56rem; }

            /* Button and link styles */
            a {
              text-decoration: none;
            }

            button, a.btn {
              cursor: pointer;
              border: none;
              transition: all 0.3s ease;
              display: inline-block;
            }

            .bg-aws-dark:hover {
              background-color: var(--aws-blue);
            }

            /* Hero gradient background */
            .hero-gradient {
              background: linear-gradient(135deg, #FF9900 0%, #FF9900 100%);
            }

            /* Fade-in animation */
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fadeIn {
              animation: fadeIn 0.8s ease-out forwards;
            }

            .animation-delay-200 {
              animation-delay: 0.2s;
              opacity: 0;
            }

            .animation-delay-400 {
              animation-delay: 0.4s;
              opacity: 0;
            }

            /* Responsive styles for mobile (< 768px) */
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }

            @media (min-width: 768px) {
              .md\\:text-5xl { font-size: 3rem; line-height: 1; }
              .md\\:text-xl { font-size: 1.25rem; line-height: 1.75rem; }
              .md\\:px-8 { padding-left: 2rem; padding-right: 2rem; }
              .md\\:py-4 { padding-top: 1rem; padding-bottom: 1rem; }
              .md\\:py-20 { padding-top: 5rem; padding-bottom: 5rem; }
            }

            /* Button hover effects */
            .btn.bg-aws-dark {
              transition: background-color 0.3s ease, transform 0.2s ease;
            }

            .btn.bg-aws-dark:hover {
              background-color: #146EB4;
              transform: translateY(-2px);
            }

            /* Grid layout */
            .grid { display: grid; }
            .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
            .gap-2 { gap: 0.5rem; }
            .gap-6 { gap: 1.5rem; }
            .flex { display: flex; }
            .flex-col { flex-direction: column; }
            .flex-wrap { flex-wrap: wrap; }
            .h-full { height: 100%; }
            .items-center { align-items: center; }
            .justify-between { justify-content: space-between; }
            .gap-3 { gap: 0.75rem; }

            /* Text colors */
            .text-aws-dark { color: var(--aws-dark); }

            /* Borders */
            .border-2 { border-width: 2px; }
            .border-4 { border-width: 4px; }
            .border-aws-light-gray { border-color: var(--aws-light-gray); }
            .border-aws-orange { border-color: var(--aws-orange); }

            /* Backgrounds */
            .bg-white { background-color: #ffffff; }
            .bg-aws-light-gray { background-color: var(--aws-light-gray); }

            /* Shadows */
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }

            /* Padding utilities */
            .p-8 { padding: 2rem; }
            .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }

            /* Margin utilities */
            .mb-12 { margin-bottom: 3rem; }
            .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }

            /* Max width */
            .max-w-none { max-width: none; }

            /* Transitions */
            .transition-all { transition: all 0.3s ease; }
            .transition-colors { transition: color 0.3s ease; }

            /* Header/Navigation styles */
            .sticky { position: sticky; }
            .top-0 { top: 0; }
            .z-50 { z-index: 50; }

            .hover-logo:hover .bg-aws-orange {
              background-color: var(--aws-blue);
            }

            /* Hide text on small screens */
            .hidden { display: none; }

            @media (min-width: 640px) {
              .sm\\:inline { display: inline; }
            }

            /* Hover effects for post cards */
            .hover\\:border-aws-blue:hover {
              border-color: var(--aws-blue);
            }

            /* Responsive grid for tablets and desktops */
            @media (min-width: 768px) {
              .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
            }

            @media (min-width: 1024px) {
              .lg\\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
            }

            /* Prose styles for markdown content */
            .prose {
              color: var(--aws-dark);
              max-width: 65ch;
            }

            .prose h1, .prose h2, .prose h3, .prose h4 {
              color: var(--aws-dark);
              font-weight: 700;
              margin-top: 2rem;
              margin-bottom: 1rem;
            }

            .prose h1 { font-size: 2.25rem; line-height: 2.5rem; }
            .prose h2 { font-size: 1.875rem; line-height: 2.25rem; }
            .prose h3 { font-size: 1.5rem; line-height: 2rem; }

            .prose p {
              margin-bottom: 1.25rem;
              line-height: 1.75;
            }

            .prose ul, .prose ol {
              margin-top: 1.25rem;
              margin-bottom: 1.25rem;
              padding-left: 1.5rem;
            }

            .prose li {
              margin-bottom: 0.5rem;
            }

            .prose code {
              background-color: var(--aws-light-gray);
              padding: 0.25rem 0.5rem;
              border-radius: 0.25rem;
              font-family: monospace;
              font-size: 0.875em;
            }

            .prose pre {
              background-color: var(--aws-light-gray);
              padding: 1rem;
              border-radius: 0.5rem;
              overflow-x: auto;
              margin: 1.5rem 0;
            }

            .prose pre code {
              background-color: transparent;
              padding: 0;
            }

            .prose a {
              color: var(--aws-blue);
              text-decoration: underline;
            }

            .prose a:hover {
              color: var(--aws-orange);
            }

            .prose strong {
              font-weight: 600;
              color: var(--aws-dark);
            }

            .prose table {
              width: 100%;
              margin: 1.5rem 0;
              border-collapse: collapse;
            }

            .prose th, .prose td {
              border: 1px solid var(--aws-light-gray);
              padding: 0.75rem;
              text-align: left;
            }

            .prose th {
              background-color: var(--aws-light-gray);
              font-weight: 600;
            }

            .prose-lg {
              font-size: 1.125rem;
              line-height: 1.75rem;
            }

            .prose-lg h1 { font-size: 2.5rem; }
            .prose-lg h2 { font-size: 2rem; }
            .prose-lg h3 { font-size: 1.75rem; }
          `
        }} />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="bg-aws-dark text-aws-light-gray py-6 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Built with Claude Code on AWS | Workshop Exercise
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
