// frontend/src/components/ui/primitives.jsx
import React from 'react';
import { cn } from '@/lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
  const variants = {
    default: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-active)]',
    outline: 'border border-[var(--color-hairline)] bg-white text-[var(--color-ink)] hover:bg-[var(--color-canvas-soft)]',
    ghost: 'text-[var(--color-ink-secondary)] hover:bg-white',
    subtle: 'bg-[var(--color-canvas-soft)] text-[var(--color-ink-secondary)] hover:bg-white',
    link: 'h-auto p-0 text-[var(--color-primary)] underline-offset-4 hover:underline',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
  };
  const sizes = {
    default: 'h-11 px-5 py-2.5',
    sm: 'h-9 px-3.5 py-2',
    lg: 'h-12 px-6 py-3',
    pill: 'h-12 px-6 py-3',
    icon: 'h-10 w-10',
  };
  const buttonClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
    variant === 'default' ? 'rounded-[var(--radius-full)]' : '',
    variant === 'outline' && size === 'pill' ? 'rounded-[var(--radius-full)]' : '',
    variants[variant],
    sizes[size],
    className,
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(buttonClassName, children.props.className),
    });
  }

  return <button className={buttonClassName} ref={ref} {...props}>{children}</button>;
});
export const Card = ({ className, ...props }) => (
  <div className={cn('rounded-[var(--radius-lg)] border border-[var(--color-hairline)] bg-white text-[var(--color-ink)] shadow-[0_8px_24px_rgba(17,17,17,0.04)]', className)} {...props} />
);
export const CardHeader = ({ className, ...props }) => <div className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />;
export const CardTitle = ({ className, ...props }) => <h3 className={cn('text-[22px] font-bold leading-[1.27] tracking-[-0.25px]', className)} {...props} />;
export const CardDescription = ({ className, ...props }) => <p className={cn('text-sm leading-6 text-[var(--color-ink-muted)]', className)} {...props} />;
export const CardContent = ({ className, ...props }) => <div className={cn('p-6 pt-0', className)} {...props} />;
export const Input = React.forwardRef(({ className, ...props }, ref) => <input className={cn('flex h-11 w-full rounded-[var(--radius-xs)] border border-[var(--color-hairline)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30 disabled:cursor-not-allowed disabled:opacity-50', className)} ref={ref} {...props} />);
export const Label = ({ className, ...props }) => <label className={cn('text-sm font-medium leading-none text-[var(--color-ink-secondary)]', className)} {...props} />;
export const Badge = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: 'border-transparent bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
    secondary: 'border-transparent bg-[var(--color-canvas-soft)] text-[var(--color-ink-secondary)]',
    destructive: 'border-transparent bg-red-50 text-red-700',
    outline: 'border-[var(--color-hairline)] text-[var(--color-ink)]',
    success: 'border-transparent bg-emerald-50 text-emerald-700',
    warning: 'border-transparent bg-amber-50 text-amber-700',
    danger: 'border-transparent bg-orange-50 text-orange-700',
  };
  return <div className={cn('inline-flex items-center rounded-[var(--radius-full)] border px-2.5 py-1 text-xs font-semibold transition-colors focus:outline-none', variants[variant], className)} {...props} />;
};
export const Table = ({ className, ...props }) => <div className="relative w-full overflow-auto"><table className={cn('w-full caption-bottom text-sm', className)} {...props} /></div>;
export const TableHeader = ({ className, ...props }) => <thead className={cn('[&_tr]:border-b [&_tr]:border-[var(--color-hairline)]', className)} {...props} />;
export const TableBody = ({ className, ...props }) => <tbody className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
export const TableRow = ({ className, ...props }) => <tr className={cn('border-b border-[var(--color-hairline)] transition-colors hover:bg-[var(--color-canvas-soft)]/70', className)} {...props} />;
export const TableHead = ({ className, ...props }) => <th className={cn('h-12 px-4 text-left align-middle text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-muted)] [&:has([role=checkbox])]:pr-0', className)} {...props} />;
export const TableCell = ({ className, ...props }) => <td className={cn('p-4 align-middle text-[var(--color-ink-secondary)] [&:has([role=checkbox])]:pr-0', className)} {...props} />;
export const Select = ({ className, children, ...props }) => <select className={cn('flex h-11 w-full rounded-[var(--radius-xs)] border border-[var(--color-hairline)] bg-white px-3 py-2 text-sm text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]/30', className)} {...props}>{children}</select>;
export const Tabs = ({ className, ...props }) => <div className={cn('', className)} {...props} />;
export const TabsList = ({ className, ...props }) => <div className={cn('inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-canvas-soft)] p-1 text-[var(--color-ink-muted)]', className)} {...props} />;
export const TabsTrigger = ({ className, isActive, ...props }) => <button className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50', isActive && 'bg-white text-[var(--color-ink)] shadow-[0_2px_8px_rgba(17,17,17,0.05)]', className)} {...props} />;
export const TabsContent = ({ className, isActive, ...props }) => isActive ? <div className={cn('mt-2 ring-offset-background focus-visible:outline-none', className)} {...props} /> : null;
export const Dialog = ({ open, onClose, children }) => open ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}><div className="w-full max-w-md rounded-[var(--radius-lg)] bg-white p-6 shadow-[0_20px_60px_rgba(17,17,17,0.18)]" onClick={e => e.stopPropagation()}>{children}</div></div> : null;
