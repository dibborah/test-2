import { Table, Button, Modal, Input } from 'antd'
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

function App() {
    const [editingStudent, setEditingStudent] = useState(null)
    const[isEditing, setIsEditing]= useState(false);
    const [dataSource, setDataSource] = useState([
        {
            id: "1",
            name: "John",
            email: "john@gmail.com",
            address: "john address"
        },
        {
            id: "2",
            name: "David",
            email: "david@gmail.com",
            address: "david address"
        },
        {
            id: "3",
            name: "James",
            email: "james@gmail.com",
            address: "james address"
        },
        {
            id: "4",
            name: "Sam",
            email: "sam@gmail.com",
            address: "sam address"
        },
    ])

    const columns = [
        {
            key: "1",
            title: "ID",
            dataIndex: "id"
        },
        {
            key: "2",
            title: "Name",
            dataIndex: "name"
        },
        {
            key: "3",
            title: "Email",
            dataIndex: "email"
        },
        {
            key: "4",
            title: "Address",
            dataIndex: "address"
        },
        {
            key: "5",
            title: "Actions",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={()=>{
                            onEditStudent(record);
                        }}/>
                        <DeleteOutlined onClick={() => {
                            onDeleteStudent(record)
                        }} style={{ color: "red", marginLeft: "7px" }} />
                    </>
                )
            }
        },
    ]

    const onAddStudent = () => {
        const randomNumber = parseInt(Math.random() * 1000);
        const newStudent = {
            id: randomNumber,
            name: "Mr./Mrs." + randomNumber,
            email: randomNumber + " @gmail.com",
            address: "Address " + randomNumber,
        }
        setDataSource(pre => {
            return [...pre, newStudent]
        })
    }
    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete ?",
            okText:"Yes",
            okType:"danger",
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter(student => student.id !== record.id);
                })
            }
        })
    }

    const onEditStudent=(record)=>{
        setIsEditing(true);
        setEditingStudent({...record});
    }

    const resetEditing=()=>{
        setIsEditing(false);
        setEditingStudent(null);
    }

    return (
        <>
            <Button onClick={onAddStudent}>Add a new Student</Button>
            <Table
                columns={columns}
                dataSource={dataSource}
            >
            </Table>
            <Modal
            title="Edit Student"
            visible={isEditing}
            okText="Save"
            onCancel={()=>{
                // setIsEditing(false);
                resetEditing();
            }}
            onOk={()=>{
                setDataSource(prev=>{
                    return prev.map(student=>{
                        if(student.id === editingStudent.id){
                            return editingStudent;
                        }
                        else{
                            return student;
                        }
                    })
                })
                resetEditing();
                // setIsEditing(false);
            }}
            >
            <Input value={editingStudent?.name} onChange={(e)=>{
                 setEditingStudent(pre=>{
                    return ({...pre, name:e.target.value});
                 })
            }}
            />
            <Input value={editingStudent?.email}  onChange={(e)=>{
                 setEditingStudent(pre=>{
                    return ({...pre, email:e.target.value});
                 })
            }}
            />
            <Input value={editingStudent?.address}  onChange={(e)=>{
                 setEditingStudent(pre=>{
                    return ({...pre, address:e.target.value});
                 })
            }}
            />
            </Modal>
        </>
    )
}

export default App;