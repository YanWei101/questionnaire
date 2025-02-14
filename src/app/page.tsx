import Link from 'next/link';
import React from 'react';
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home Page',
  description: '主页',
}
 

function Home() {
    return (
        <div>
            <button>
                <Link href={'/question/star'}>
                    星标问卷
                </Link>
            </button>
            <button>
                <Link href={'/question/edit'}>
                    编辑问卷
                </Link>
            </button>
            <button>
                <Link href={'/manage/list'}>
                    问卷列表
                </Link>
            </button>
            <button>
                <Link href={'/manage/trash'}>
                    回收站
                </Link>
            </button>
            <button>
                <Link href={'/manage/star'}>
                    星标问卷列表
                </Link>
            </button>
        </div>
    );
}

export default Home;