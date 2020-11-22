import React from 'react';
import {
  createStyles,
  Divider,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Map from 'components/shared/Map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      display: 'flex',
      width: '75%',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(2),
    },
    usefulLinks: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      paddingRight: theme.spacing(2),

      '& > *:not(:last-child):not(:first-child)': {
        marginBottom: theme.spacing(1),
      },

      '& > :first-child': {
        marginBottom: 'auto',
      },
    },
    map: {
      flex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '300px',
      color: 'white',
      backgroundColor: 'grey',
    },
    divider: {
      backgroundColor: '#B80C09',
    },
    footerContent: {
      backgroundColor: '#cccccc70',
    },
  })
);

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.footerContent}>
      <Divider className={classes.divider} />
      <div className={classes.footer}>
        <div className={classes.usefulLinks}>
          <Typography display="block" variant="caption">
            A CMAI - Consumíveis e Material de Apoio à Informática - é uma
            organização fundada em 1993 que, numa profunda sinergia de
            profissionais qualificados, presta hoje um serviço de excelência na
            venda de material informático e de material de escritório, a
            clientes particulares e a empresas, sempre com os melhores preços e
            com um serviço pós-venda que resulta de 20 anos de experiência e
            dedicação ao público e às suas necessidades.
          </Typography>

          <Link display="block">Informações de entrega</Link>
          <Link display="block">Política de Privacidade</Link>
          <Link display="block">Mapa do Site</Link>
        </div>

        <Map />
      </div>
      <Typography align="center" display="block" variant="overline">
        Copyright &copy; CMAI 2020
      </Typography>
    </div>
  );
};

export default Footer;
