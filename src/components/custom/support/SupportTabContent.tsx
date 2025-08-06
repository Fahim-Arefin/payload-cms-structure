// 'use client'

// import React, { useState } from 'react'
// import MapSection from './MapSection'
// import { Button } from '@/components/ui/button'
// import ToolTip from '../shared/ToolTip'

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'

// import { TabDataType } from '@/types'

// type Props = {
//   data: TabDataType[]
//   activeTab: 'hospitals' | 'branches'
// }

// function SupportTabContent({ data, activeTab }: Props) {
//   const branches = activeTab === 'branches' ? data[0]?.content : data[1]?.content || []
//   const [selectedIndex, setSelectedIndex] = useState(0)

//   return (
//     <div>
//       <div
//         className="px-5
//           pb-[16px]
//           md:px-24 md:pb-[0px]
//           lg:px-[130px]  lg:pb-[50px]
//           xl:px-[200px]  xl:pb-[50px]
//           2xl:px-[300px] 2xl:pb-[50px]
//           mb-6 lg:mb-0"
//       >
//         <h1 className="global-h3 w-[75%] lg:w-full font-semibold lg:font-normal mb-[16px] md:mb-[20px] lg:mb-[30px] xl:mb-[60px]">
//           Come and visit us at any of our branches. We are here to assist you.
//         </h1>

//         <Select onValueChange={(value) => setSelectedIndex(Number(value))} defaultValue="0">
//           <SelectTrigger className="w-[70%] md:w-[300px] bg-white text-[#6B6565] h-[40px] md:h-[45px] lg:h-[50px]">
//             <SelectValue placeholder="Select a Branch Location" />
//           </SelectTrigger>
//           <SelectContent>
//             {branches.map((branch, idx) => (
//               <SelectItem key={idx} value={String(idx)}>
//                 {branch.office_location_Label || branch.office_location}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Pass selected branch data as tabContent */}
//       <MapSection data={{ content: [branches[selectedIndex]] }} />

//       {/* Mobile-only buttons */}
//       <div
//         className="lg:hidden pl-5 pb-12 md:pb-24 lg:pb-0
//         md:pl-24 md:pt-4 space-y-5"
//       >
//         <div className="flex space-x-2">
//           <ToolTip>
//             <Button
//               variant="secondary"
//               className="cursor-not-allowed font-normal w-[130px] md:w-[150px] h-[34px] md:h-[40px] text-[11px] md:text-[13px]"
//             >
//               Download Brochure
//             </Button>
//           </ToolTip>
//           <ToolTip>
//             <Button
//               variant="outline"
//               className="cursor-not-allowed font-normal w-[130px] md:w-[150px] h-[34px] md:h-[40px] text-[11px] md:text-[13px]"
//             >
//               Calculate Premium
//             </Button>
//           </ToolTip>
//         </div>
//         <div className="cursor-not-allowed text-[#434343] text-[11px] md:text-[13px] border-b w-fit px-2 border-b-[#434343]">
//           Have a Question? Ask Us!
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SupportTabContent

'use client'

import React, { useEffect, useMemo, useState } from 'react'
import MapSection from './MapSection'
import { Button } from '@/components/ui/button'
import ToolTip from '../shared/ToolTip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { TabDataType } from '@/types'
import { Check, ChevronDown } from 'lucide-react'

type Props = {
  data: TabDataType[]
  activeTab: 'hospitals' | 'branches'
}

