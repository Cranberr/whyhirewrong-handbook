---
import { useEffect, useRef, useState } from 'react';

export default function HandbookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    async function loadPagefind() {
      if (window.pagefind) return;
      try {
        window.pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
        await window.pagefind.options({
          baseUrl: '/handbook/',
        });
      } catch (error) {
        console.warn('Handbook search index is unavailable.', error);
      }
    }

    loadPagefind();
  }, []);

  useEffect(() => {
    function onKeyDown(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  async function search(value) {
    setQuery(value);

    if (!value.trim() || !window.pagefind) {
      setResults([]);
      return;
    }

    setLoading(true);
    const search = await window.pagefind.search(value);
    const loaded = await Promise.all(
      search.results.slice(0, 8).map((result) => result.data())
    );
    setResults(loaded);
    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        className="flex items-center gap-2 rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900"
        aria-label="Search the handbook"
      >
        <span aria-hidden="true">Search</span>
        <kbd className="rounded border border-neutral-300 px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-20">
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Handbook search"
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl"
          >
            <div className="border-b border-neutral-200">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => search(event.target.value)}
                placeholder="Search sourcing, scorecards, pricing, AI…"
                className="w-full bg-transparent px-5 py-4 text-base outline-none"
                aria-label="Search the WhyHireWrong handbook"
              />
            </div>

            <div className="max-h-80 overflow-y-auto">
              {loading && (
                <p className="px-5 py-4 text-sm text-neutral-500">Searching…</p>
              )}

              {!loading && query && results.length === 0 && (
                <p className="px-5 py-4 text-sm text-neutral-500">
                  No results. Try “scorecard”, “outreach”, “pricing”, or “AI”.
                </p>
              )}

              {!query && (
                <p className="px-5 py-4 text-sm text-neutral-500">
                  Search the handbook. Try “candidate assessment” or “client process”.
                </p>
              )}

              {results.map((result) => (
                <a
                  key={result.url}
                  href={result.url}
                  onClick={() => setOpen(false)}
                  className="block border-b border-neutral-100 px-5 py-4 last:border-0 hover:bg-neutral-50"
                >
                  <p className="font-semibold text-neutral-900">{result.meta?.title}</p>
                  <p
                    className="mt-1 line-clamp-2 text-sm text-neutral-600"
                    dangerouslySetInnerHTML={{ __html: result.excerpt }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
