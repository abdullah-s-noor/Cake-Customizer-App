import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Brush, BrushRounded, BrushTwoTone, Cake, Collections, ColorLens, Icecream } from '@mui/icons-material';
import ShapeProduct from './ShapeProduct';
import { Button } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flexWrap: 'wrap', width: '100%', height: { sm: 500 ,md:600}, }}>
      <Box
        sx={{ width: { xs: '100%', sm: '50%' }, flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'inherit',  }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1, borderColor: 'divider',
            width: { xs: '25%', sm: 'none' }
          }}
        >
          <Tab icon={<Cake />} label="shape" {...a11yProps(0)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px ', md: '14px' } }} />
          <Tab icon={<Icecream />} label="flavors" {...a11yProps(1)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px ', md: '14px' } }} />
          <Tab icon={<ColorLens />} label="color" {...a11yProps(2)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px ', md: '14px' } }} />
          <Tab icon={<BrushTwoTone />} label="topping" {...a11yProps(3)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px ', md: '14px' } }} />
          <Tab icon={<Collections />} label="cake Collection" {...a11yProps(4)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px ', md: '14px' } }} />

        </Tabs>
        <Box sx={{ width: { xs: '75%', sm: 'none' }, position: 'relative'}}>
          <TabPanel value={value} index={0}>
            <ShapeProduct />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ShapeProduct />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ShapeProduct />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ShapeProduct />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ShapeProduct />
          </TabPanel>

          <Box sx={{ position: 'absolute', bottom: 33, left: 0, right: 0, display: 'flex', justifyContent: 'center' ,}}>
  <Button variant="contained" color="primary"sx={{bgcolor:'#42a5f5'}}>
    Next
  </Button>
</Box>

        </Box>
        
      </Box>

      <Box sx={{ display: 'flex', 
        justifyContent: 'center', alignItems: 'center', width: { xs: '100%', sm: '50%' }, height: { xs: 300, sm: 'inherit' },position:'relative' }}>
        <Box
          component="img"
          src="image/shape/base.png"
          alt="cake"
          sx={{ width: { xs: 220, sm: 280, md: 330 }, height: { xs: 220, sm: 280, md: 330 }, display: 'block' }}
        />
      <Typography sx={{position:'absolute',right:16,top:16,color:'#42a5f5'}} variant="h6" color="initial">12345 ₪</Typography>
      </Box>
    </Box>


  );
}









