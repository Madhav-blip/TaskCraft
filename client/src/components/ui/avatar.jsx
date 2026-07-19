export function Avatar({ src, name, className }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'avatar'}
        className={'w-[28px] h-[28px] rounded-full border border-gray-400 ' + (className || '')}
      />
    )
  }
  return (
    <span
      className={
        'inline-flex w-[28px] h-[28px] rounded-full border border-gray-400 bg-gray-200 items-center justify-center text-xs font-bold ' +
        (className || '')
      }
    >
      {(name || '?').charAt(0).toUpperCase()}
    </span>
  )
}
