import { useState } from 'react';
import {
  Calendar,
  Form,
  InputNumber,
  DatePicker,
  Col,
  Row,
  Typography,
  Button,
} from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useDateStore } from '../store/dateStore';

const { Title } = Typography;

interface FormValues {
  workDays: number;
  restDays: number;
  startDate: Dayjs;
}

const HomePage = () => {
  const {
    workDays,
    restDays,
    startDate,
    setWorkDays,
    setRestDays,
    setStartDate,
  } = useDateStore();

  const [form] = Form.useForm();
  const [calendarValue, setCalendarValue] = useState(() => dayjs());

  const handleFormSubmit = (values: FormValues) => {
    setWorkDays(values.workDays);
    setRestDays(values.restDays);
    setStartDate(values.startDate);
  };

  const getDayData = (value: Dayjs) => {
    if (!startDate || workDays <= 0 || restDays <= 0) {
      return null;
    }

    const totalDaysInCycle = workDays + restDays;
    const diff = value.startOf('day').diff(startDate.startOf('day'), 'day');

    if (diff < 0) {
      return null;
    }

    const dayInCycle = diff % totalDaysInCycle;

    if (dayInCycle < restDays) {
      return { type: 'rest-day', content: '休' };
    } else {
      return { type: 'work-day', content: '班' };
    }
  };

  const cellRender = (date: Dayjs) => {
    const dayData = getDayData(date);
    if (!dayData) return null;

    return <div className={`day-label ${dayData.type}`}>{dayData.content}</div>;
  };

  const onPrevMonth = () => {
    setCalendarValue(calendarValue.subtract(1, 'month'));
  };

  const onNextMonth = () => {
    setCalendarValue(calendarValue.add(1, 'month'));
  };

  return (
    <div className="container">
      <Title level={2} style={{ textAlign: 'center' }}>
        周期日历
      </Title>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{ workDays, restDays, startDate }}
        >
          <Row gutter={16} align="bottom">
            <Col xs={24} md={6}>
              <Form.Item
                label="上班天数"
                name="workDays"
                rules={[{ required: true, message: '请输入上班天数' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item
                label="放假天数"
                name="restDays"
                rules={[{ required: true, message: '请输入放假天数' }]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                label="放假开始的日期"
                name="startDate"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  应用周期
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <div className="calendar-wrapper">
        <Button onClick={onPrevMonth} icon={<LeftOutlined />} />
        <div className="calendar-container">
          <Calendar
            cellRender={cellRender}
            value={calendarValue}
            onPanelChange={(date) => setCalendarValue(date)}
          />
        </div>
        <Button onClick={onNextMonth} icon={<RightOutlined />} />
      </div>
    </div>
  );
};

export default HomePage;
