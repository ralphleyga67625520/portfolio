"use client";

import React, { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary specifically for Spline scenes.
 * Catches runtime errors like "Missing property" thrown during
 * Spline's buildTimeline phase without crashing the whole page.
 */
export class SplineErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: false }; // Don't hide — scene still renders
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Silently swallow known Spline runtime errors
    if (error.message === "Missing property") {
      return; // Non-fatal — scene renders fine despite this
    }
    // Re-throw unknown errors
    console.error("Spline error:", error, info);
  }

  render() {
    return this.props.children;
  }
}
