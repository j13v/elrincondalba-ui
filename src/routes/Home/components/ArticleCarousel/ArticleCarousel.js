import React from 'react';
import ArticleItem from '../../../../components/ArticleItem';


const articleItemStyle = {width: '25%', padding: '0 8px'};

export const ArticleCarousel = () => (
  <div style={{display: 'flex', margin: '0 -8px'}}>
    <ArticleItem style={articleItemStyle} />
    <ArticleItem style={articleItemStyle} />
    <ArticleItem style={articleItemStyle} />
    <ArticleItem style={articleItemStyle} />
  </div>
);

export default ArticleCarousel;
