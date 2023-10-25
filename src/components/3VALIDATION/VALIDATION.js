import { Form, Button, Input, Checkbox, DatePicker, Select } from "antd"

function App() {
    return (
        <>
            {/* labelCol is used it column the label elements and wrapperCol is used to column on the fields elements  */}
            {/* <Form labelCol={{span:10}} wrapperCol={{span: 14}}> */}
            {/* The autoComplete is used to off the autocompleteting or displaying the dropdown of previously given inputs */}
            <Form autoComplete="off" 
            onFinish={(values)=>{
                console.log(values);
            }}
            onFinishFailed={(error)=>{
                console.log({error});
            }}>
                <Form.Item name="fullName"
                    label="Full Name"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your name",
                        },
                        // whitespace true is used not to allow whitespace inputs in input fields
                        {
                            whitespace: true,
                        },
                        //Setting minimun and max length restriction rules in input fields
                        {
                            min: 3,
                            max: 12,
                        },
                    ]}

                    // The green tick or the red cancel error is displayed using the hasFeedback prop
                    hasFeedback
                    style={{ width: "300px", padding: "10px" }}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    name="myEmail"
                    label="E-mail"
                    style={{ width: "300px", padding: "10px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your email",
                        },
                        {
                            type: "email",
                            message: "Please enter a valid email address"

                        },
                        {
                            whitespace: true,
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder="Enter your email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    style={{ width: "300px", padding: "10px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password",
                        },
                        {
                            min: 6
                        },
                        {
                            validator: (_, value) =>
                                value && value.includes("A")
                                    ? Promise.resolve()
                                    : Promise.reject("Password does not match criteria.")
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Enter your password" />
                </Form.Item>
                <Form.Item
                    name="confirmPassoword"
                    label="Confirm password"
                    dependencies={["password"]}
                    style={{ width: "350px", padding: "10px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your password",
                        },
                        ({ getFieldValue }) => ({
                            // takes two arguements , the rules in _ and the input value 
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                else {
                                    return Promise.reject("The two password that you entered does not match");
                                }
                            }
                        })
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder="Confirm your password" />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    style={{ width: "350px", padding: "10px" }}
                    // The requiredMark optional prop is not working and I do not know why? 
                    requiredMark="optional"
                >
                    <Select placeholder="Select your gender" >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                        <Select.Option value="others">Others</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="dob"
                    label="Date of Birth"
                    style={{ padding: "10px" }}
                    rules={[
                        {
                            required: true,
                            message: "Please enter your date of birth",
                        },
                    ]}
                    hasFeedback
                >

                    <DatePicker style={{ width: "100%" }} picker="date" placeholder="Enter your DOB" />
                </Form.Item>
                <Form.Item
                    name="website" 
                    label="Website" 
                    requiredMark="Optional"
                    rules={[
                        {
                            type: "url",
                            message: "Please enter a valid url"
                        },                      
                    ]}
                    hasFeedback
                    style={{ width: "350px", padding: "10px" }}
                    >
                    <Input placeholder="Enter your URL" />
                </Form.Item>
                <Form.Item 
                name="agreement" 
                style={{ width: "350px", padding: "10px" }}
                valuePropName="checked"
                rules={[
                    // {
                    //     required: true,
                    //     message: "To proceed you need to agree to our terms and conditions",
                    // },
                    {
                        validator: (_, value) =>
                            value 
                                ? Promise.resolve()
                                : Promise.reject("To proceed you need to agree to our terms and conditions")
                    },
                ]}
                >
                    <Checkbox >Agree to our<a href="#"> Terms and Conditions</a></Checkbox>
                </Form.Item>
                <Form.Item style={{ padding: "10px" }}>
                    <Button block htmlType="submit" type="primary">Register</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default App;