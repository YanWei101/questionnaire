'use client'
import Link from 'next/link';
// import '../_mock/index'
import { Button,Typography  } from 'antd'
import { useEffect } from 'react';
const {Title,Paragraph} = Typography
import axios from 'axios';
function Home() {
    useEffect(() => {
        // fetch('/api/test').then(res => {
        //     res.json()
        // }).then(data => {
        //     console.log(data)
        // })
        axios.get('/api/test').then(res => {
            console.log(res)
        })
    }, [])
    return (
        <div className='flex flex-col items-center justify-center h-[calc(100vh-135px)] [background-image:linear-gradient(to_right,#4facfe_0%,#00f2fe_100%)]'>
            <div className='flex flex-col items-center justify-center'>
                <Title>问卷调查系统</Title>
                <Paragraph>
                    问卷调查系统是一款基于Next.js和Ant Design开发的问卷调查系统。
                </Paragraph>
                <div>
                    <Button type='primary' size='large'>
                        <Link href={'/manage/list'}>
                            开始使用
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;