import * as React from 'react';
import { useState ,useEffect} from 'react';
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
import Test from './test';

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
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedTopping, setSelectedTopping] = useState(null);

  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [selectedFlavorId, setSelectedFlavorId] = useState(null);
  const [selectedToppingId, setSelectedToppingId] = useState(null);

  const [cakeMessage, setCakeMessage] = useState('');
  const [extraInstructions, setExtraInstructions] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const editingData = location.state;
    if (editingData) {
      setSelectedShape(editingData.shape);
      setSelectedFlavor(editingData.flavor);
      setSelectedFlavorId(editingData.flavor?._id);
      setSelectedTopping(editingData.topping);
      setSelectedToppingId(editingData.topping?._id);
      setSelectedColor(editingData.color);
      setCakeMessage(editingData.message || '');
      setUploadedFile(editingData.file || null);
      setExtraInstructions(editingData.instructions || '');
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const totalTabs = 5;
  const isAllSelected = selectedShape && selectedFlavor && selectedColor && selectedTopping;
  const handleCakeInfo = () => {

    const cakeInfo = {
      shape: selectedShape,
      flavor: selectedFlavor,
      color: selectedColor,
      topping: selectedTopping,
      message: cakeMessage,
      instructions: extraInstructions,
      file: uploadedFile,
    };
    console.log('Cake Info:', {
      cakeInfo,
    });
    navigate('/cakeinformation', { state: cakeInfo });
    alert('✅ Displaying Cake Info! See console.');
  }
  const handleNext = () => {
    if (value < totalTabs - 1) {
      setValue((prev) => prev + 1);
      return;
    }

    if (isAllSelected) {
      handleCakeInfo();
    } else {
      if (!selectedShape) setValue(0);
      else if (!selectedFlavor) setValue(1);
      else if (!selectedColor) setValue(2);
      else if (!selectedTopping) setValue(3);
    }
  };
  return (
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
              onSelect={setSelectedShape}
              selectedId={selectedShapeId}
              onSelectId={setSelectedShapeId}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FlavorTab
              onSelect={setSelectedFlavor}
              shape={selectedShape}
              selectedId={selectedFlavorId}
              onSelectId={setSelectedFlavorId}
            />

          </TabPanel>
          <TabPanel value={value} index={2}>
            <ColorTab onSelect={setSelectedColor} selectedColor={selectedColor} />

          </TabPanel>
          <TabPanel value={value} index={3}>
            <ToppingTab
              onSelect={setSelectedTopping}
              shape={selectedShape}
              selectedId={selectedToppingId}
              onSelectId={setSelectedToppingId}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <CollectionTab
              message={cakeMessage}
              setMessage={setCakeMessage}
              file={uploadedFile}
              setFile={setUploadedFile}
              instructions={extraInstructions}
              setInstructions={setExtraInstructions}
            />
          </TabPanel>

          <Box sx={{ position: 'absolute', bottom: 33, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleNext} sx={{ bgcolor: '#42a5f5' }}>
              {value === totalTabs - 1 && isAllSelected ? 'Display Cake Info' : 'Next'}
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
        {selectedShape ? (
          <>
            {/* <Box
              component="img"
              srcSet={`${selectedShape?.image?.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${selectedShape?.image?.secure_url}?w=248&fit=crop&auto=format`}
              alt="cake"
              sx={{
                width: { xs: 220, sm: 280, md: 330 },
                height: { xs: 220, sm: 280, md: 330 },
                display: 'block',
              }}
            /> */}
            <CakePreview
              baseType={selectedShape?.baseType}
              flavor={selectedFlavor}
              topping={selectedTopping}
              color={selectedColor}
            />

            <Typography sx={{ position: 'absolute', right: 16, top: 16, color: '#42a5f5' }} variant="h6">
              {selectedShape?.price} ₪
            </Typography>
            <Test/>
          </>
        ) : (
          <Typography color="text.secondary">Please select a cake shape</Typography>
        )}
      </Box>
    </Box>
  );
}
