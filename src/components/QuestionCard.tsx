import React, {useState} from "react";
import {Button, Space, Divider, Tag, Popconfirm, Modal, message} from "antd";
import {
    StarOutlined,
    CopyOutlined,
    DeleteOutlined,
    EditOutlined,
    LineChartOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {useRequest} from "ahooks";
import {changeQuestion,duplicateQuestion} from "@/services/question";
import {useRouter} from "next/navigation";

type IProps = {
    _id: string,
    title: string,
    isPublished: boolean,
    isStar: boolean,
    answerCount: number,
    createdAt: string,
    deleteQuestion?: (id: string) => void,
    publishQuestion?: (id: string) => void,
    starQuestion?: (id: string) => void,
    id?: string
};

const {confirm} = Modal;


export default function QuestionCard(props: IProps) {
    const {
        _id,
        title,
        isPublished,
        isStar,
        answerCount,
        createdAt,
        deleteQuestion,
    } = props;
    const [isStarState, isSetStarState] = useState(isStar)
    const router = useRouter()
    const {loading: starLoading, run: changeStar} = useRequest(async () => {
            await changeQuestion(_id, {isStar: !isStarState})
        }, {
            manual: true,
            onSuccess() {
                isSetStarState(!isStarState)
                message.success("更改成功");
            }
        }
    )

    function del(id: string) {
        if (deleteQuestion) {
            confirm({
                title: "确定删除问卷吗？",
                okText: "确定",
                cancelText: "取消",
                onOk: () => {
                    deleteQuestion(id);
                    message.success("删除成功");
                },
            });
        }
    }

    const {loading:duplicateLoading,run:duplicate} = useRequest(async ()=>{
        return await duplicateQuestion(_id)
    },{
        manual:true,
        onSuccess(result){
            message.success('复制成功')
            router.push(`/question/edit/${result.id}`)
    }
    })


    return (
        <div key={_id} className={" w-full mb-10 bg-white rounded-lg p-2"}>
            <div className="flex mb-3">
                <div className={"flex-1 text-[16px] ml-2"}>
                    <Link
                        href={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
                    >
                        <Space>
                            {isStarState && <StarOutlined style={{color: "red"}}/>}
                            <strong>{title}</strong>
                        </Space>
                    </Link>
                </div>

                <div className={"flex-1 text-right"}>
                    <Space>
                        {isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>}
                        <span>答卷：{answerCount}</span>
                        <span>创建时间：{createdAt}</span>
                    </Space>
                </div>
            </div>
            <Divider style={{margin: "12px 0"}}/>
            <div className="flex">
                <div className="flex-1">
                    <Space>
                        <Button type="text" icon={<EditOutlined/>}>
                            <Link href={`/question/edit/${_id}`}>编辑问卷</Link>
                        </Button>
                        <Button
                            type="text"
                            icon={<LineChartOutlined/>}
                            disabled={!isPublished}
                        >
                            <Link href={`/question/stat/${_id}`}>统计问卷</Link>
                        </Button>
                    </Space>
                </div>
                <div className="flex-1 text-right">
                    <Space>
                        <Button
                            type="text"
                            size="small"
                            icon={<StarOutlined/>}
                            onClick={changeStar}
                            disabled={starLoading}
                        >
                            {isStarState ? "取消标星" : "标星"}
                        </Button>
                        <Popconfirm
                            title="确定发布问卷吗"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={duplicate}
                            disabled={duplicateLoading}
                        >
                            <Button
                                type="text"
                                size="small"
                                icon={<CopyOutlined/>}
                            >
                                复制
                            </Button>
                        </Popconfirm>

                        <Button
                            type="text"
                            size="small"
                            icon={<DeleteOutlined/>}
                            onClick={() => {
                                del(_id);
                            }}
                        >
                            删除
                        </Button>
                    </Space>
                </div>
            </div>
        </div>
    );
}
