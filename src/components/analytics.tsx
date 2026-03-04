"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export function Analytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    posthog.init(key, {
      api_host: "https://fw.forecastwine.com",
      ui_host: "https://eu.i.posthog.com",
      autocapture: false,
      capture_pageview: true,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_scroll_properties: true,
      enable_heatmaps: false,
      persistence: "localStorage",
    });
  }, []);

  return null;
}
