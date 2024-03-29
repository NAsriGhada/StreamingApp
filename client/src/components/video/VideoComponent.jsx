import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllVideos } from "../../redux/videoSlice";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Grid } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const VideoComponent = () => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const videos = useSelector((state) => state.video.videos);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllVideos());
  }, [dispatch]);
  console.log(videos);

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ maxWidth: "lg", margin: "auto" }}
        >
          {videos.map((el) => (
            <Grid item xs={12} sm={6} md={4} key={el._id}>
              <Card sx={{ maxWidth: 345, margin: "auto" }}>
                <CardHeader
                  avatar={
                    el.uploadedBy.picture ? (
                      <Avatar src={el.uploadedBy.picture} />
                    ) : (
                      <Avatar sx={{ bgcolor: red[500] }}>
                        {el.uploadedBy.username
                          ? el.uploadedBy.username.charAt(0).toUpperCase()
                          : ""}
                      </Avatar>
                    )
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={el.title}
                  subheader={`uploaded on ${new Date(el.createdAt).toLocaleDateString()}`}
                />
                <CardMedia
                  component="video"
                  height="194"
                  controls
                  src={el.videoUrl}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {el.description}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>{/* Additional content */}</CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default VideoComponent;
