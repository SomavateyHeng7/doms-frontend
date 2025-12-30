interface ResponsiveTableProps {
  children: React.ReactNode
  className?: string
}

interface TableHeaderProps {
  children: React.ReactNode
}

interface TableBodyProps {
  children: React.ReactNode
}

interface TableRowProps {
  children: React.ReactNode
  onClick?: () => void
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  hideOnMobile?: boolean
  hideOnTablet?: boolean
}

function ResponsiveTable({ children, className = "" }: ResponsiveTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className={`w-full ${className}`}>
          {children}
        </table>
      </div>
    </div>
  )
}

function TableHeader({ children }: TableHeaderProps) {
  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {children}
      </tr>
    </thead>
  )
}

function TableHeaderCell({ children, className = "", hideOnMobile = false, hideOnTablet = false }: { children: React.ReactNode; className?: string; hideOnMobile?: boolean; hideOnTablet?: boolean }) {
  const visibilityClasses = `
    ${hideOnMobile ? 'hidden sm:table-cell' : ''}
    ${hideOnTablet ? 'hidden md:table-cell' : ''}
  `.trim()

  return (
    <th className={`px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${visibilityClasses} ${className}`}>
      {children}
    </th>
  )
}

function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {children}
    </tbody>
  )
}

function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr 
      className={`hover:bg-gray-50 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </tr>
  )
}

function TableCell({ children, className = "", hideOnMobile = false, hideOnTablet = false }: TableCellProps) {
  const visibilityClasses = `
    ${hideOnMobile ? 'hidden sm:table-cell' : ''}
    ${hideOnTablet ? 'hidden md:table-cell' : ''}
  `.trim()

  return (
    <td className={`px-3 sm:px-6 py-2 sm:py-3 text-sm text-gray-900 ${visibilityClasses} ${className}`}>
      {children}
    </td>
  )
}

// Export all components
ResponsiveTable.Header = TableHeader
ResponsiveTable.HeaderCell = TableHeaderCell
ResponsiveTable.Body = TableBody
ResponsiveTable.Row = TableRow
ResponsiveTable.Cell = TableCell

export default ResponsiveTable