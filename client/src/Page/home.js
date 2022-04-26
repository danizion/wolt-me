import React, { useState } from 'react';
import Card from "../Components/card";
import MyCard from "../Components/card";
import {Grid} from "@mui/material";

function Home() {
    // Declare a new state variable, which we'll call "count"
    const [count, setCount] = useState(0);

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MyCard/>
                </Grid>
            </Grid>
        </div>
    );
}


export default Home