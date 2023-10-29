// make an ant design form with the following fields with proper validation 

// name (should take only letters)

// age (should take only numbers upto 100)

// date (user must add this )

// gender (use radio button)

// clear button (this will clear the user entered data)

// submit button (once clicked on this i want you to show the user entered data on screen in this format

import { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Radio, Space } from 'antd'
import "./Form.css"

const FormFile = () => {
  const [value, setValue] = useState(1);
  const [data, setData] = useState([]);
  // const [message, setMessage] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFinish = (values) => {
    console.log(values);
    setData(values);
  }

  useEffect(() => {
    console.log(data, "This is Data");

  }, [data])


  // const handleChange = event => {
  //   const result = event.target.value.replace(/[^a-z]/gi, '');

  //   setMessage(result);
  // };

  const normalizeValue = (value) => {
    // Just replace the following regex to what you wnat
    const filteredValue = value.replace(/[^a-z\s]/g, '');
    return filteredValue;
  };

  const validator=(e)=>{
    const letters = /^[0-9]*$/;
    if (e.target.value === letters) {
     return ;
    }
  }

  return (
    <div>
      <Form style={{ margin: 10 }} onFinish={onFinish} >
        <Form.Item
          name={"Number"}
          label={"Number"}
          rules={[
            {
              required: true,
              pattern: new RegExp("^[0-9]*$"),
              message: "Please enter only number",
            },
          ]}
        >
           <Input type="number" placeholder="Testing Number Validation" /> 
        </Form.Item>
        <Form.Item
          name={"name"}
          label={"Name"}
          rules={[
            {
              required: true,
              pattern: new RegExp("^[a-zA-Z]*$"),
              message: "Please enter only letters",
            },
          ]}
        >
           <Input type="text" onChange={(e)=>validator(e)} placeholder="Testing text Validation" /> 

        </Form.Item>
        <Form.Item
          name={"age"}
          label={"Age"}
          rules={[
            {
              required: true,
              message: "Please enter your age",
            },
            {
              validator: (_, value) => {
                if (value && (value <= 100) ) {
                  return Promise.resolve();
                }
                else {
                  return Promise.reject("Entered age must be a number and not be greater than 100");
                }
              }
            }
          ]}
        >
          <Input type="number" placeholder="Enter your age" />
        </Form.Item>
        <Form.Item
          name={"date"}
          label={"Date"}
          rules={[
            {
              required: true,
              message: "Please enter date ",
            }
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name={"gender"}
          label={"Gender"}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="horizontal">
              <Radio value={"Male"}>Male</Radio>
              <Radio value={"Female"}>Female</Radio>
              <Radio value={"Others"}>Others</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button danger htmlType="reset">Clear</Button>
            <Button type="primary" htmlType="submit">Submit</Button>
          </Space>
        </Form.Item>
      </Form>

      {/* Map function will not work as that the json is an object and not an array  */}

      {/* {data?.map((i, index)=>{
        return <h2 key={index}>{i?.name}</h2>
      })} */}
      {/* {
        data ? data?.map((i)=> (
          <h1>{i?.age}</h1>
        )) : "Test"
      } */}
      {/* { data ? 'test' : 'dev'} */}
      {
        <div>
          <span>Name : {data?.name}</span>
          <br />
          <span> Age : {data?.age} </span>
          <br />
          <span>Date : {data?.date?.$D}/{data?.date?.$M + 1}/{data?.date?.$y}</span>
          {/* Optional Chaining is a must or else cannot read properties of undefined D or M or y*/}
          {/* <span>Date : {data?.date.$D}/{data?.date.$M+1}/{data?.date.$y}</span> */}
          <br />
          <span> Gender : {data?.gender} </span>
        </div>
      }
    </div >
  )
}

export default FormFile;