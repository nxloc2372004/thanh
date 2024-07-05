import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons"
import { deleteCustomer, deleteProject } from "../../../Service/usersService";
function DeleteProject(props) {
    const { record,onReload } = props;
    const handleDelete = async () => {
        const response= await deleteProject(record.id);
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
export default DeleteProject;