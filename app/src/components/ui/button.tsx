import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-cheesie-burgundy text-cheesie-surface hover:bg-cheesie-burgundy-hover shadow-station-sm',
        secondary:
          'bg-cheesie-surface-muted text-cheesie-graphite hover:bg-cheesie-surface border border-cheesie-line shadow-station-sm',
        outline:
          'border border-cheesie-line bg-transparent text-cheesie-graphite hover:bg-cheesie-surface-muted hover:border-cheesie-steel',
        ghost:
          'text-cheesie-graphite hover:bg-cheesie-surface-muted hover:text-cheesie-burgundy',
        link: 'text-cheesie-burgundy underline-offset-4 hover:underline p-0 h-auto font-medium',
        station:
          'bg-cheesie-burgundy text-cheesie-surface hover:bg-cheesie-burgundy-hover shadow-station-md hover:shadow-station-hover border border-cheesie-burgundy-light/20',
        stationOutline:
          'border border-cheesie-line bg-cheesie-surface text-cheesie-graphite hover:border-cheesie-burgundy hover:text-cheesie-burgundy shadow-station-sm',
      },
      size: {
        default: 'h-11 px-5 py-2.5',
        sm: 'h-9 rounded-md px-3.5 text-[11px]',
        lg: 'h-13 rounded-lg px-7 text-sm font-bold',
        icon: 'h-10 w-10 p-0 rounded-full',
        iconSm: 'h-8 w-8 p-0 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
