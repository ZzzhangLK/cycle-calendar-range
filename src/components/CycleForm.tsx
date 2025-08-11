import {
  Form,
  InputNumber,
  DatePicker,
  Col,
  Row,
  Button,
  Collapse,
  Checkbox,
} from 'antd';
import type { Dayjs } from 'dayjs';
import { useDateStore } from '../store/dateStore';

interface FormValues {
  workDays: number;
  restDays: number;
  startDate: Dayjs;
  showCommuteDays: boolean;
  commuteDays: number;
}

const CycleForm = () => {
  const {
    workDays,
    restDays,
    startDate,
    showCommuteDays,
    commuteDays,
    setWorkDays,
    setRestDays,
    setStartDate,
    setShowCommuteDays,
    setCommuteDays,
  } = useDateStore();

  const [form] = Form.useForm();

  const handleFormSubmit = (values: FormValues) => {
    setWorkDays(values.workDays);
    setRestDays(values.restDays);
    setStartDate(values.startDate);
    setShowCommuteDays(values.showCommuteDays);
    setCommuteDays(values.showCommuteDays ? values.commuteDays : 0);
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          workDays,
          restDays,
          startDate,
          showCommuteDays,
          commuteDays,
        }}
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
              label="周期开始的日期"
              name="startDate"
              rules={[{ required: true, message: '请选择开始日期' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={4}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                确定
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Collapse ghost>
          <Collapse.Panel header="高级选项" key="1">
            <Row gutter={16} align="bottom">
              <Col xs={24} md={8}>
                <Form.Item name="showCommuteDays" valuePropName="checked">
                  <Checkbox>是否显示通勤日</Checkbox>
                </Form.Item>
              </Col>
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, currentValues) =>
                  prevValues.showCommuteDays !== currentValues.showCommuteDays
                }
              >
                {({ getFieldValue }) =>
                  getFieldValue('showCommuteDays') ? (
                    <Col xs={24} md={8}>
                      <Form.Item
                        label="通勤日"
                        name="commuteDays"
                        rules={[
                          { required: true, message: '请输入通勤日' },
                          {
                            type: 'number',
                            validator: (_, value) => {
                              if (value && value % 2 !== 0) {
                                return Promise.reject(
                                  new Error('通勤日必须为偶数'),
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <InputNumber min={0} style={{ width: '100%' }} />
                      </Form.Item>
                    </Col>
                  ) : null
                }
              </Form.Item>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </Form>
    </div>
  );
};

export default CycleForm;
