import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import menus from "../../data/menus";

export default function MainNavigation(props : { menu?: Menu }) {
  const { menu = menus.mainNavigation } = props;

  return (
    <nav aria-label="main navigation">
      <List>
        {menu.items.map(item => (
          !item.label ? <Divider sx={{marginY: '8px'}}/>
          : <ListItem key={item.label} disablePadding>
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