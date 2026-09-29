import { Component, ReactNode } from 'react';
export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {}
  render() {
    return this.state.failed ? (
      <main className="grid min-h-screen place-items-center bg-slate-50">
        <section className="rounded-2xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-2xl font-bold">Что-то пошло не так</h1>
          <p className="mt-2 text-slate-500">Перезагрузите страницу и попробуйте снова.</p>
          <button
            className="primary mt-5 rounded-xl bg-indigo-600 px-4 py-3 text-white"
            onClick={() => window.location.reload()}
          >
            Перезагрузить
          </button>
        </section>
      </main>
    ) : (
      this.props.children
    );
  }
}
