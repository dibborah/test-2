import { Table, Button, Modal, Input } from 'antd'
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

function App() {
    const [editingStudent, setEditingStudent] = useState(null)
    const [isEditing, setIsEditing] = useState(false);
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
                        <EditOutlined onClick={() => {
                            onEditStudent(record);
                        }} />
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
            // two arguments so square brackets (may be)
            return [...pre, newStudent]
        })
    }
    const onDeleteStudent = (record) => {
        Modal.confirm({
            title: "Are you sure you want to delete ?",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                setDataSource(pre => {
                    return pre.filter(student => student.id !== record.id);
                })
            }
        })
    }

    const onEditStudent = (record) => {
        setIsEditing(true);
        //Spread operator in one arguement so flower braces(may be)
        setEditingStudent({ ...record });
    }

    const resetEditing = () => {
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
                //What is the multiple re-rendering issue and we can't directing setIsEditing to false why?
                onCancel={() => {
                    // setIsEditing(false);
                    resetEditing();
                }}
                onOk={() => {
                    setDataSource(prev => {
                        return prev.map(student => {
                            if (student.id === editingStudent.id) {
                                return editingStudent;
                            }
                            else {
                                return student;
                            }
                        })
                    })
                    resetEditing();
                    // setIsEditing(false);
                }}
            >
                {/* # If the ternary operator here is not used error is thown saying can't read name property of null 
                # But is the property was null the value woudn't have been printing so why when ternary operator not used that error is shown
                # The operator is used for safety purpose (in case, cases) but in this case it is absolutelty required as if it is changing the value  from null to a non-null value 
                Why? or How?*/}
                <Input value={editingStudent?.name} onChange={(e) => {
                    setEditingStudent(pre => {
                        //here two arguements with the spread operator but then also flower braces is used but not the square braces 
                        //Why? 
                        return ({ ...pre, name: e.target.value });
                    })
                }}
                />
                <Input value={editingStudent?.email} onChange={(e) => {
                    setEditingStudent(pre => {
                        return ({ ...pre, email: e.target.value });
                    })
                }}
                />
                <Input value={editingStudent?.address} onChange={(e) => {
                    setEditingStudent(pre => {
                        return ({ ...pre, address: e.target.value });
                    })
                }}
                />
            </Modal>
        </>
    )
}

export default App;