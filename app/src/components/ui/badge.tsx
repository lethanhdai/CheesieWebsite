import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-cheesie-burgundy text-cheesie-surface shadow',
        secondary:
          'border-cheesie-line bg-cheesie-surface-muted text-cheesie-graphite',
        outline:
          'border border-cheesie-line text-cheesie-muted bg-transparent',
        tag:
          'border border-cheesie-line/70 bg-cheesie-surface/90 text-cheesie-burgundy font-bold shadow-station-sm backdrop-blur-sm',
        station:
          'border border-cheesie-steel/30 bg-cheesie-graphite text-cheesie-surface text-[9px] tracking-widest uppercase',
        status:
          'border border-emerald-500/20 bg-emerald-50 text-emerald-800 text-[10px] font-medium',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
