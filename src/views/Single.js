import {useLocation} from 'react-router-dom';
import {mediaUrl} from '../utils/variables';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';

const Single = () => {
  const location = useLocation();
  console.log(location);
  const file = location.state.file; // TODO in the next task: single media from props.location.state

  return (
    <>
      <Typography component="h1" variant="h2">
        {file.title}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image={mediaUrl + file.filename}
          alt={file.title}
          sx={{height: '60vh'}}
        />
        <CardContent>
          <Typography>{file.description}</Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant={'circle'} src={'logo192.png'} />
              </ListItemAvatar>
              <Typography variant="subtitle2">{file.user_id}</Typography>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
};

// TODO in the next task: add propType for location

export default Single;
