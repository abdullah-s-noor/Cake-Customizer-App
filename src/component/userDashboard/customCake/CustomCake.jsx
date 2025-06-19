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
import CollectionTab from './tabs/CollectionTab';
import { Button } from '@mui/material';
import CakePreview from './CakePreview';
import ToppingTab from './tabs/ToppingTab';
import ColorTab from './tabs/ColorTab';
import { useLocation, useNavigate } from 'react-router-dom';
import Test from './Test';
import Loader from '../../Loaders/Loader';
import { order } from '@mui/system';
import { useOutletContext } from 'react-router-dom';
import {api} from '../../../api/api';
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
          {children}
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

  // @ts-ignore

  const navigate = useNavigate();
  const location = useLocation();


  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(location?.state?.orderDetails?.shape || null);

  const [flavors, setFlavors] = useState([]);
  const [selectedFlavor, setSelectedFlavor] = useState(location?.state?.orderDetails?.flavor || null);

  const [toppings, setToppings] = useState([]);
  const [selectedTopping, setSelectedTopping] = useState(location?.state?.orderDetails?.topping || null);

  const [selectedColor, setSelectedColor] = useState(location?.state?.orderDetails?.color || null);

  const [price, setPrice] = useState(0);

  const [uploadedFile, setUploadedFile] = useState(location?.state?.orderDetails?.file || null);
  const [cakeMessage, setCakeMessage] = useState(location?.state?.orderDetails?.cakeMessage || '');
  const [instructions, setInstructions] = useState(location?.state?.orderDetails?.instructions || '');


  useEffect(() => {


    const fetchData = async () => {
      try {
        const { data } = await api.get('/custom/shapes/options');
        setShapes(data.shapes);
        let initialShape = await data.shapes[0];
        if (location?.state?.orderDetails?.shape) {
          initialShape = data.shapes.find((shape) => (shape._id == selectedShape._id));
        }
        handleSelectedShape(initialShape);
      } catch (err) {

      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectedShape = (shape) => {
    const { flavors, toppings, ...thisShape } = shape
    console.log('shape', shape);
    setSelectedShape(thisShape);
    setFlavors(shape.flavors);
    const matchedFlavor = shape.flavors.find(
      (flavor) => flavor.name.split('_')[1] === selectedFlavor?.name.split('_')[1]
    );
    setSelectedFlavor(matchedFlavor);

    setToppings(shape.toppings);
    const matchedtopping = shape.toppings.find(
      (topping) => topping.name.split('_')[1] === selectedTopping?.name.split('_')[1]
    );
    setSelectedTopping(matchedtopping);
    const filePrice = uploadedFile ? 4 : 0;
    setPrice(shape.price + (matchedFlavor?.price || 0) + (matchedtopping?.price || 0) + filePrice);
  }
  const handlePriceChange = (oldPrice, newPrice) => {
    setPrice((prev) => prev - oldPrice + newPrice);
  }

  const handleSubmit = () => {

    /** collect details in one object */
    const orderDetails = {
      shape: selectedShape,
      flavor: selectedFlavor,
      topping: selectedTopping,
      color: selectedColor,
      cakeMessage: cakeMessage,
      file: uploadedFile,
      instructions: instructions,
      price: price,
    }

    navigate('/cakeinformation', { state: { orderDetails } });

  }
  const totalTabs = 5;
  const isAllSelected = selectedShape && selectedFlavor && selectedTopping;
  const handleNext = () => {
    if (value < totalTabs - 1) {
      setValue((prev) => prev + 1);
      return;
    }

    if (isAllSelected) {
      handleSubmit();
    } else {
      if (!selectedShape) setValue(0);
      else if (!selectedFlavor) setValue(1);
      else if (!selectedColor) setValue(2);
      else if (!selectedTopping) setValue(3);
    }
  };
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
                
                // @ts-ignore
                textColor="#723d46"
                indicatorColorindicatorColorindicatorColor
                sx={{
                  borderRight: 1,
                  borderColor: 'divider',
                  width: { xs: '25%', sm: 'none' },
                  '& .Mui-selected': {
                    color: '#723d46',
                  },
                  '& .MuiTabs-indicator': {
                    backgroundColor: '#723d46',
                  },
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

                  />
                </TabPanel>

                <TabPanel value={value} index={1}>    
                  {
                  flavors.length>0?              
                  <FlavorTab
                    flavors={flavors}
                    selectedFlavor={selectedFlavor}
                    setSelectedFlavor={setSelectedFlavor}
                    handlePriceChange={handlePriceChange}
                  />
                  :<Typography sx={{textAlign:'center'}} variant='body1'>No flavors available</Typography>
                  }
                </TabPanel>

                <TabPanel value={value} index={2}>
                  <ColorTab
                    selectedColor={selectedColor}
                    setSelectedColor={setSelectedColor}

                  />
                </TabPanel>

                <TabPanel value={value} index={3}>
                  {
                  toppings.length>0?<ToppingTab
                    toppings={toppings}
                    selectedTopping={selectedTopping}
                    setSelectedTopping={setSelectedTopping}
                    handlePriceChange={handlePriceChange}
                  />:<Typography sx={{textAlign:'center'}} variant='body1'>No toppings available</Typography>}
                </TabPanel>
                <TabPanel value={value} index={4}>
                  <CollectionTab
                    message={cakeMessage}
                    setMessage={setCakeMessage}
                    file={uploadedFile}
                    setFile={setUploadedFile}
                    instructions={instructions}
                    setInstructions={setInstructions}
                    handlePriceChange={handlePriceChange}
                  />
                </TabPanel>

                <Box sx={{ position: 'absolute', bottom: 2, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
                  <Button onClick={handleNext} variant='contained' sx={{

                    backgroundColor: '#723d46',
                    '&:hover': {
                      backgroundColor: '#5a2f38',
                      color: 'white',
                    },
                    width: { xs: '100%' },
                    height: '30px',
                    fontSize: { xs: '14px', sm: '17px' },
                    padding: '0 12px',
                    textTransform: 'none',
                    boxShadow: 'none',
                    borderRadius: '8px',
                    mt: 2,
                    mr: 2,
                    ml: 2,
                  }}>
                    {(value === 4 && isAllSelected) ? 'Display Cake Info' : 'Next Tab'}
                  </Button>
                </Box>
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
                value={value}
              />
              <Typography sx={{ position: 'absolute', right: 16, top: 16, color: '#723d46' }} variant="h6">
                {price} ₪
              </Typography>
            </Box>


          </Box>

      }

    </>
  );
}
