import { Dialog as SheetPrimitive } from 'radix-ui'

export const Sheet = SheetPrimitive.Root
export const SheetClose = SheetPrimitive.Close

export function SheetContent({ children, ...props }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <SheetPrimitive.Content
        className="fixed top-0 right-0 z-50 h-full w-full sm:w-[500px] bg-white border-l border-gray-500 flex flex-col"
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="absolute top-[10px] right-[10px] text-xl font-bold">
          ✕
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPrimitive.Portal>
  )
}

export function SheetHeader({ children }) {
  return <div className="border-b border-gray-300 p-3">{children}</div>
}

export function SheetTitle(props) {
  return <SheetPrimitive.Title className="text-xl font-bold" {...props} />
}

export function SheetDescription(props) {
  return <SheetPrimitive.Description className="text-sm text-gray-600" {...props} />
}
