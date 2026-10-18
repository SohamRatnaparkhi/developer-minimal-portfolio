import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleBlockProps {
  children: React.ReactNode;
  /** Collapsed height in px. Content shorter than this is never collapsed. */
  maxHeight?: number;
  className?: string;
}

/**
 * Clamps tall content to `maxHeight` with a fade, plus a Show more / Show less
 * toggle. Short content renders untouched.
 */
const CollapsibleBlock: React.FC<CollapsibleBlockProps> = ({ children, maxHeight = 260, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > maxHeight + 24);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [maxHeight]);

  const collapsed = overflows && !open;

  return (
    <div className={className}>
      <div
        ref={ref}
        className="relative overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{ maxHeight: collapsed ? maxHeight : undefined }}
      >
        {children}
        {collapsed && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
        )}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline underline-offset-4"
        >
          {open ? 'Show less' : 'Show more'}
          <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default CollapsibleBlock;
