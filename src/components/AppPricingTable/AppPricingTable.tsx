import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import { inject, observer } from 'mobx-react'
import { TableRowConfig, TableRowType } from '../../models/table.model'
import { Pricing } from '../../models/pricing.model'

interface AppPricingTableProps {
  locationStore?: any;
  pricingStore?: any;
}

const tableRowConfig = [
  {
    label: 'Starting Price',
    type: 'pricing',
    key: 'startingPrice',
  },
  {
    label: 'Plan Options',
    type: 'tick',
    key: 'planOptions',
  },
  {
    label: 'Access Type',
    type: 'tick',
    key: 'accessType',
  },
  {
    label: '24/7 access to a dedicated desk at your chosen Centre',
    type: 'tick',
    key: 'anytimeAccessDedicatedDesk',
  },
  {
    label: 'Business hours access to a private office',
    type: 'text',
    key: 'accessToPrivateOfficeHrs',
  },
  {
    label: 'Access to TEC Community Events and Partnership Programs',
    type: 'tick',
    key: 'communityEvtAccess',
  },
  {
    label: 'Ability to book meeting rooms through MyTEC',
    type: 'tick',
    key: 'canBookMeetingViaMyTEC',
  },
  {
    label: 'Dedicated storage locker',
    type: 'tick',
    key: 'dedicatedStorageLocker',
  },
  {
    label: 'Book Meeting Room at discounted rate',
    type: 'tick',
    key: 'bookingWithDiscount',
  },
  {
    label: 'Discounted rate for other Services',
    type: 'tick',
    key: 'otherServicesDiscount',
  },
] as TableRowConfig[]

const AppPricingTable = (props: AppPricingTableProps) => {
  const { locationStore, pricingStore } = props
  const { selectedLocation } = locationStore

  const initialRowsDisplay = 5

  const [tableData, setTableData] = useState<Pricing[]>([])

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
        return record[config.key] ? <span>&#10003;</span> : null
      case TableRowType.Pricing:
        const price = record[config.key].toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        return (
          <div className={'text-center'}>
            <div className={'text-blue-900 font-bold'}>From {price} {record.currency}</div>
            <div className={'text-sm'}>(See detailed pricing below)</div>
          </div>
        );
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

  useEffect(() => {
    setTableData(pricingStore.getPricingData(selectedLocation))
  }, [selectedLocation])

  return (
    tableData.length !== 0 ? (
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
    ) : null
  )
}

export default inject('locationStore', 'pricingStore')
(observer(AppPricingTable))
