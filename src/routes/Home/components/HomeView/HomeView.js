import React from 'react';
import ArticleGallery from '../ArticleGallery';
import ArticleCarousel from '../ArticleCarousel';


export const HomeView = props => (
  <div>
    <ArticleGallery />
    <h2 style={{textAlign: 'center'}}>Novedades</h2>
    <ArticleCarousel />
  </div>
);
export default HomeView;
