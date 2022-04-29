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
        // var myHeaders = new Headers();
        // myHeaders.append("accept", "application/json, text/plain, */*");
        //
        // var requestOptions = {
        //     method: 'GET',
        //     headers: myHeaders,
        //     redirect: 'follow',
        // };
        //
        // fetch("https://restaurant-api.wolt.com/v1/pages/search?q=mex&lat=32.087236876497585&lon=34.78698525756491", requestOptions)
        //     .then(response => response.text())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
        var requestOptions = {
            method: 'GET',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin':'*'
            }
        };
        fetch("https://restaurant-api.wolt.com/v1/pages/search?q=giraffe&lat=32.087236876497585&lon=34.78698525756491", requestOptions)
            .then(response => response.json())
            .then(result => console.log(result))

        // fetch(`https://restaurant-api.wolt.com/v1/pages/search?q=giraffe&lat=32.087236876497585&lon=34.78698525756491`,requestOptions)
        //     .then((res) => res.text())
        //     .then((res) => console.log(res));

    //     fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    //         .then((res) => res.json())
    //         .then((json) => setSuggestions(json.data.items));


     };

    const optimizedFn = useCallback(debounce(handleChange), []);

    return (
        <>
            <TextField InputLabelProps={{style:{color:'#aba9a9'}}}
                       id="standard-basic"
                       label="Search restaurant"
                       variant="standard" onChange={(e) => optimizedFn(e.target.value)}
            />
            {/*<input*/}
            {/*    type="text"*/}
            {/*    className="search"*/}
            {/*    placeholder="Enter something here..."*/}
            {/*    onChange={(e) => optimizedFn(e.target.value)}*/}
            {/*/>*/}

            {suggestions.length > 0 && (
                <div className="autocomplete">
                    {suggestions.map((el, i) => (
                        <div key={i} className="autocompleteItems">
                            <span className="options" onClick={()=>{console.log(el.name)}}>{el.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default DebounceSrcatch;