import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';

const heroStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.grey[200],
    padding: theme.spacing(8, 0, 6),
    textAlign: 'center',
  },
}));

interface HeroProperties {
  title: string,
  subtitle: string,
  children?: JSX.Element,
}

const Hero = (properties: HeroProperties): JSX.Element => {
  const { title, subtitle, children } = properties;
  const classes = heroStyles();
  return (

    <div className={classes.heroContent}>
      <Container maxWidth="sm" component="section" aria-label="Hero">
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {subtitle}
          </Typography>
        )}
        { children }
      </Container>
    </div>
  );
};

export default Hero;
