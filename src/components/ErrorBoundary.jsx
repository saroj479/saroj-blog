"use client";

import { Component } from "react";

/**
 * Global error boundary — catches render crashes in any child component
 * and shows a friendly fallback instead of a blank page.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center px-4 text-center">
          <h2 className="mb-2 text-xl font-bold">Something went wrong</h2>
          <p className="mb-4 text-sm text-secondary">
            An unexpected error occurred. Please refresh the page.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
              window.location.reload();
            }}
            className="rounded-lg bg-accent1 px-6 py-2 text-sm font-medium text-white transition hover:bg-accent1-80"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
