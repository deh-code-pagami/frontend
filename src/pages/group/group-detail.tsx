import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TransactionFilters from "../../components/transaction/transaction-filters";
import TransactionList from "../../components/transaction/transaction-list";

function TransactionTabPanel(props: {transactions: Array<Transaction>}) {
  const { transactions } = props;

  return (
    <Grid mt={4} container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: '1rem' }}>Filters</Typography>
        <TransactionFilters></TransactionFilters>
      </Grid>
      <Grid item xs={12} md={8}>
        {/* TODO get subject from logged in username */}
        <TransactionList transactions={transactions} subject="Piero"></TransactionList>
      </Grid>
    </Grid>
  )
}

export async function groupDetailLoader({ params }: any) {
  let response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/index.json`);
  let data = await response.json();

  const group = data.data;

  response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/groups/${params.groupId}/transactions/index.json`);
  data = await response.json();

  const transactions = data.data;

  return { group, transactions };
}

export default function GroupDetailPage() {
  const { group, transactions } = useLoaderData() as { group: Group, transactions: Array<Transaction> };
  const [tabIndex, setTabIndex] = useState(0);

  const tabPanels = [
    {
      name: 'Summary',
      component: TransactionTabPanel
    },
    {
      name: 'Transactions',
      component: TransactionTabPanel
    },
    {
      name: 'Members',
      component: TransactionTabPanel
    },
  ]

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={(_e: any, v: number) => setTabIndex(v)} aria-label="basic tabs example">
          {tabPanels.map((panel, index) => (
            <Tab label={panel.name} id={`tab-group-${index}`} aria-controls={`tabpanel-group-${index}`} />))
          }
        </Tabs>
        {tabPanels.map((panel, index) => {
          const CustomPanelComponent = panel.component;
          return (
            <div
              role="tabpanel"
              hidden={tabIndex !== index}
              id={`tabpanel-${index}`}
              aria-labelledby={`tabpanel-group-${index}`}
            >
              {tabIndex === index && (
                <CustomPanelComponent transactions={transactions} />
              )}
            </div>)
        })}
      </Box>
    </Box>
  )
}