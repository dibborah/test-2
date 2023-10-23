import { Form, Input, Select, Checkbox, Button, Spin, Space } from 'antd';
import { useState } from 'react';

function App() {
    const [loading, setLoading] = useState(false);
    
    //useForm react hook for data control
    //The square breaket below is the below
    //One must provide the square bracket and never the flower braces

    const [form] = Form.useForm();

    const onFinish = () => {

        //Make an API call and then  submit

        //Not working . Expected: The below code should spin or load when form is submitted which takes 1 sec b/c of the setTimeout and spinner should turn false after the submit is executed
        //I donot know why the code is not workings

        setLoading(true);

        setTimeout(() => {
            form.resetFields();            
        }, 1000);

        setLoading(false);
    }

    const clearForm = () => {
        form.setFieldsValue(
       {     Name: "",
            Gender:"",
            graduated:"",
            }
        );
    }

    return (
        <>
            <Spin spinning={loading}>
                <Form onFinish={onFinish} form={form}
                    initialValues={{
                        Name: "John Duo",
                    }}>
                    <Form.Item label="Name" name={'Name'} style={{ width: 300, padding: "10px" }}>
                        <Input placeholder='Enter Name' />
                    </Form.Item>
                    <Form.Item label="Gender" name={'Gender'} style={{ width: 180, padding: "10px" }}>
                        <Select name="Gender" placeholder="Gender" options={[
                            {
                                label: "Male",
                                value: "Male"
                            },
                            {
                                label: "Female",
                                value: "Female"
                            },
                        ]} />
                    </Form.Item>
                    <Form.Item label="Graduated" name={'Graduated'} style={{ padding: "10px" }} valuePropName='checked'>
                        <Checkbox />
                    </Form.Item>
                    <Space size={12}>
                        {/* <Button danger onClick={clearForm}>Clear Fields</Button>
                        <Button htmlType='reset' type="default">Reset</Button> */}
                        <Button htmlType="submit" type="primary" >
                            Submit
                        </Button>
                    </Space>
                </Form>
            </Spin>
        </>
    )
}

export default App;