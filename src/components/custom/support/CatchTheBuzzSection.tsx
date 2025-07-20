'use client'

import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { useState } from 'react'
import AllNewsContainer from './AllNewsContainer'

type Props = {}

function CatchTheBuzzSection({}: Props) {
  const [activeTab, setActiveTab] = useState('all')
  return (
    <>
      <div
        className="container-width flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0
          py-12 
           md:py-[50px]
             lg:py-[70px] 
             xl:py-[100px]
           px-8 
           "
      >
        <div>
          <h3
            className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] 
          leading-6 md:leading-7 xl:leading-[35px] 2xl:leading-[45px] 
          uppercase font-semibold lg:font-normal"
          >
            See What's on <span className="text-[#ED7125]">The Highlights</span>
          </h3>
        </div>
        <div className="relative w-[130px] md:w-[340px]">
          <Search className="absolute left-3 top-[18px] md:top-[21px] -translate-y-1/2 text-[#434343] w-4 h-4" />
          <Input
            type="text"
            placeholder="Search"
            className="pl-9 pr-4 md:py-5 bg-[#FCF4EB] text-[#434343] text-sm rounded-md border border-[#3A3A3A] placeholder:text-[#43434380]"
          />
        </div>
      </div>
      <div className="relative ">
        {/* Tabs (Triggers only) */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="container-width px-8">
          <TabsList className="w-full justify-start space-x-12 md:space-x-24 lg:space-x-32 xl:space-x-60 rounded-none bg-transparent ">
            <TabsTrigger
              value="all"
              className="text-[13px] md:text-base text-[#3A3A3A] data-[state=active]:text-[#ED7125]"
            >
              ALL
            </TabsTrigger>

            <TabsTrigger
              value="ovc"
              className="text-[13px] md:text-base text-[#3A3A3A] data-[state=active]:text-[#ED7125]"
            >
              OVC/TVC
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Outside Tab Content */}
        <div className="pt-12 w-full lg:w-[85%] mx-auto">
          {activeTab === 'all' && <AllNewsContainer />}
          {activeTab === 'news' && (
            <p className="text-center">
              Showing content for <strong>NEWS</strong>
            </p>
          )}
          {activeTab === 'blogs' && (
            <p className="text-center">
              Showing content for <strong>BLOGS</strong>
            </p>
          )}
          {activeTab === 'ovc' && (
            <p className="text-center">
              Showing content for <strong>OVC/TVC</strong>
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default CatchTheBuzzSection
