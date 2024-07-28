import { Box } from "@mui/system";
import MainNavigation from "../navigation/MainNavigation";
import PaletteToggler from "../buttons/PaletteToggler";
import LogoutButton from "../buttons/LogoutButton";

export default function DrawerContent() {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Box display={'flex'} alignItems={'center'} p={2} pb={0} >
        <Box>
          <LogoutButton></LogoutButton>
        </Box>
        <Box marginLeft={'auto'}>
          <PaletteToggler/>
        </Box>
      </Box>
      <MainNavigation></MainNavigation>
    </Box>
  )
}