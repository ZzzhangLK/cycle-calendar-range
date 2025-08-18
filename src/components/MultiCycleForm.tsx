import { JSX } from 'react';
import { useDateStore } from '../store/dateStore';
import type { MultiCycle } from '../store/dateStore';
import { Form, Input, InputNumber, DatePicker, Button, Collapse, Popconfirm, Space, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

/**
 * 多周期模式的表单组件。
 * 负责渲染、编辑、添加和删除多个周期。
 */
const MultiCycleForm = (): JSX.Element => {
  const {
    multiCycles,
    addMultiCycle,
    removeMultiCycle,
    updateMultiCycle,
  } = useDateStore();

  const handleValueChange = (id: string, changedValues: Partial<MultiCycle>) => {
    updateMultiCycle(id, changedValues);
  };

  const collapseItems = multiCycles.map((cycle) => {
    const panelHeader = (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <div style={{ width: 16, height: 16, backgroundColor: cycle.color, borderRadius: '50%' }} />
          <span>{cycle.name}</span>
        </Space>
        <Popconfirm
          title="确定要删除这个周期吗？"
          onConfirm={(e) => {
            e?.stopPropagation();
            removeMultiCycle(cycle.id);
          }}
          onCancel={(e) => e?.stopPropagation()}
          okText="确定"
          cancelText="取消"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Popconfirm>
      </div>
    );

    return {
      key: cycle.id,
      label: panelHeader,
      children: (
        <Form
          layout="vertical"
          initialValues={{
            ...cycle,
            startDate: cycle.startDate ? dayjs(cycle.startDate) : null,
          }}
          onValuesChange={(_, allValues) => handleValueChange(cycle.id, allValues)}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="周期名称" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="标记颜色" name="color">
                <Input type="color" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col xs={12} md={6}>
              <Form.Item label="上班天数" name="workDays">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={12} md={6}>
              <Form.Item label="放假天数" name="restDays">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="周期开始日期" name="startDate">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    };
  });

  return (
    <div>
      <Collapse items={collapseItems} accordion defaultActiveKey={multiCycles[0]?.id} />
      <Button type="primary" onClick={addMultiCycle} style={{ marginTop: 16, width: '100%' }}>
        添加新周期
      </Button>
    </div>
  );
};

export default MultiCycleForm;
