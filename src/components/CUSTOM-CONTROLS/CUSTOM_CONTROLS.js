import { Form, Input, Button } from 'antd'

const PlayerScores = ({ value, onChange }) => {
    return (
        <>
            <Button onClick={() => {
                onChange(value - 1);
            }}>-</Button>
            <span>{value}</span>
            <Button onClick={() => {
                onChange(value + 1);
            }}>+</Button></>
    )
}

const AdminEmail=({value})=>{
    // console.log({value});
    return <span>{value}</span>
}

function App() {
    return (
        <>
            <Form onFinish={(values) => {
                console.log(values);
            }}
                onFinishFailed={(failedValues) => {
                    console.log(failedValues);
                }}
                initialValues={{ playerScores: 0 , adminEmail: "admin@gmail.com"}}
            >
                <Form.Item
                    name={"myName"}
                    label={"Name"}
                    rules={[
                        {
                            required: true,
                            message: "Please enter the name"
                        }
                    ]}>
                    <Input placeholder='Enter your name' />
                </Form.Item>
                <Form.Item
                    name={"playerScores"}
                    label={" Player Name "}
                    rules={[
                        {
                            validator(rule, value){
                                //new here should start from lowercase small letters
                                return new Promise((resolve, reject)=>{
                                    if(value>=0){
                                        return resolve();
                                    }
                                    else{
                                        return reject("The value must be greater or equal to zero.")
                                    }
                                })
                            }
                        }
                    ]}
                >
                    <PlayerScores />
                </Form.Item>
                <Form.Item
                    name={"adminEmail"}
                    label={" Admin Email "}
                    rules={[
                        {
                            type:"email", message:"Enter a valid email",
                        },
                        {
                            validator(rule, value){
                                //new here should start from lowercase small letters
                                return new Promise((resolve, reject)=>{
                                    if(String(value).startsWith("admin")){
                                        return resolve();
                                    }
                                    else{
                                        return reject("Email should start with 'admin' keyword")
                                    }
                                })
                            }
                        }
                    ]}
                >
                    <AdminEmail />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default App;