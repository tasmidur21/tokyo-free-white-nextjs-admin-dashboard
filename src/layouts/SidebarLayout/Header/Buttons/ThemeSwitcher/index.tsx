import {
  alpha,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeContext } from '@/theme/ThemeProvider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);
const themeTypes = [
  {
    type: "PureLightTheme",
    title: "PureLightTheme",
  },
  {
    type: "PureDarkTheme",
    title: "PureDarkTheme"
  },
  // {
  //   type: "PurpleFlowTheme",
  //   title: "PurpleFlowTheme"
  // },
  // {
  //   type: "GreyGooseTheme",
  //   title: "GreyGooseTheme"
  // }
]
function ThemeSwitcher() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [defaultTheme, setDefaultTheme] = useState<string>('PureLightTheme');

  const setThemeName  = useContext(ThemeContext)

  useEffect(() => {
    const curThemeName =
      window.localStorage.getItem('appTheme') || 'PureLightTheme';
    setDefaultTheme(curThemeName);
  }, []);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleThemeSelect = (e:any, item:any): void => {
    e.preventDefault();
    window.localStorage.setItem('appTheme', item.type)
    setDefaultTheme(item.type);
    setThemeName(item.type);
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title={defaultTheme}>
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <Brightness7Icon />
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Themes</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {
            themeTypes.map((_item,index) =>
              <ListItem
                sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
                onClick={(e) => handleThemeSelect(e, _item)}
                key={index}
              >
                <Box flex="1">
                  <Box display="flex">
                    <Typography>
                      {_item.type === defaultTheme ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold', marginLeft: "10px" }}>
                      {_item.title}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            )
          }
        </List>
      </Popover>
    </>
  );
}

export default ThemeSwitcher;
