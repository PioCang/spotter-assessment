import React, { useState }from 'react';
import { Collapse} from 'antd';
import FlightResultsEntryHeader from './FlightResultsEntryHeader';
import FlightResultsEntryBody from './FlightResultsEntryBody';


const FlightResults = (props) => {
  const [expandedPanelKeys, setExpandedPanelKeys] = useState([]);

  const build_collapsible_entry = (flightResult, index) => {
    return {
      key: index,
      label: <FlightResultsEntryHeader
        flightData={flightResult}
        isExpanded={expandedPanelKeys.includes(index.toString())}
      />,
      children: <FlightResultsEntryBody
        className='bg-slate-100'
        flightData={flightResult}
      />,
    };
  };

  const handleCollapsesOrExpansions = (expandedKeys) => {
    setExpandedPanelKeys(expandedKeys);
  }

  return (
    <>
      <Collapse
        className='bg-slate-200'
        expandIconPosition="end"
        size="large"
        onChange={handleCollapsesOrExpansions}
        items={(props.flightResults || [])
              .map((flightResult, index) => build_collapsible_entry(flightResult, index))
        }
      />
    </>
  )
};
export default FlightResults;