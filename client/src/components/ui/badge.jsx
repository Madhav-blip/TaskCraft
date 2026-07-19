const colors = {
  slate: 'bg-slate-200 text-slate-700',
  sky: 'bg-sky-200 text-sky-700',
  emerald: 'bg-emerald-200 text-emerald-700',
  rose: 'bg-rose-200 text-rose-700',
  amber: 'bg-amber-200 text-amber-700',
  crimson: 'bg-red-600 text-white shadow-[0_0_8px_red]',
  outline: 'border border-gray-400 text-gray-700',
  secondary: 'bg-gray-200 text-gray-700',
}

export function Badge({ className, variant, ...props }) {
  return (
    <span
      className={
        'inline-block rounded-full px-2 py-[2px] text-xs font-bold ' +
        (colors[variant] || colors.secondary) +
        ' ' +
        (className || '')
      }
      {...props}
    />
  )
}
