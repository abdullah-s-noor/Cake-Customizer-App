import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  BrushTwoTone, Cake, Collections, ColorLens, Icecream,
} from '@mui/icons-material';
import ShapeTab from './tabs/ShapeTab';
import FlavorTab from './tabs/FlavorTab';
import { Button } from '@mui/material';
import CakePreview from './CakePreview';
import ToppingTab from './tabs/ToppingTab';
import ColorTab from './tabs/ColorTab';
import CollectionTab from './tabs/CollectionTab';
import { useLocation, useNavigate } from 'react-router-dom';
import Test from './Test';
import axios from 'axios';
import Loader from '../../Loaders/Loader';

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
          {children} {/* ✅ Removed <Typography> to fix hydration error */}
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
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const [flavors, setFlavors] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState(null);

  const [toppings,setToppings]=useState([]);
  const [selectedTopping, setSelectedTopping] = useState(null);

  const [selectedColor,setSelectedColor] = useState(null);

  const [flavorFlag, setFlavorFlag] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/data/data.json');
      setShapes(data.shapes);
      const initialShape = await data.shapes[0];
      setSelectedShape(initialShape);
      setFlavors(initialShape.flavors);
      setToppings(initialShape.toppings);
    } catch (err) {

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSelectedShape = (shape) => {
    setSelectedShape(shape);
    setFlavors(shape.flavors);
    const matchedFlavor = shape.flavors.find(
      (flavor) => flavor.name === selectedFlavor?.name
    );
    setSelectedFlavor(matchedFlavor);
    

    setToppings(shape.toppings);
    const matchedtopping = shape.toppings.find(
      (topping) => topping.name === selectedTopping?.name
    );
    setSelectedTopping(matchedtopping);
  }
  return (
    <>
      {
        loading ? <Loader /> :
          <Box sx={{ display: 'flex', flexDirection: 'column-reverse', flexWrap: 'wrap', width: '100%', height: { sm: 500, md: 600 } }}>
            {/* TABS */}
            <Box
              sx={{
                width: { xs: '100%', sm: '50%' },
                flexGrow: 1,
                bgcolor: 'background.paper',
                display: 'flex',
                height: 'inherit',
              }}
            >
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  width: { xs: '25%', sm: 'none' },
                }}
              >
                <Tab icon={<Cake />} label="shape" {...a11yProps(0)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px', md: '14px' } }} />
                <Tab icon={<Icecream />} label="flavors" {...a11yProps(1)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px', md: '14px' } }} />
                <Tab icon={<ColorLens />} label="color" {...a11yProps(2)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px', md: '14px' } }} />
                <Tab icon={<BrushTwoTone />} label="topping" {...a11yProps(3)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px', md: '14px' } }} />
                <Tab icon={<Collections />} label="cake Collection" {...a11yProps(4)} sx={{ p: 0, minWidth: '0px', fontSize: { xs: '10px', md: '14px' } }} />
              </Tabs>

              {/* CONTENT RIGHT OF TABS */}
              <Box sx={{ width: { xs: '75%', sm: 'none' }, position: 'relative' }}>
                <TabPanel value={value} index={0}>
                  <ShapeTab
                    shapes={shapes}
                    selectedShape={selectedShape}
                    setSelectedShape={handleSelectedShape}
                    setFlavorFlag={setFlavorFlag}
                  />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <FlavorTab
                    flavors={flavors}
                    selectedFlavor={selectedFlavor}
                    setSelectedFlavor={setSelectedFlavor}
                    setFlavorFlag={setFlavorFlag}
                  />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <ColorTab
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}
                    setFlavorFlag={setFlavorFlag}
                  />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <ToppingTab
                    toppings={toppings}
                    selectedTopping={selectedTopping}
                    setSelectedTopping={setSelectedTopping}
                    setFlavorFlag={setFlavorFlag}
                  />
                </TabPanel>
              </Box>
            </Box>

            {/* PREVIEW SIDE */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: '100%', sm: '50%' },
                height: { xs: 300, sm: 'inherit' },
                position: 'relative',
              }}
            >
              <CakePreview
                selectedShape={selectedShape}
                selectedFlavor={selectedFlavor}
                selectedTopping={selectedTopping}
                selectedColor={selectedColor}
                flavorFlag={flavorFlag}

              />
            </Box>
          </Box>
      }
    </>
  );
}
