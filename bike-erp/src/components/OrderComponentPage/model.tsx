import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Model = (props: { title: any; order: any; }) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { title, order } = props

  return (
    <Card variant="outlined">
      <CardHeader
        title= {title}
      />
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Model;