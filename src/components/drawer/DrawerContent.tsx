import { Box } from "@mui/system";
import MainNavigation from "../navigation/MainNavigation";
import PaletteToggler from "../buttons/PaletteToggler";

export default function DrawerContent() {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Box p={2} pb={0} textAlign={'end'}>
        <PaletteToggler/>
      </Box>
      <MainNavigation></MainNavigation>
    </Box>
  )
}