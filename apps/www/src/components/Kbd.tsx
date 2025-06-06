export function Kbd({ children }: { children?: React.ReactNode }) {
  return (
    <div className="hidden rounded-sm border border-black pb-[.05em] shadow-black/50 shadow-sm group-hocus:border-white md:flex">
      <kbd className="no-underline! rounded-sm border-black border-b p-0.5 px-1.5 text-sm leading-[1em] group-hocus:border-white">
        {children}
      </kbd>
    </div>
  );
}
