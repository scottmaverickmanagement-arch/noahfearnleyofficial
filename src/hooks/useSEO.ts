import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

export const useSEO = ({ title, description }: SEOProps) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute("content") || "";

    if (description) {
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }
    }

    return () => {
      document.title = prevTitle;
      if (prevDescription && metaDescription) {
        metaDescription.setAttribute("content", prevDescription);
      }
    };
  }, [title, description]);
};
