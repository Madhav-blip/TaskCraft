import { Select as SelectPrimitive } from 'radix-ui'

export const Select = SelectPrimitive.Root
export const SelectValue = SelectPrimitive.Value

export function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={'flex justify-between items-center border border-gray-500 bg-white p-1 w-full text-sm ' + (className || '')}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon>▾</SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({ children, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        className="z-50 border border-gray-500 bg-white mt-1 min-w-[var(--radix-select-trigger-width)]"
        {...props}
      >
        <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({ children, ...props }) {
  return (
    <SelectPrimitive.Item
      className="p-1 text-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-200 outline-none"
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
