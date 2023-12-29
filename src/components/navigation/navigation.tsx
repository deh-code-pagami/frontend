import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import routes from "../../data/routes";

export default function MainNavigation() {
  const menu = {
    'label': 'main navigation',
    'items': [
      {
        label: 'Groups',
        href: routes.groups,
        icon: <GroupsIcon/>
      },
      {
        label: 'Transactions',
        href: routes.transactions,
        icon: <ImportExportIcon/>
      },
      {
        // divider
      },
      {
        label: 'Settings',
        href: routes.profile,
        icon: <SettingsIcon/>
      }
    ]
  }

  return (
    <nav aria-label="main navigation">
      <List>
        {menu.items.map((item, index) => (
          !item.label ? <Divider key={index} sx={{marginY: '8px'}}/>
          : <ListItem key={index} disablePadding>
          <NavLink to={(item.href || '#')} style={{width: '100%', color: 'inherit'}}>
            <ListItemButton>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </NavLink>
        </ListItem>
        ))}
      </List>
    </nav>
  )
}