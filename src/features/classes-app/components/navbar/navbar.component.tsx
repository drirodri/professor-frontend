import { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from '@mui/material';

import { SidebarData } from './SidebarData';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={showSidebar}>
              <FaIcons.FaBars />
            </IconButton>
            <Typography variant="h6" component="h1">
              Professor Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer 
          anchor="left" 
          open={sidebar} 
          onClose={showSidebar} 
          sx={{ '& .MuiDrawer-paper': { backgroundColor: '#ffffff', width: '240px' } }}
        >
          <Box 
            role="presentation" 
            onClick={showSidebar} 
            onKeyDown={showSidebar} 
            sx={{ padding: '20px', height: '100%', backgroundColor: '#f4f4f4' }}
          >
            <IconButton onClick={showSidebar} sx={{ marginBottom: '20px' }}>
              <AiIcons.AiOutlineClose />
            </IconButton>
            <Typography variant="h5" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Menu
            </Typography>
            <Divider />
            <List>
              {SidebarData.map((item, index) => (
                <ListItem key={index} component={Link} to={item.path}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;