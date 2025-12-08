import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink } from "lucide-react";

// Import the markdown file as raw text
import architectureMd from "../../docs/ARCHITECTURE.md?raw";

const DocsViewer = () => {
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load the markdown content
    setMarkdown(architectureMd);
    setLoading(false);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    const htmlContent = document.getElementById("markdown-content")?.innerHTML;
    if (htmlContent) {
      const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Agent14 Platform Architecture</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; max-width: 900px; margin: 0 auto; padding: 40px 20px; line-height: 1.6; color: #1a1a2e; }
    h1 { color: #1a365d; border-bottom: 3px solid #d4af37; padding-bottom: 10px; }
    h2 { color: #1a365d; margin-top: 40px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; }
    h3 { color: #2d3748; margin-top: 30px; }
    h4 { color: #4a5568; margin-top: 20px; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #e2e8f0; padding: 12px; text-align: left; }
    th { background: #f7fafc; color: #1a365d; font-weight: 600; }
    tr:nth-child(even) { background: #f8fafc; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    pre { background: #1a1a2e; color: #e2e8f0; padding: 20px; border-radius: 8px; overflow-x: auto; }
    pre code { background: transparent; color: inherit; }
    blockquote { border-left: 4px solid #d4af37; margin: 20px 0; padding-left: 20px; color: #4a5568; }
    a { color: #3182ce; text-decoration: none; }
    a:hover { text-decoration: underline; }
    img { max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; }
    hr { border: none; border-top: 1px solid #e2e8f0; margin: 40px 0; }
    .mermaid { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
    @media print { body { max-width: 100%; } pre { white-space: pre-wrap; } }
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;
      const blob = new Blob([fullHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ARCHITECTURE.html";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <Helmet>
        <title>Architecture Documentation | Agent14</title>
        <meta
          name="description"
          content="Technical architecture documentation for the Agent14 AI-powered restaurant reservation platform."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 print:hidden">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Architecture Documentation
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Auto-synced with source markdown
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleDownloadHtml}>
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML
                </Button>
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Print / PDF
                </Button>
              </div>
            </div>

            {/* Markdown Content */}
            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              {loading ? (
                <div className="p-8 space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ) : (
                <article
                  id="markdown-content"
                  className="prose prose-slate dark:prose-invert max-w-none p-6 sm:p-8 lg:p-12
                    prose-headings:text-foreground
                    prose-h1:text-3xl prose-h1:font-bold prose-h1:border-b prose-h1:border-accent prose-h1:pb-4 prose-h1:mb-6
                    prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                    prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                    prose-h4:text-lg prose-h4:font-medium prose-h4:mt-6 prose-h4:mb-2
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                    prose-pre:bg-[#1a1a2e] prose-pre:border prose-pre:border-border prose-pre:rounded-lg
                    prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:italic
                    prose-table:border-collapse prose-table:w-full
                    prose-th:bg-muted prose-th:border prose-th:border-border prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
                    prose-td:border prose-td:border-border prose-td:px-4 prose-td:py-3 prose-td:text-muted-foreground
                    prose-tr:even:bg-muted/30
                    prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
                    prose-hr:border-border prose-hr:my-8
                    prose-ul:list-disc prose-ul:pl-6 prose-ul:text-muted-foreground
                    prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-muted-foreground
                    prose-li:my-1
                  "
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdown}
                  </ReactMarkdown>
                </article>
              )}
            </div>

            {/* Footer Note */}
            <p className="text-center text-sm text-muted-foreground mt-6 print:hidden">
              This documentation automatically updates when the source{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                docs/ARCHITECTURE.md
              </code>{" "}
              file is modified.
            </p>
          </div>
        </main>

        <Footer />
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          header, footer, .print\\:hidden { display: none !important; }
          main { padding-top: 0 !important; }
          .container { max-width: 100% !important; }
        }
      `}</style>
    </>
  );
};

export default DocsViewer;
