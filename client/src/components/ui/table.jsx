export function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table
        border="2"
        className="w-full text-sm border-collapse [&_td]:border [&_td]:border-gray-500 [&_td]:p-2 [&_th]:border [&_th]:border-gray-500 [&_th]:p-2"
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children }) {
  return <thead className="bg-gray-100">{children}</thead>
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>
}

export function TableRow({ className, ...props }) {
  return <tr className={'hover:bg-gray-100 ' + (className || '')} {...props} />
}

export function TableHead({ className, ...props }) {
  return <th className={'text-left font-bold ' + (className || '')} {...props} />
}

export function TableCell({ className, ...props }) {
  return <td className={className || ''} {...props} />
}
