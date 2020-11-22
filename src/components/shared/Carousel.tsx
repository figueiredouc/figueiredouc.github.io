import React from 'react';
import MaterialCarousel from 'react-material-ui-carousel';
import { createStyles, makeStyles, Paper } from '@material-ui/core';

export interface CarouselProps {
  items: CarouselItem[];
}

export interface CarouselItem {
  name: string;
  imageSrc: string;
  description?: string;
  clickFn?: Function;
}

const useStyles = makeStyles(() =>
  createStyles({
    carouselItemContainer: {
      display: 'flex',
      minHeight: '300px',
      maxHeight: '300px',
    },
    carouselItemImg: {
      width: '100%',
      objectFit: 'cover',
    },
  })
);

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <MaterialCarousel
      navButtonsAlwaysVisible
      animation="slide"
      autoPlay={false}
      indicators={false}
    >
      {items.map((item) => (
        <CarouselItem key={item.name} {...item} />
      ))}
    </MaterialCarousel>
  );
};

const CarouselItem: React.FC<CarouselItem> = ({ imageSrc, name }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.carouselItemContainer} elevation={0}>
      <img alt={name} className={classes.carouselItemImg} src={imageSrc} />
    </Paper>
  );
};

export default Carousel;
