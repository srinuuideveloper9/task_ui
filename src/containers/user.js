import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AutoComplete from "../components/autocomplete";


export default function User() {

    const location = useLocation();

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        getAllCountries();
    }, []);

    const getAllCountries = async () => {
        try {
            let res = await fetch('http://localhost:3100/listcountries');
            let json = await res.json();
            setCountries(json.data);
        } catch (error) {
            console.log(error);
        }
    }

    const bindToCountries = async (event) => {
        if (event['type'] === 'new') {
            try {
                var details = {
                    'name': event['name'],
                };

                var formBody = [];
                for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");

                let res = await fetch('http://localhost:3100/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formBody
                })
                let json = await res.json();
                setCountries([...countries, json['data']]);
            } catch (error) {
                console.log(error);
            }
        }
        setSelectedCountry(event['name'])
    }
    return (<>
        <div style={{ display: 'flex' }}>
            <AutoComplete countries={countries} addAndSelectHandler={(event) => bindToCountries(event)} noOfItems={5} privilege={location.pathname} />
            <p style={{marginLeft: '20px', marginTop: '20px'}}> Selected Country: {selectedCountry} </p>

        </div>
    </>)
}