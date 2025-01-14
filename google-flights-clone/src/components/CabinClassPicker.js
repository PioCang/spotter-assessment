import React from 'react';
import { Select, Space } from 'antd';

const CabinClassPicker = (props) => (
    <Select
      defaultValue="economy"
      style={{
        width: 180,
      }}
      onChange={props.setCabinClass}
      options={[
        {
          value: 'economy',
          label: 'Economy',
        },
        {
          value: 'premium_economy',
          label: 'Premium Economy',
        },
        {
          value: 'business',
          label: 'Business',
        },
        {
          value: 'first',
          label: 'First',
        },
      ]}
    />
);
export default CabinClassPicker;