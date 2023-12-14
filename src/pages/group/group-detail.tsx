import { useLoaderData, useNavigate, useOutletContext, useParams } from "react-router-dom";

import { GlobalContext, GlobalContextInterface } from "../../main";
import routes from "../../data/routes";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext, useEffect } from "react";
import SummaryTabPanel from "../../components/group/summary-tab-panel";
import TransactionsTabPanel from "../../components/group/transactions-tab-panel";
import SettingsTabPanel from "../../components/group/settings-tab-panel";

export default function GroupDetailPage() {
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const navigate = useNavigate();

  const { groupId, tab } = useParams();
  const [groups] = useOutletContext() as [groups: Group[]];
  const { transactions } = useLoaderData() as { transactions: Transaction[] };

  const id = parseInt(groupId || '-1');
  const matchedGroup = groups.find(el => el.id == id);

  useEffect(() => {
    // current group has just been unsetted, ignore groupId param
    if (currentGroup == -1) {
      navigate(routes.groups, {replace: true});
      return;
    }

    // group not found, unset current group and return to group page
    if (!matchedGroup) {
      if (currentGroup) {
        setGlobal({
          ...global,
          currentGroup: undefined
        })
      }

      navigate(routes.groups, {replace: true});
      return;
    }
    
    // current group has changed
    if (currentGroup != id) {
      // currentGroup takes priority over groupId param
      if (currentGroup) {
        navigate(routes.groups + currentGroup, {replace: true})
      }
      else {
        setGlobal({
          ...global,
          currentGroup: id
        })
      }

      return;
    }
  }, [currentGroup, matchedGroup, global, groups, id, navigate, setGlobal]);

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
      name: 'Settings',
      component: SettingsTabPanel,
      path: 'settings',
    },
  ]
  
  const activeTab = Math.max(tabPanels.findIndex(el => el.path === tab), 0);

  return (
      <Box py={3}>
        <Box>
          <Tabs
            sx={{
              mb: 2
            }}
            value={activeTab} 
            onChange={(_e: any, v: number) => {navigate(`${routes.groups}${groupId}/${tabPanels[v].path}`)}} aria-label="basic tabs example">
            {tabPanels.map((panel, index) => (
              <Tab label={panel.name} id={`tab-group-${index}`} aria-controls={`tabpanel-group-${index}`} />))
            }
          </Tabs>
          {tabPanels.map((panel, index) => {
            const CustomPanelComponent = panel.component;
            const isActive = panel.path === tab;
            return (
              <div
                role="tabpanel"
                hidden={!isActive}
                id={`tabpanel-${index}`}
                aria-labelledby={`tabpanel-group-${index}`}
              >
                {isActive && (
                  <CustomPanelComponent transactions={transactions} />
                )}
              </div>)
          })}
        </Box>
      </Box>
  )
}