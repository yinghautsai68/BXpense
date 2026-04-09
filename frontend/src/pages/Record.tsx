import { useParams } from "react-router-dom"
import Card from "../components/Card"
import Information from "../components/Information"
import { Title } from "../components/Typography"
import { useEffect, useState } from "react"
import type { RecordType } from "../types/records.type"
import { useAuth } from "../context/AuthContext"
import { deleteById, getRecordById } from "../services/records.service"
import { useUtil } from "../context/UtilContext"
import toast from "react-hot-toast"
import Button from "../components/Button"

const Record = () => {
    const { token } = useAuth();
    const { id } = useParams();
    const { formatDateTime } = useUtil();

    const [record, setRecord] = useState<RecordType | null>(null);
    useEffect(() => {
        if (!token || !id) {
            return;
        }

        const fetchRecord = async () => {
            try {
                const data = await getRecordById(token, id);
                setRecord(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchRecord();
    }, [token, id]);


    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const handleDelete = async () => {
        try {
            if (!token || !id) {
                return;
            }

            const data = await deleteById(token, id);
            toast.success(data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="flex flex-col gap-4 w-full h-screen px-3 pt-3 bg-gray-200">
            <div className="flex flex-row justify-between items-center">
                <p className="w-full">previous</p>
                <Title className="w-full">Record</Title>
                <div className="w-full"></div>
            </div>
            <Card>
                <div className="flex flex-row justify-between items-center border-b-2 border-dashed border-gray-300">
                    <div className="flex flex-row items-center gap-2 pb-4">
                        <img src='https://picsum.photos/200' alt="" className="w-10 aspect-square rounded-lg" />
                        <span className="font-medium">{record?.category_name}</span>
                    </div>
                    <span>-NT$ {record?.amount}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <Information label="類別" value={record?.type} />
                    <Information label="備註" value={record?.remarks} />
                    <Information label="帳戶" value={record?.account_name} />
                    <Information label="日期" value={formatDateTime(record?.record_date || "")} />
                </div>
            </Card>
            <div className="flex flex-row justify-between items-center ">
                <div className="w-5 aspect-square bg-black"></div>

                <div className="flex flex-row items-center gap-2">
                    <div className="w-5 aspect-square bg-black"></div>
                    <div onClick={() => setShowDeleteModal(true)} className="w-5 aspect-square bg-black"></div>
                </div>

                {/* Modal */}
                {showDeleteModal && (
                    <div className="fixed left-0 bottom-0 flex flex-row items-center justify-center w-full h-[30%] z-10">
                        <Card className="flex flex-col justify-center items-center w-full h-full">
                            <p className="mb-4">確定要刪除這筆紀錄嗎？</p>
                            <div className="flex justify-end gap-2">
                                <Button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 bg-gray-400 hover:bg-gray-500 rounded">取消</Button>
                                <Button onClick={handleDelete} className="px-4 py-2 bg-rose-500 hover:bg-rose-700 text-white rounded">刪除</Button>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Record