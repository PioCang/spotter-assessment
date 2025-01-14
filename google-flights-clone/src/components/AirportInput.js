import React, { useMemo, useRef, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';

import { searchAirports } from '../services/flightService';
import { set } from 'lodash';

const SearchInput = (props, debounceTimeout=300) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState();

  const debouncedFetcher = useMemo(() => {
    const loadAirportOptions = async (searchValue) => {
      if (fetching) {
        return;
      }

      setOptions([]);
      setFetching(true);

      let options = await searchAirports(searchValue);
      setOptions(options.data);
      setFetching(false);
    };

    return debounce(loadAirportOptions, debounceTimeout);
  }, [searchAirports, debounceTimeout]);

  const handleSelectionMade = (newValue) => {
    setValue(newValue);
  };

  const filteredOptions = () => {
    return (options || []).filter((airportOption) => {
      return airportOption.navigation.entityType == "AIRPORT";
    }).map((airportOption) => ({
      value: airportOption.presentation.suggestionTitle,
      title: airportOption.presentation.suggestionTitle,
    }));
  }

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={props.style}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debouncedFetcher}
      onChange={handleSelectionMade}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={filteredOptions()}
    />
  );
};

export default SearchInput;