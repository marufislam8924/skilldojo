"use client";

import { useCallback, useEffect, useRef } from "react";
import { trackEvent, trackSessionDuration } from "../lib/analytics";

export function useAnalytics(pageName = "unknown") {
  const sessionStartRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    sessionStartRef.current = Date.now();

    trackEvent("page_view", {
      page_name: pageName,
      path: window.location.pathname,
    });

    const flushSession = () => {
      if (!sessionStartRef.current) return;
      const elapsed = Date.now() - sessionStartRef.current;
      if (elapsed <= 0) return;

      trackSessionDuration(elapsed, pageName);
      sessionStartRef.current = Date.now();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        flushSession();
      }
    };

    window.addEventListener("beforeunload", flushSession);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      flushSession();
      window.removeEventListener("beforeunload", flushSession);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [pageName]);

  const trackCTA = useCallback(
    (ctaName, payload = {}) => {
      trackEvent("cta_click", {
        page_name: pageName,
        cta_name: ctaName,
        ...payload,
      });
    },
    [pageName]
  );

  const trackCustom = useCallback(
    (eventName, payload = {}) => {
      trackEvent(eventName, {
        page_name: pageName,
        ...payload,
      });
    },
    [pageName]
  );

  return {
    trackCTA,
    trackCustom,
  };
}
