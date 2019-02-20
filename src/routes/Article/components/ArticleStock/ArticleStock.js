// Core
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import gql from 'graphql-tag';
// Hooks
import {
  useQuery,
  useTheme,
  makeStyles,
} from '@global/hooks';
// Components
import SwipeableViews from 'react-swipeable-views';
import {withErrorBoundary} from '@global/components/ErrorBoundary';
// Mui Components
import Badge from '@material-ui/core/Badge';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Local Components
import ArticleStockList from './ArticleStockList';
import ArticleStockForm from './ArticleStockForm';
// Styles
import styles from './ArticleStock.styles';


const GET_ARTICLE_STOCK = gql`
query($articleId: ObjectID!){
  listArticleStock(id: $articleId) {
    count
    size
    refs {
      id
      order
      state
    }
  }
}
`;

export const findStockBySize = (stock, csize) => stock.find(({size}) => size === csize);
export const parseStock = (stock, sizes) => sizes.map(size => findStockBySize(stock, size));
export const useStyles = makeStyles(styles);

export const ArticleStock = ({
  suspend,
  articleId,
  sizes,
  ...restProps
}) => {
  const {
    data: {
      listArticleStock: stock,
    },
    error,
  } = useQuery(GET_ARTICLE_STOCK, {variables: {articleId}, suspend});

  const classes = useStyles(restProps);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const inventory = parseStock(stock, sizes);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };


  return (
    <div className={classes.root}>
      <Tabs value={value} onChange={handleChange}>
        {inventory.filter(Boolean).map(({size, count}, idx) => (
          <Tab
            key={idx}
            label={(
              <Badge
                color="secondary"
                badgeContent={count}
                classes={{badge: classes.badge}}>
                <span>{size}</span>
              </Badge>
          )} />
        ))}
      </Tabs>
      <ArticleStockForm style={{
        padding: '1em 1em',
        borderBottom: 'solid #efefef 1px',
      }} />
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{maxHeight: '400px', overflow: 'auto'}}
      >
        {inventory.map(({refs, size}, idx) => (
          <ArticleStockList key={idx} refs={refs} />
        ))}
      </SwipeableViews>
    </div>
  );
};

ArticleStock.propTypes = {
  suspend: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.string),
};

ArticleStock.defaultProps = {
  suspend: true,
  sizes: ['XS', 'S', 'M', 'L', 'XL'],
};


export default withErrorBoundary(ArticleStock);
