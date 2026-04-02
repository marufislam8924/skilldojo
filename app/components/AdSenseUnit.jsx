"use client";

import { useEffect } from "react";

export default function AdSenseUnit({
  slot,
  format = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
}) {
  const client = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT;

  useEffect(() => {
    if (!client || !slot) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore duplicate/early pushes during hydration and route transitions.
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...(style || {}) }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}
