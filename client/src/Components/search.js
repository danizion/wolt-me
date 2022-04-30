import React, { useCallback, useState } from "react";
import {TextField} from "@mui/material";

const DebounceSrcatch = () => {
    const [suggestions, setSuggestions] = useState("");
    const [restaurantsJsn, setRestaurantsJsn] = useState("test");

    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 500);
        };
    };

    const handleChange = (value) => {
        fetch(`http://localhost:8080/${value}`)
            .then((res) => res.json()).then((data) => setSuggestions(data))


     };

    const optimizedFn = useCallback(debounce(handleChange), []);

    return (
        <>
            <TextField InputLabelProps={{style:{color:'#aba9a9'}}}
                       id="standard-basic"
                       label="Search restaurant"
                       variant="standard" onChange={(e) => optimizedFn(e.target.value)}
            />

            {suggestions.length > 0 && (
                <div className="autocomplete">
                    {suggestions.map((el, i) => (
                        <div key={i} className="autocompleteItems">
                            <span className="options" onClick={()=>{console.log(el.slug)}}>{el.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default DebounceSrcatch;