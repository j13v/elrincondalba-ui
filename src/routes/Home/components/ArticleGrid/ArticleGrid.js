import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import ArticleTile from '../ArticleTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {

  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
function ArticleGrid({articles, classes}) {

  return (
    <div className={classes.root}>
      <GridList cellHeight="auto" className={classes.gridList} cols={4} spacing={30}>
        {articles.map((article, key) => (
          <GridListTile key={key}>
            <ArticleTile article={article} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

ArticleGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ArticleGrid);
