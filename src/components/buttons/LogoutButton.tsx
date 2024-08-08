import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthenticationContext } from "../../providers/AuthenticationProvider";
import { useContext } from "react";

export default function LogoutButton() {
  const { dispatch } = useContext(AuthenticationContext);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/logout`, {
      method: "POST",
    });

    dispatch({ type: "logout" });
  };

  return (
    <Button
      sx={{
        p: 1,
        width: 32,
        height: 32,
        minWidth: "unset",
        border: "1px solid",
        borderColor: "border.main",
        borderRadius: "50%",
      }}
      onClick={logout}
    >
      <LogoutIcon sx={{ width: 18 }}></LogoutIcon>
    </Button>
  );
}
