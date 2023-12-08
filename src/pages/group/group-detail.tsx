import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import GroupToolbar from "../../components/group/group-toolbar";
import { GlobalContext, GlobalContextInterface } from "../../main";
import routes from "../../data/routes";
import { Tabs, Tab } from "@mui/material";
import { Container, Box } from "@mui/system";
import { useContext, useEffect } from "react";
import SummaryTabPanel from "../../components/group/summary-tab-panel";
import TransactionsTabPanel from "../../components/group/transactions-tab-panel";
import SettingsTabPanel from "../../components/group/settings-tab-panel";

export default function GroupDetailPage() {
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const navigate = useNavigate();

  const { groupId, tab } = useParams();
  const { groups, transactions } = useLoaderData() as { groups: Group[], group: Group, transactions: Transaction[] };

  const id = parseInt(groupId || '-1');
  const g = groups.find(el => el.id == id);

  useEffect(() => {
    // current group has just been unsetted, ignore groupId param
    if (currentGroup == -1) {
      navigate(routes.groups, {replace: true});
      return;
    }

    // group not found, unset current group and return to group page
    if (!g) {
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
  }, [currentGroup, g, global, groups, id, navigate, setGlobal]);

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
    <Container>
      <Box>
        <GroupToolbar
          groups={groups}
        />
      </Box>
      <Box>
        <Box>
          <Tabs value={activeTab} onChange={(_e: any, v: number) => {navigate(`${routes.groups}${groupId}/${tabPanels[v].path}`)}} aria-label="basic tabs example">
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
    </Container>
  )
}