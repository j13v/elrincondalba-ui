import React from 'react';
import ArticleCarousel from '@global/components/ArticleCarousel';
import ArticleGallery from '../ArticleGallery';


export const HomeView = props => (
  <div>
    <ArticleGallery />
    <h2 style={{textAlign: 'center'}}>Novedades</h2>
    <ArticleCarousel />
  </div>
);
export default HomeView;
