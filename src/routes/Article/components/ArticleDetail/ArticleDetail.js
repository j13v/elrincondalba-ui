// Core
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// Constants
import {
  ROUTING_ARTICLE_ORDER,
  ROUTING_ARTICLE_CREATE,
  ROUTING_ARTICLE_EDIT,
  ROUTING_ARTICLE_STOCK,
} from '@global/constants/routing';
// Router Components
import {Route, Switch} from 'react-router';
// Components
import SwitchAnimated from '@global/components/SwitchAnimated';
import ArticleInfo from '../ArticleInfo';
import ArticleOrderForm from '../ArticleOrderForm';
import ArticleStock from '../ArticleStock';


export default ({
  articleId,
  routeCreate = ROUTING_ARTICLE_CREATE,
  routeStock = ROUTING_ARTICLE_STOCK,
  routeEdit = ROUTING_ARTICLE_EDIT,
  routeOrder = ROUTING_ARTICLE_ORDER,
}) => (
  <SwitchAnimated>
    <Route path={routeOrder}>
      <ArticleOrderForm onRequest={console.log} stock="asdadsasd" />
    </Route>
    <Route path={routeStock}>
      <ArticleStock articleId={articleId} />
    </Route>
    <Route path={routeCreate}>
      <ArticleInfo />
    </Route>
    <Route path={routeEdit}>
      <ArticleInfo articleId={articleId} edit />
    </Route>
    <Route>
      <ArticleInfo articleId={articleId} />
    </Route>
  </SwitchAnimated>
);
// import classNames from 'classnames';
// import { makeStyles } from '@material-ui/styles';
// import Dropzone from 'react-dropzone';
// import LoadableImage from '@global/components/LoadableImage';
// import Button from '@material-ui/core/Button';
// import { useAuthz } from '@global/hooks';
// import style from './ArticleDetail.style';
// import ArticleInfo from '../ArticleInfo';
// import ArticleOrderForm from '../ArticleOrderForm';
//
//
// const sizes = ['XS', 'S', 'M', 'L', 'XL'];
// const useStyles = makeStyles(style);
//
// const useKeyDown = (handler, elem = document) => useEffect(() => {
//   elem.addEventListener('keydown', handler, false);
//   return () => {
//     elem.removeEventListener('keydown', handler, false);
//   };
// });
//
//
// const getImageByMode = (mode, images, previews) => (mode === 'edit'
//   ? previews
//   : images.map(id => `/images/${id}`));
//
//
// export const ArticleDetail = ({
//   loading,
//   mode,
//   id,
//   name,
//   category,
//   price,
//   images,
//   stock,
//   rating,
//   description,
//   onCreate,
//   match,
//   ...restProps
// }) => {
//   if (loading) {
//     return 'LOADING';
//   }
//
//   const classes = useStyles(restProps);
//   const [state, setState] = useState({
//     mode: 'view',
//     previews: [],
//     files: [],
//     selected: 0,
//   });
//   // const authz = useAuthz();
//   const authz = {can: () => true};
//
//   // useEffect(() => () => {
//   //   previews.forEach(preview => URL.revokeObjectURL(preview));
//   // }, [previews]);
//
//
//   const onDrop = (files) => {
//     setState({
//       ...state,
//       selected: state.previews.length,
//       previews: [...state.previews, ...files.map(file => URL.createObjectURL(file))],
//       files,
//     });
//   };
//
//   const setImageIndex = (index) => {
//     setState({
//       ...state,
//       selected: (index + previews.length) % previews.length,
//     });
//   };
//
//   const handleMode = (evt, mode) => {
//     setState({
//       ...state,
//       mode,
//     });
//   };
//
//   console.log(state.mode);
//   return (
//     <Grid container spacing={16}>
//       <Grid item xs={1}>
//         {getImageByMode(state.mode, images, state.previews).map((src, idx) => (
//           <LoadableImage
//             onClick={() => setState({...state, selected: idx})}
//             key={idx}
//             image={src}
//             style={{
//               height: '100px',
//               width: '100%',
//               filter: idx === state.selected ? 'none' : 'brightness(50%)',
//               cursor: 'pinter',
//             }} />
//         ))}
//       </Grid>
//       <Grid item xs={5}>
//         <div className={classes.mediaContent}>
//           <LoadableImage image={getImageByMode(state.mode, images, state.previews)[state.selected]} />
//           {state.mode === 'edit' && (
//           <Dropzone onDrop={onDrop} multiple={false}>
//             {({getRootProps, getInputProps, isDragActive}) => (
//               <div
//                 {...getRootProps()}
//                 className={classNames(classes.dropzone, {'dropzone--isActive': isDragActive})}
//               >
//                 <input {...getInputProps()} />
//                 {
//                   isDragActive
//                     ? <p>Drop files here...</p>
//                     : <p>Try dropping some files here, or click to select files to upload.</p>
//                 }
//               </div>
//             )}
//           </Dropzone>
//           )}
//         </div>
//       </Grid>
//       <Grid item xs={6}>
//         <Switch>
//           <Route path={ROUTING_ARTICLE_ORDER || `${match.path}/order`}>
//             <ArticleOrderForm onRequest={console.log} stock="asdadsasd" />
//           </Route>
//           <Route>
//             <ArticleInfo
//               id={id}
//               stock={stock}
//               loading={loading}
//               name={name}
//               category={category}
//               price={price}
//               rating={rating}
//               description={description}
//               onCreate={(evt, data) => onCreate(evt, {...data, images: state.files})}
//               onEdit={handleMode}
//               onUpdate={() => console.log('on update triggered in article detail')}
//               onRequest={handleMode}
//     />
//           </Route>
//         </Switch>
//
//       </Grid>
//     </Grid>
//   );
// };
//
//
// ArticleDetail.propTypes = {
//   loading: PropTypes.bool.isRequired,
//   images: PropTypes.arrayOf(PropTypes.string),
//   mode: PropTypes.oneOf(['edit', 'view']),
// };
//
// ArticleDetail.defaultProps = {
//   images: [],
//   mode: 'view',
// };
//
//
// export default ArticleDetail;
//
// // <LoadableImage style={{height: '600px', width: '100%'}} />
