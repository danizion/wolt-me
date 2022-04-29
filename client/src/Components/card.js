import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../App.css'
import {Grid, TextField} from "@mui/material";
import DebounceSrcatch from "./search";


export default function MyCard() {
    const mystyle = {
        webkitBoxShadow: "0px 10px 12px 10px rgba(171,171,171,0.7)",
    boxShadow: "0px 10px 12px 10px rgba(171,171,171,0.7)",
        textAlign:"center",
        padding:"10px"
};
    return (
        <Card style={mystyle} >
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xs={12}>
                    <h1>Welcome you hungry little beauty</h1>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <p>Ever felt the crave for a restaurant but when you try to order its closed for orders?</p>
                    <p>Ever felt to lazy to check every 2 minutes if the restaurant is open for orders?</p>
                    <p>Well look no further my lazy hungry friend! simply search for the restaurant and we will send you an email when it opens</p>
                </Grid>
                <Grid  item lg={7.8} md={7.8} xs={7.8} >
                    <TextField InputLabelProps={{style:{color:'#aba9a9'}}} id="standard-basic" label="Email" variant="standard" />
                </Grid>
                <Grid item lg={2} md={2} xs={2}>
                    <DebounceSrcatch/>
                </Grid>
                <Grid item lg={12} md={12} xs={12}>
                    <Button variant="outlined">Alert the hell out of me!</Button>
                </Grid>

            </Grid>
        </Card>

    );
}
