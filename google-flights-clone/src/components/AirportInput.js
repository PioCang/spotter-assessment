import React, { useMemo, useEffect, useState } from 'react';
import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import { searchAirports } from '../services/flightService';

const SearchInput = (props, debounceTimeout=300) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const debouncedFetcher = useMemo(() => {
    const loadAirportOptions = async (searchValue) => {
      if (fetching) {
        return;
      }

      setOptions([]);
      setFetching(true);

      let options = await searchAirports(searchValue);
      setOptions((options.data || []).filter((airportOption) => {
        return airportOption.navigation.entityType == "AIRPORT";
      }));
      setFetching(false);
    };

    return debounce(loadAirportOptions, debounceTimeout);
  }, [searchAirports, debounceTimeout]);

  const handleSelectionMade = (selectedValue) => {
    setValue(selectedValue);
    let airportObject = options.find((airport) => airport.presentation.suggestionTitle == selectedValue);
    props.airportMutator(airportObject);
  };

  useEffect(() => {
    if (props.targetAirport == null && value) {
      setValue(null);
      setOptions([]);
    }
  }, [props.targetAirport]);

  return (
    <Select
      showSearch
      value={value}
      placeholder={props.placeholder}
      style={{width: 500}}
      defaultActiveFirstOption={false}
      suffixIcon={null}
      filterOption={false}
      onSearch={debouncedFetcher}
      onChange={handleSelectionMade}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={(options || [])
        .map((airportOption, index) => ({
          value: airportOption.presentation.suggestionTitle,
          title: index,
        }))
      }
    />
  );
};

export default SearchInput;