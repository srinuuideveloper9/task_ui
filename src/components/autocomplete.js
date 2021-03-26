import { useEffect, useState } from "react";
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

let filteredData = [];

export default function AutoComplete({
    privilege,
    noOfItems,
    addAndSelectHandler,
    countries
}) {
    const [showPopup, setShowPopup] = useState(false);
    const [dropdownData, setDropdownData] = useState([]);
    const [notFoundResult, setNotFoundResult] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        if (countries && countries.length) {
            checkAndFilterData();
        }
    }, [countries])

    const handleInput = (value) => {
        if (value) {
            if (countries.some(country => country && country['name'].toLowerCase().includes(value.toLowerCase()))) {
                filteredData = countries.filter(country => country && country['name'].toLowerCase().includes(value.toLowerCase()));
            } else {
                if (privilege === '/admin') {
                    setNotFoundResult(value);
                    filteredData = [];
                }
            }
        } else {
            filteredData = countries;
        }
        if (filteredData.length) {
            setNotFoundResult('');
            setDropdownData(noOfItems ? filteredData.length >= noOfItems ? filteredData.slice(0, noOfItems) : filteredData : filteredData);
        } else {
            setDropdownData(filteredData);
        }
        setSearchInput(value);
    }

    const handleRemainingItems = () => {
        setDropdownData(filteredData);
    }

    const bindToCuntries = () => {
        addAndSelectHandler({
            name: notFoundResult,
            type: 'new'
        });
        setSelectedCountry(notFoundResult);
        setShowPopup(false);
    }

    const selectInput = (value) => {
        setSelectedCountry(value);
        addAndSelectHandler({
            name: value,
            type: 'existing'

        });
        setShowPopup(false);
        checkAndFilterData();

    }

    const checkAndFilterData = () => {
        filteredData = countries;
        setNotFoundResult('');
        setDropdownData(noOfItems ? filteredData.length >= noOfItems ? filteredData.slice(0, noOfItems) : filteredData : filteredData);
    }

    return (
        <>
            <div style={{ width: '300px', margin: '15px', position: 'relative' }}>
                <div onClick={() => setShowPopup(!showPopup)} style={{ display: 'flex', cursor: 'pointer', justifyContent: 'space-between', alignItems: 'center', position: 'relative', border: '1px solid #666', padding: '10px' }}>
                    <p style={{ fontSize: '15px', margin: '0', fontWeight: '500' }}>{selectedCountry ? selectedCountry : 'Select a location'}</p>
                    <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '10px', borderLeft: '1px solid #666' }}><ArrowDropDownIcon /></div>
                </div>
                {
                    showPopup && (
                        <div style={{ padding: '10px', position: 'absolute', width: '300px', top: '34px', border: '1px solid #666', borderTop: 'none' }}>
                            <div className="input-group mb-3 mt-3">
                                <span className="input-group-text"><SearchIcon /></span>
                                <input type="text" className="form-control" placeholder="Search" onKeyUp={(e) => handleInput(e.target.value)} />
                            </div>
                            <div className="mt-2">
                                {
                                    notFoundResult && <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ marginBottom: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>"{notFoundResult}" not found</p>
                                            <button className="btn btn-success" onClick={bindToCuntries}>Add & Select</button>
                                        </div>
                                    </>}
                                {dropdownData && dropdownData.length ? (
                                    <>
                                        {
                                            dropdownData.map(country => (
                                                <p onClick={() => selectInput(country['name'])} key={country['name']} style={{ marginBottom: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '500' }}>{country['name']}</p>
                                            ))
                                        }
                                        {dropdownData.length !== filteredData.length && filteredData.length > noOfItems && (
                                            <p className="text-muted text-right" style={{ cursor: 'pointer' }} onClick={handleRemainingItems}>{filteredData.length - noOfItems} more ....</p>
                                        )
                                        }
                                    </>) : <></>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}