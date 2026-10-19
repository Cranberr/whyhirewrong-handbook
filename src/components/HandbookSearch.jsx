import { useEffect, useRef, useState } from 'react';

export default function HandbookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef(null);
  const dialogRef = useRef(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;

    async function loadPagefind() {
      if (window.pagefind) return;

      try {
        window.pagefind = await import(/* @vite-ignore */ '/pagefind/pagefind.js');
        await window.pagefind.options({
          baseUrl: '/handbook/',
        });
      } catch (err) {
        if (!cancelled) {
          console.warn('Handbook search index is unavailable.', err);
          setError(true);
        }
      }
    }

    loadPagefind();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!open) return;

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

    function onClickOutside(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  async function search(value) {
    const nextQuery = value;
    const searchId = ++searchIdRef.current;

    setQuery(nextQuery);

    if (!nextQuery.trim() || !window.pagefind) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await window.pagefind.search(nextQuery);

      if (searchId !== searchIdRef.current) return;

      const loaded = await Promise.all(
        response.results.slice(0, 8).map((result) => result.data())
      );

      if (searchId !== searchIdRef.current) return;

      setResults(loaded);
      setError(false);
    } catch (err) {
      if (searchId === searchIdRef.current) {
        console.error('Handbook search failed.', err);
        setResults([]);
        setError(true);
      }
    } finally {
      if (searchId === searchIdRef.current) {
        setLoading(false);
      }
    }
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

              {error && !loading && (
                <p className="px-5 py-4 text-sm text-neutral-500">
                  Search is unavailable. Run <code>npm run build</code> to generate the Pagefind index.
                </p>
              )}

              {!loading && !error && query && results.length === 0 && (
                <p className="px-5 py-4 text-sm text-neutral-500">
                  No results. Try “scorecard”, “outreach”, “pricing”, or “AI”.
                </p>
              )}

              {!query && !loading && !error && (
                <p className="px-5 py-4 text-sm text-neutral-500">
                  Search the handbook. Try “candidate assessment” or “client process”.
                </p>
              )}

              {results.map((result, index) => (
                <a
                  key={result.url ?? `${result.meta?.title ?? 'result'}-${index}`}
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
