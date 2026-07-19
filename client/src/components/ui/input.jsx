export function Input({ className, ...props }) {
  return (
    <input
      className={'border border-gray-500 p-1 w-full text-sm ' + (className || '')}
      {...props}
    />
  )
}