function SupportTabContent({ data, activeTab }: Props) {
  const isHospital = activeTab === 'hospitals'
  const entries = isHospital ? data[1]?.content || [] : data[0]?.content || []

  const [selectedIndex, setSelectedIndex] = useState(isHospital ? -1 : 0) // Hospitals: no selection, Branches: first item
  const [selectedItemKey, setSelectedItemKey] = useState(isHospital ? -1 : 0) // for memo map
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Reset based on tab type
    if (isHospital) {
      setSelectedIndex(-1) // No selection for hospitals
      setSelectedItemKey(-1)
    } else {
      setSelectedIndex(0) // First item selected for branches
      setSelectedItemKey(0)
    }
    setSearchTerm('')
  }, [activeTab, data, isHospital])

  const filteredItems = useMemo(() => {
    if (!isHospital) return entries
    const keyword = searchTerm.toLowerCase().trim()
    return entries.filter((item) => item.office_location_Label?.toLowerCase().includes(keyword))
  }, [searchTerm, entries, isHospital])

  const handleHospitalSelect = (index: number) => {
    setSelectedIndex(index)
    setSelectedItemKey(index)
    setOpen(false)
    setSearchTerm('')
  }

  const handleBranchSelect = (val: string) => {
    const index = Number(val)
    setSelectedIndex(index)
    setSelectedItemKey(index)
  }

  const selectedItem = selectedIndex >= 0 ? entries[selectedIndex] : null

  const memoizedMap = useMemo(() => {
    return selectedItem ? (
      <MapSection key={selectedItemKey} data={{ content: [selectedItem] }} />
    ) : null
  }, [selectedItemKey]) // Only change on actual selection, not typing

  return (
    <div>
      <div className="px-5 pt-0 pb-[8px] md:px-24 md:pt-0 md:pb-0 lg:px-[130px] lg:pt-0 lg:pb-[20px] xl:px-[200px] xl:pt-0 xl:pb-[20px] 2xl:px-[300px] 2xl:pt-0 2xl:pb-[20px] mb-3 lg:mb-0">
        {isHospital ? (
          <h1 className="global-h3 w-full font-semibold lg:font-normal mb-[8px] md:mb-[10px] lg:mb-[12px] xl:mb-[16px]">
            Search and find our panel hospitals by district.
          </h1>
        ) : (
          <h1 className="global-h3 w-full font-semibold lg:font-normal mb-[8px] md:mb-[10px] lg:mb-[12px] xl:mb-[16px]">
            Come and visit us at any of our branches. <br /> We are here to assist you.
          </h1>
        )}

        {isHospital ? (
          <div className="mb-2 mt-1">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="bg-white text-[#6B6565] w-[70%] md:w-[300px] justify-between h-[40px] md:h-[45px] lg:h-[50px] overflow-hidden truncate
                     border border-gray-300 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-normal transition-all duration-300"
                >
                  <span className="truncate">
                    {selectedIndex >= 0
                      ? entries[selectedIndex]?.office_location_Label
                      : 'Select any hospital'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start" className="w-[300px] p-0 ">
                <div className="p-2">
                  <Input
                    placeholder="Type district (e.g., Chittagong)"
                    className="h-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="max-h-60 overflow-auto">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => {
                      const realIndex = entries.indexOf(item)
                      return (
                        <div
                          key={realIndex}
                          onClick={() => handleHospitalSelect(realIndex)}
                          className={cn(
                            'flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground',
                            realIndex === selectedIndex &&
                              'bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground',
                          )}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              realIndex === selectedIndex ? 'opacity-100' : 'opacity-0',
                            )}
                          />
                          <span className="truncate">{item.office_location_Label}</span>
                        </div>
                      )
                    })
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No match found</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Select onValueChange={handleBranchSelect} defaultValue="0">
            <SelectTrigger
              className="cursor-pointer bg-white text-[#6B6565] w-[70%] md:w-[300px] h-[40px] md:h-[45px] lg:h-[50px] overflow-hidden truncate 
            border border-gray-300 bg-background shadow-sm hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              <SelectValue placeholder="Select a Branch Location" />
            </SelectTrigger>
            <SelectContent>
              {entries.map((item, idx) => (
                <SelectItem
                  key={idx}
                  value={String(idx)}
                  className="flex items-center px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground 
    data-[state=checked]:bg-muted data-[state=checked]:text-muted-foreground rounded-md transition-colors"
                >
                  <span className="truncate ">
                    {item.office_location_Label || item.office_location}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* ✅ Map shows for branches (always) and hospitals (when selected) */}
      {(!isHospital || selectedIndex >= 0) && memoizedMap}

      <div className="lg:hidden pl-5 md:pl-24 md:pt-4 space-y-5">
        <div className="flex space-x-2">
          <ToolTip>
            <Button
              variant="secondary"
              className="cursor-not-allowed font-normal w-[130px] md:w-[150px] h-[34px] md:h-[40px] text-[11px] md:text-[13px]"
            >
              Download Brochure
            </Button>
          </ToolTip>
          <ToolTip>
            <Button
              variant="outline"
              className="cursor-not-allowed font-normal w-[130px] md:w-[150px] h-[34px] md:h-[40px] text-[11px] md:text-[13px]"
            >
              Calculate Premium
            </Button>
          </ToolTip>
        </div>
        <div className="cursor-not-allowed text-[#434343] text-[11px] md:text-[13px] border-b w-fit px-2 border-b-[#434343]">
          Have a Question? Ask Us!
        </div>
      </div>
    </div>
  )
}

export default SupportTabContent
