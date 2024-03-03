import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import ThemeSwitcher from './ThemeSwitcher';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <ThemeSwitcher/>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
