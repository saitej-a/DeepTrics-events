import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

/**
 * Top-level error boundary so a runtime failure never leaves a blank screen.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('DeepTrics runtime error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-center">
          <div>
            <p className="eyebrow">Something went wrong</p>
            <h1 className="display mt-4 text-4xl text-ivory">A quiet interruption.</h1>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 inline-flex items-center gap-2 border border-gold/40 px-6 py-3 text-sm uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Reload the experience
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
