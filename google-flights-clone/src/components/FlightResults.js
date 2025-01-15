import React from 'react';
import { Collapse, Divider } from 'antd';
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const FlightResults = () => (
  <>
    <Collapse
      size="large"
      items={[
        {
          key: '1',
          label: 'This is large size panel header',
          children: <p>{text}</p>,
        },
      ]}
    />
  </>
);
export default FlightResults;