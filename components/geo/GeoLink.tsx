'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { buildGeoHref } from '@/lib/geo/query/geoLink';
import { cn } from '@/lib/utils';

interface GeoLinkProps extends React.ComponentPropsWithoutRef<typeof Link> {
  href: string;
  children: React.ReactNode;
  className?: string;
  prefetch?: boolean;
}

export function GeoLink({
  href,
  children,
  className,
  prefetch,
  ...props
}: GeoLinkProps) {
  const searchParams = useSearchParams();
  const geoHref = buildGeoHref(href, searchParams);

  return (
    <Link
      href={geoHref}
      className={className}
      prefetch={prefetch}
      {...props}
    >
      {children}
    </Link>
  );
}

