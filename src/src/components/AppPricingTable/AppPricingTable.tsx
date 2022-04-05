import React, { ReactElement, useCallback, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { tableData, tableRowConfig } from './mock'

interface AppPricingTableProps {
  locationStore?: any;
}

export enum TableRowType {
  Text = 'text',
  Tick = 'tick',
  Custom = 'custom',
}

export interface TableRowConfig {
  label: string;
  key: string;
  type: TableRowType
}

const AppPricingTable = (props: AppPricingTableProps) => {
  const { locationStore } = props
  const initialRowsDisplay = 5

  const [showFullContent, setShowFullContent] = useState<boolean>(false)

  const renderTableHeader = useCallback((): ReactElement => (
    <div className={`grid col-start-2 col-span-${tableData.length} grid-cols-${tableData.length} gap-1`}>
      {
        tableData.map(column => {
          return (
            <div key={column.type}
                 className={`text-center font-bold p-2 ${column.isHighlighted ? 'bg-gray-400' : 'bg-gray-200'}`}>
              {column.type}
            </div>
          )
        })
      }
    </div>
  ), [tableData])

  const renderTableCell = useCallback((record: any, config: TableRowConfig): ReactElement | null => {
    switch (config.type) {
      case TableRowType.Tick:
        return record[config.key] ? <span>✔</span> : null
      default:
        return record[config.key]
    }
  }, [])

  const renderTableBody = useCallback((): ReactElement[] => {
    const renderData = showFullContent
      ? tableRowConfig.slice()
      : tableRowConfig.slice(0, initialRowsDisplay)
    return (
      renderData.map(row => (
        <div key={row.key}
             className={`grid grid-cols-${tableData.length + 1} col-span-${tableData.length + 1} gap-1 w-full`}>
          <div className={'text-gray-800 font-semibold p-2 pl-0'}>{row.label}</div>
          {
            tableData.map((record: any) => (
              <div
                key={record.type}
                className={`flex items-center justify-center p-2 ${record.isHighlighted ? 'bg-gray-400' : 'bg-gray-200'}`}>
                {renderTableCell(record, row as TableRowConfig)}
              </div>
            ))
          }
        </div>
      ))
    )
  }, [tableData, tableRowConfig, showFullContent])

  const renderTableFoot = useCallback(() => (
    <div className={`grid col-start-2 col-span-${tableData.length} grid-cols-${tableData.length} gap-1 mt-10`}>
      {
        tableData.map(record => (
          <div key={record.type} onClick={() => console.debug(record)}
               className={`uppercase bg-gray-800 text-white text-center p-2 cursor-pointer hover:opacity-75`}>
            select
          </div>
        ))
      }
      {
        tableData.map(record => (
          <div key={record.type} onClick={() => console.debug(record)}
               className={`uppercase text-gray-800 text-center p-2 cursor-pointer hover:opacity-75`}>
            see pricing
          </div>
        ))
      }
    </div>
  ), [tableData])

  const showAllContent = (): void => {
    setShowFullContent(true)
  }

  return (
    <div className={`grid grid-cols-${tableData.length + 1} gap-1 w-full`}>
      {renderTableHeader()}
      {renderTableBody()}
      {
        !showFullContent && (
          <div onClick={showAllContent}
               className={`grid col-start-2 col-span-${tableData.length} bg-gray-300 cursor-pointer hover:opacity-75`}>
            <div className={'flex items-center justify-center p-2'}>
              View more +
            </div>
          </div>
        )
      }
      {renderTableFoot()}
    </div>
  )
}

export default inject('locationStore')(observer(AppPricingTable))
