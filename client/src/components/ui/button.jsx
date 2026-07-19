const styles = {
  default: 'bg-blue-500 text-white hover:bg-blue-600',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  outline: 'border border-gray-500 bg-white hover:bg-gray-200',
}

const sizes = {
  default: 'p-2',
  sm: 'p-1 text-xs',
  icon: 'p-1 w-[34px]',
}

export function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={
        'text-sm font-bold disabled:opacity-50 ' +
        (styles[variant] || styles.default) +
        ' ' +
        (sizes[size] || sizes.default) +
        ' ' +
        (className || '')
      }
      {...props}
    />
  )
}
