import { Box } from "@mui/system";
import MainNavigation from "../navigation/navigation";
import PaletteToggler from "../buttons/palette-toggler";

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