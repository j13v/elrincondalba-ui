import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconStarBorder from '@material-ui/icons/StarBorder';
import IconStar from '@material-ui/icons/Star';

const GET_ARTICLES = gql`
{
  listArticles(last: 20) {
    edges {
      node {
        id
        name
        description
        images
        price
        category
        rating
      }
    }
  }
}
`;

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export const ArticleTile = ({article, loading}) => {
  if (loading) {
    return <div>Loading ...</div>;
  }
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  return (


    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Avatar aria-label="Recipe" className={classes.avatar}>
            {article.price}
          </Avatar>
)}
        action={(
          <IconButton>
            <MoreVertIcon />
          </IconButton>
)}
        title={article.name}
        subheader={article.category}
      />
      <CardMedia
        className={classes.media}
        image="https://via.placeholder.com/300x120"
        title="Paella dish"
      />
      <CardContent>
        <Typography component="p">
          {article.description}
        </Typography>
        {(new Array(5).fill(null)).map((_, idx) => (article.rating <= idx ? <IconStarBorder key={idx} /> : <IconStar key={idx} />))}
        <p>{article.price}</p>
      </CardContent>
      <CardActions className={classes.actions} disableActionSpacing>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={classnames(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>More Description :</Typography>
          <Typography paragraph>
            {article.description}
          </Typography>
          <Typography paragraph>More Description 2:</Typography>
          <Typography paragraph>
            {article.description}
          </Typography>

        </CardContent>
      </Collapse>
    </Card>


  );
};

ArticleTile.propTypes = {
  article: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};


const flattenConnectionEdges = (data, loading) => (data && loading === false ? data.edges.map(edge => edge.node) : {edges: []});

const mapQueryToProps = ({data: {loading, listArticles}}) => ({articles: flattenConnectionEdges(listArticles, loading), loading: false});

export default graphql(GET_ARTICLES, {props: mapQueryToProps})(ArticleTile);
