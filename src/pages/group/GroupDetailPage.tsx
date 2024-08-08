import { Tabs, Tab, Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import SummaryTabPanel from "../../components/group/SummaryTabPanel";
import TransactionsTabPanel from "../../components/group/TransactionsTabPanel";
import UsersTabPanel from "../../components/group/UsersTabPanel";
import { useLoaderData, useNavigation } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import { GroupContext } from "../../providers/GroupProvider";

const tabPanels = [
  {
    name: "Summary",
    component: SummaryTabPanel,
    path: "",
  },
  {
    name: "Transactions",
    component: TransactionsTabPanel,
    path: "transactions",
  },
  {
    name: "Members",
    component: UsersTabPanel,
    path: "members",
  },
];

export default function GroupDetailPage() {
  const [activeTab, setActiveTab] = useState(0);
  const { dispatch } = useContext(GroupContext);

  const navigation = useNavigation();
  const { group } = useLoaderData() as { group: Group };

  useEffect(() => {
    if (group) {
      dispatch({ type: "setGroup", group });
    }
  }, [dispatch, group]);

  if (navigation.state === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <Box py={3}>
      <Box>
        <Tabs
          sx={{
            mb: 2,
          }}
          value={activeTab}
          onChange={(_e: any, v: number) => {
            setActiveTab(v);
          }}
          aria-label="basic tabs example"
        >
          {tabPanels.map((panel, index) => (
            <Tab
              key={index}
              label={panel.name}
              id={`tab-group-${index}`}
              aria-controls={`tabpanel-group-${index}`}
            />
          ))}
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
              {isActive && <CustomPanelComponent />}
            </div>
          );
        })}
      </Box>
    </Box>
  );
}
