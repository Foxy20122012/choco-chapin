// components/Tabs.js
import React, { useState } from 'react'
import { Tabs, Tab, Paper } from '@mui/material'

const CustomTabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 h-[300px]"> {/* Establece la altura deseada aquí */}
      <Paper square elevation={3} className="shadow-lg">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Tabs"
        >
          {tabs.map((tab, index) => (
            <Tab key={index} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Paper>
      <div className="p-4 mt-4">
        {tabs.map((tab, index) => (
          <div key={index} hidden={activeTab !== index}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomTabs
