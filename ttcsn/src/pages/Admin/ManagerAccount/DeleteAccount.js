import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteAccount } from "../../../Service/usersService";
function DeleteAccount(props) {
    const { record,onReload } = props;
    const handleDelete = async () => {
        const response= await deleteAccount(record.id);
        if (response){
            onReload();
        }
        console.log(response);
    }
    return (
        <>
            <Popconfirm title="Sure to delete?" onConfirm={handleDelete}>
                <Button icon={<DeleteOutlined />} danger size="small" />
            </Popconfirm>
        </>
    )
}
export default DeleteAccount;