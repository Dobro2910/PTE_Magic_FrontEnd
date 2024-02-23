/*eslint-disable*/ import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
const blogImage = require("assets/img/artworkblog.jpeg");

const useStyles = makeStyles((theme: Theme) => createStyles({
  image: {
    width: "100%"
  }
}));

export interface BlogCardProps {
  url: any;
  href: string;
  title: string;
  subtitle: string;
}

const BlogCard: React.FC<BlogCardProps> = (props) => {
  const { url, href, title, subtitle } = props;
  const classes = useStyles();
  return (
    <Card>
      <img src={url} className={classes.image}/>
      <CardContent>
        <a href={href}>{title}</a>
        <p>{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
