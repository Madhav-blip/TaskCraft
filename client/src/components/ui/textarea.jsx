export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={'border border-gray-500 p-1 w-full text-sm h-[70px] ' + (className || '')}
      {...props}
    />
  )
}
