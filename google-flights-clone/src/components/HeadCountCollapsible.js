import React from 'react';
import { Collapse, Row, Col, InputNumber, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const HeadCountCollapsible = (props) => (
  <Collapse
    style={{width: 200}}
    expandIconPosition="end"
    size="small"
    defaultActiveKey={[]}
    items={[
      {
        key: '1',
        label: <Space direction="horizontal">
          <UserOutlined />
          {props.passengerCount}
        </Space>,
        children: <>
          <Row>
            <Col span={12}>Adults</Col>
            <Col span={12}>
              <InputNumber min={1} defaultValue={1} onChange={props.setAdultsCount} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>Children</Col>
            <Col span={12}>
              <InputNumber min={0} defaultValue={0} onChange={props.setChildrenCount} />
            </Col>
          </Row>
          <Row>
            <Col span={12}>Infants</Col>
            <Col span={12}>
            <InputNumber min={0} defaultValue={0} onChange={props.setInfantsCount} />
            </Col>
          </Row>
        </>,
      },
    ]}
  />
);
export default HeadCountCollapsible;