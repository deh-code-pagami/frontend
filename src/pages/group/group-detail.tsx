import { Button, Container, Grid, Tab, Tabs, Typography, Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import TransactionFilters from "../../components/transaction/transaction-filters";
import TransactionList from "../../components/transaction/transaction-list";
import TransactionDialog from "../../components/transaction/transaction-dialog";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupToolbar from "../../components/group/group-toolbar";
import { GlobalContext, GlobalContextInterface } from "../../main";
import routes from "../../data/routes";


function TransactionsTabPanel(props: {transactions: Array<Transaction>}) {
  const { transactions } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid mt={2} container spacing={2}>
        <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
          <PlaylistAddIcon />
        </Button>
        <TransactionDialog
          open={open}
          handleClose={handleClose}
        ></TransactionDialog>
        <Grid item xs={12} md={4}>
          <Typography variant="h5" component="h2" sx={{ marginBottom: '1rem' }}>Filters</Typography>
          <TransactionFilters></TransactionFilters>
        </Grid>
        <Grid item xs={12} md={8}>
          {/* TODO get subject from logged in username */}
          <TransactionList transactions={transactions} subject="Piero"></TransactionList>
        </Grid>
      </Grid>
    </>
  )
}

// TODO
function SummaryTabPanel() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box pt={2}>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ px: 1 }}>
          <PlaylistAddIcon />
        </Button>
        <TransactionDialog
          open={open}
          handleClose={handleClose}
        ></TransactionDialog>
    </Box>
  )
}

function MembersTabPabel() {
  return (
    <Box pt={2}>
      Group Members
    </Box>
  )
}

export default function GroupDetailPage() {
  const { global, setGlobal } = useContext(GlobalContext) as GlobalContextInterface;
  const { currentGroup } = global;

  const navigate = useNavigate();

  const { groupId } = useParams();

  const { groups, transactions } = useLoaderData() as { groups: Group[], group: Group, transactions: Transaction[] };
  const [tabIndex, setTabIndex] = useState(0);

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
      component: SummaryTabPanel
    },
    {
      name: 'Transactions',
      component: TransactionsTabPanel
    },
    {
      name: 'Members',
      component: MembersTabPabel
    },
  ]

  return (
    <Container>
      <Box>
        <GroupToolbar
          groups={groups}
        />
      </Box>
      <Box>
        <Box>
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
    </Container>
  )
}