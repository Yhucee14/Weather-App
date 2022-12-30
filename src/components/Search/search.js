import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from '../api';
import './Search.css';

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)

      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name} ${city.countryCode}`,
            }
          })
        }
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  }

  setTimeout(() => {
    const box = document.getElementById('box');
  
    box.style.display = 'none';
  
    
  }, 8000);

  return (
    <div>
         <AsyncPaginate
      placeholder='Search for a city'
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    /> <br></br>

    <div id='box' className='intro'>
    <h1 className='text'>Welcome.</h1><br></br>
    <h1 className='text'> Dont let the heavens suprise you.</h1><br></br>
    <h1 className='text'> Input your city to stay updated.</h1>
    </div>

    </div>
 
  )
}

export default Search