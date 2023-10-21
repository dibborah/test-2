import { Button, Form, Space, Select, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

function App() {
    const onFinish = (values) => {
        console.log(values);
    }

    const initialValues = {
        teacher: "Sandeep Sir",
        students: [
            {},
            {
                first: "Aamir"
            }
        ]
    }

    return (
        <>
            <Form onFinish={onFinish} initialValues={initialValues} style={{ width: 500 }}>
                <Form.Item name="teacher" label="Teacher Name">
                    <Input type="text" placeholder='Teacher Name' />
                </Form.Item>
                <Form.Item name="class" label="Class Name">
                    <Input type="text" placeholder='Class Name' />
                </Form.Item>

                <Form.List name={"students"} >
                    {(fields, { add, remove }) => {
                        return (
                            <>
                                {fields.map((field, index) => {
                                    return (
                                        // <>
                                        <Space direction='horizontal'
                                            size={12}
                                            key={field.key}>
                                            <Form.Item
                                                name={[field.name, "first"]}
                                                label={`Student-${index + 1}`}
                                                rules={[{ required: true, message: "First name required" }]}>
                                                <Input placeholder="First Name" />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, "last"]} >
                                                <Input placeholder="Last Name" />
                                            </Form.Item>
                                            <Form.Item>
                                                <Select
                                                    name={"Gender"}
                                                    placeholder={"Gender"}>
                                                    {["male", "female"].map((gender) => {
                                                        return (<Select.Option key={gender} value={gender}>{gender}</Select.Option>)
                                                    })}

                                                </Select>
                                            </Form.Item>
                                            <MinusCircleOutlined style={{ height: 40, color: "red" }}
                                                onClick={() => { remove(field.name) }} />
                                        </Space>
                                        //  </>
                                    );
                                })}
                                <Form.Item>
                                    <Button
                                        type='dashed'
                                        icon={<PlusOutlined />}
                                        block
                                        onClick={() => {
                                            add();
                                        }}
                                    >
                                        Add a Student
                                    </Button>
                                </Form.Item>
                                <Button type="primary" htmltype="submit">Submit</Button>
                                
                            </>
                        )
                    }}
                </Form.List>
            </Form>
        </>
    )
}
export default App;