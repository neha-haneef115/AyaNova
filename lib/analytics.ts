// lib/analytics.ts
export const GA_TRACKING_ID = "G-ZXRH6CD3XM";

// Pageview tracking
export const pageview = (url: string) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// Event tracking
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};