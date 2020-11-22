import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CircularProgress,
  Collapse,
  createStyles,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Menu,
  Theme,
  useTheme,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { isEmpty } from 'lodash';
import { useCategories } from 'hooks';
import { Category } from 'types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listContainer: {
      outline: 'none',
    },
    itemContainer: {
      justifyContent: 'space-between',
    },
    subItemContainer: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const BurgerMenu = () => {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [subMenuOpen, setSubMenuOpen] = React.useState<string>();

  const { categories, isLoadingCategories } = useCategories();

  const handleMenuClose = () => {
    setSubMenuOpen('');
    setAnchorEl(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (category: Category, subCategory?: Category) => {
    history.push(
      `/products/${category.name}${subCategory ? `/${subCategory.id}` : ''}`
    );

    handleMenuClose();
  };

  const handleItemExpandClick = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    category: Category
  ) => {
    event.stopPropagation();
    setSubMenuOpen(subMenuOpen === category.name ? '' : category.name);
  };

  return (
    <>
      <IconButton
        aria-controls="long-menu"
        aria-haspopup="true"
        aria-label="more"
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>

      <Menu
        keepMounted
        PaperProps={{
          style: {
            marginTop: theme.spacing(7),
            maxHeight: theme.spacing(6) * 4,
            width: 'fit-content',
            minWidth: theme.spacing(25),
          },
        }}
        anchorEl={anchorEl}
        id="long-menu"
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {isLoadingCategories ? (
          <CircularProgress />
        ) : (
          <List aria-labelledby="nested-menu" className={classes.listContainer}>
            {(categories || []).map((category) => (
              <>
                <ListItem
                  key={category.id}
                  button
                  className={classes.itemContainer}
                  onClick={() => handleItemClick(category)}
                >
                  {category.name}
                  {!isEmpty(category.subCategories) &&
                    (subMenuOpen === category.name ? (
                      <ExpandLess
                        onClick={(evt) => handleItemExpandClick(evt, category)}
                      />
                    ) : (
                      <ExpandMore
                        onClick={(evt) => handleItemExpandClick(evt, category)}
                      />
                    ))}
                </ListItem>

                {!isEmpty(category.subCategories) && (
                  <Collapse
                    unmountOnExit
                    in={subMenuOpen === category.name}
                    timeout="auto"
                  >
                    <List disablePadding>
                      {(category.subCategories || []).map((subCategory) => (
                        <ListItem
                          key={`${category.id}-${subCategory.id}`}
                          button
                          className={classes.subItemContainer}
                          onClick={() => handleItemClick(category, subCategory)}
                        >
                          {subCategory}
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </>
            ))}
          </List>
        )}
      </Menu>
    </>
  );
};

export default BurgerMenu;
