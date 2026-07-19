import { Checkbox as CheckboxPrimitive } from 'radix-ui'

export function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={
        'w-[18px] h-[18px] border border-gray-500 bg-white data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 data-[state=checked]:text-white ' +
        (className || '')
      }
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-xs font-bold">✓</CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
