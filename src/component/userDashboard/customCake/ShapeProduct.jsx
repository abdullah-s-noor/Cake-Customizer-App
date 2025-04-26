import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarBelowImageList() {
  return (
    <ImageList sx={{m:'1px',  height: {xs:360,sm:500,md:600} ,
        overflowY: 'auto',
        margin: 0,
        '&::-webkit-scrollbar': {
          width: '10px',
        },
        '&::-webkit-scrollbar-track': {
          borderRadius: '8px',
          backgroundColor: '#e7e7e7',
          border: '1px solid #cacaca',
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          backgroundColor: '#42a5f5',
        },
    }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar sx={{textAlign:'center'}}
            title={item.title}
            subtitle={<span></span>}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: '/image/shape/base.png',
    title: 'base',
    author: '@bkristastucchio',
  },
  {
    img: '/image/shape/minibase.png',
    title: 'min base',
    author: '@rollelflex_graphy726',
  },
  {
    img: '/image/shape/square.png',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: '/image/shape/rectangle.png',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: '/image/shape/2layer.png',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: '/image/shape/heart.png',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: '/image/shape/heart.png',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: '/image/shape/heart.png',
    title: 'Hats',
    author: '@hjrc33',
  },
  
];
