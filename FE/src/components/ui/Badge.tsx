interface BadgeProps {
  content: string[];
  className?: string;
}

export function Badge({ content, className }: BadgeProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
      {content.map((item) => (
        <li
          key={item}
          className={`border px-2 py-1 font-p text-[10px] uppercase tracking-[0.14em] ${
            className ?? "border-ink/20 text-ink/70"
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
