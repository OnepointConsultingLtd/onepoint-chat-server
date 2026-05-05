import { MdOutlineCloudOff, MdRefresh } from 'react-icons/md';

export default function ErrorCard({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="w-full max-w-md rounded-xl border border-[color:var(--osca-border-light)] bg-[color:var(--osca-bg-light)] shadow-sm dark:border-[color:var(--osca-border-dark)] dark:!bg-[color:color-mix(in_srgb,var(--osca-bg-dark)_98%,#0f172a)]"
        role="alert"
        aria-live="polite"
      >
        <div className="flex gap-4 p-6 sm:p-7">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800/90 dark:text-slate-300"
            aria-hidden
          >
            <MdOutlineCloudOff className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:!text-[color:var(--osca-text-on-dark)]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {message}
              </p>
            </div>
            <div className="pt-1">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm ring-2 ring-[color:color-mix(in_srgb,var(--osca-accent)_35%,transparent)] transition-[background-color,box-shadow] hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--osca-bg-light)] dark:border-slate-600 dark:bg-slate-100 dark:text-slate-900 dark:ring-[color:color-mix(in_srgb,var(--osca-accent)_45%,transparent)] dark:hover:bg-white dark:focus-visible:ring-slate-500 dark:focus-visible:ring-offset-[color:var(--osca-bg-dark)]"
              >
                <MdRefresh className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
