import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import React from 'react'
import ReactPlayer from 'react-player'
function WatchDetailTicket(props) {
    const { record } = props;
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);


    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    var curDate = new Date();
    const formItemLayout = {
        labelCol: {
            flex: '110px'
        },
        wrapperCol: {
            flex: '400px'
        },

    };

    return (
        <>
            <Button type="link" onClick={showModal}>Xem</Button>
            <Modal
                title="Xử lí phiếu ghi"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={1000}
            >
                <div className="header-form">
                    <h2 className="header-form__title">{record.title}</h2>
                    <span>{record.name}</span><span>{record.time}</span>
                    <div>{record.email}</div>
                </div>
                <div className=" main-from">
                    <p>{record.description}</p>
                    
                    { (record.image !== undefined)?(<img src={record.image} style={{width: "150px"}}></img>):(<p></p>)
                    
                }
                    { (record.video !== undefined)?(<video src={record.video} controls style={{width: "300px"}}></video>):(<p></p>)
                    
                }
                </div>

                <div className="reponse">
                    <p>Phản hồi</p>
                    <h2 className="header-form__title">{record.response.title}</h2>
                    <span>{record.response.name}</span><span>{record.response.time}</span>
                    <div>{record.response.email}</div>
                    <p>{record.response.description}</p>
                    { (record.response.image !== undefined)?(<img src={record.response.image} style={{width: "150px"}}></img>):(<p></p>)
                    
                }
                    { (record.response.video !== undefined)?(<video src={record.response.video} controls style={{width: "300px"}}></video>):(<p></p>)
                    
                }
                </div>
            </Modal>
        </>
    )

}
export default WatchDetailTicket;