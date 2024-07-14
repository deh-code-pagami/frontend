
import { Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import SummaryTabPanel from "../../components/group/summary-tab-panel";
import TransactionsTabPanel from "../../components/group/transactions-tab-panel";
import SettingsTabPanel from "../../components/group/settings-tab-panel";
import UsersTabPanel from "../../components/group/users-tab-panel";

const tabPanels = [
  {
    name: 'Summary',
    component: SummaryTabPanel,
    path: '',
  },
  {
    name: 'Transactions',
    component: TransactionsTabPanel,
    path: 'transactions',
  },
  {
    name: 'Members',
    component: UsersTabPanel,
    path: 'members',
  },
  {
    name: 'Settings',
    component: SettingsTabPanel,
    path: 'settings',
  },
]

export default function GroupDetailPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
      <Box py={3}>
        <Box>
          <Tabs
            sx={{
              mb: 2
            }}
            value={activeTab} 
            onChange={(_e: any, v: number) => {setActiveTab(v)}} aria-label="basic tabs example">
            {tabPanels.map((panel, index) => (
                <Tab key={index} label={panel.name} id={`tab-group-${index}`} aria-controls={`tabpanel-group-${index}`} />)
              )
            }
          </Tabs>
          {tabPanels.map((panel, index) => {
            const CustomPanelComponent = panel.component;
            const isActive = index === activeTab;
            return (
              <div
                role="tabpanel"
                hidden={!isActive}
                id={`tabpanel-${index}`}
                aria-labelledby={`tabpanel-group-${index}`}
                key={index}
              >
                {isActive && (
                  <CustomPanelComponent />
                )}
              </div>)
          })}
        </Box>
      </Box>
  )
}