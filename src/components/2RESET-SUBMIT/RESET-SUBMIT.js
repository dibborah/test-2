import { Form, Input, Checkbox, Button, Space, Select } from 'antd'

function App() {

    const [ form ] = Form.useForm();

    const onFinish = () => {
       form.resetFields();
    }

    const clearForm = () => {
            form.setFieldsValue({
                myName:"John Duo",
                gender:"Male",
                graduated:"checked",                
            })
    }

   return (
        <>
            <Form onFinish={onFinish} form={form}>
                <Form.Item name={"myName"} label="Name" style={{ width: 200 }}>
                    <Input placeholder='Enter Name' />
                </Form.Item>
                <Form.Item name={"gender"} label="Gender" style={{ width: 200 }}>
                    <Select name="Gender" placeholder={"Gender"} options={[
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
                <Form.Item name={"graduated"} label="Graduated" valuePropName='checked'>
                    <Checkbox />
                </Form.Item>
                <Space size={12}>
                    <Button danger onClick={clearForm}>Clear Fields</Button>
                    <Button htmlType='reset'>Reset</Button>
                    <Button htmlType='submit' type='primary' >Submit</Button>
                </Space>
            </Form>
        </>
    )
}

export default App;

