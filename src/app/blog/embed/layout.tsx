export const metadata = {
  title: "BVP Optica Blog Embed",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Embed pages render without the main site Navbar/layout chrome.
  // The root layout still wraps this, but the embed pages handle
  // their own minimal styling. The navbar is hidden via CSS class.
  return (
    <div className="embed-container" data-embed="true">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            [data-embed="true"] ~ * { display: none !important; }
            nav, .custom-cursor, header { display: none !important; }
            #main-content { padding: 0 !important; margin: 0 !important; }
            body { background: #0E1A2B !important; }
          `,
        }}
      />
      {children}
    </div>
  );
}
