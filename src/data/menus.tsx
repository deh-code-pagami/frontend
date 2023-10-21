import routes from "./routes";
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default {
  mainNavigation: {
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
}