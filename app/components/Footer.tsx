import React from "react";

function Footer() {
  return (
    <footer className="border-t border-accent-dark-grey mt-16">
      <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between text-xs md:text-sm text-text-muted">
        <span>AI Research — MVP v1.0</span>
        <span>Built with Next.js + FastAPI</span>
      </div>
    </footer>
  );
}

export default Footer;
