import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import { GroupContext, GroupContextInterface } from "../../contexts/group";
import routes from "../../data/routes";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
  const { group, setGroup, allGroups} = useContext(GroupContext) as GroupContextInterface;

  const navigate = useNavigate();

  const {groupId} = useParams();
  const { group: loadedGroup } = useLoaderData() as { group: Group | undefined };

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (!allGroups) {
      return;
    }

    const id = typeof group === 'undefined' ? loadedGroup?.id : group?.id;
    const selectedGroup = allGroups.find(el => el.id === id);

    // group not found, unset current group and return to group page
    if (!selectedGroup) {
      if (group) {
        setGroup(null)
      }


      navigate(routes.groups, {replace: true});

      return;
    }
    
    // update current group with server response
    setGroup(loadedGroup);
  }, [allGroups, navigate, group, setGroup, loadedGroup, groupId]);

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