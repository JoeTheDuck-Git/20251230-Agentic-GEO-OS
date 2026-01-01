import { cn } from '@/lib/utils';

export type SourceCategory = "Authority" | "Docs" | "Forum" | "Research" | "Vendor" | "Open Source";

interface SourceCategoryChipsProps {
  categories: SourceCategory[];
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function SourceCategoryChips({
  categories,
  max = 2,
  size = "sm",
  className,
}: SourceCategoryChipsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const displayCategories = categories.slice(0, max);
  const remainingCount = categories.length - max;

  const sizeClasses = size === "sm" ? "text-xs px-2 py-0.5" : "text-xs px-2 py-1";

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {displayCategories.map((category, index) => (
        <span
          key={index}
          className={cn(
            "inline-flex items-center rounded border bg-muted/50 text-muted-foreground",
            sizeClasses
          )}
        >
          {category}
        </span>
      ))}
      {remainingCount > 0 && (
        <span
          className={cn(
            "inline-flex items-center rounded border bg-muted/50 text-muted-foreground",
            sizeClasses
          )}
        >
          +{remainingCount}
        </span>
      )}
    </div>
  );
}

