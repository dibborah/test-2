import './App.css';
import { Button, Form, Input, Select, Space } from "antd";
import { PlusOutlined } from '@ant-design/icons';

function Apple() {
  const onFinish = (values) => {
    console.log({ values });
  };
  return (
    <div>
      <Form onFinish={onFinish} style={{ width: 500 }} >
        <Form.Item name={"teacher"} label="Teacher Name">
          <Input placeholder='Teacher Name' />
        </Form.Item>
        <Form.Item name={"class"} label="Class Name">
          <Input placeholder='Class Name' />
        </Form.Item>

        <Form.List name={"students"}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => {
                return (
                  <Space direction='horizontal'
                    key={field.key}
                    size={12}>
                    <Form.Item
                      name={[field.name, "first"]}
                      label={`${index + 1}-Student`}
                      rules={[{required:true, message:"First Name is required"}]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "last"]}
                    >
                      <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                      name={[field.name, "gender"]}
                    >
                      <Select placeholder="Gender" >
                        {["Male","Female"].map(gender => {
                          return <Select.Option value={gender} key={gender}>{gender}</Select.Option>
                        })}
                      </Select>
                    </Form.Item>
                  </Space>
                );
              })}
              <Form.Item>
                <Button
                  icon={<PlusOutlined />}
                  type='dashed'
                  block
                  onClick={() => { add() }}>
                  Add a Student
                </Button>
              </Form.Item>
              <Button htmlType='submit' type='primary'>Submit</Button>
            </>
          )}
        </Form.List>
      </Form>
    </div>

  );
}

export default Apple;
