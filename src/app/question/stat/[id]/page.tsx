import { getQuestion } from "@/services/question";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>;
  }) {
    const id = (await params).id;
    const data = await getQuestion(id)  
    return <div>My Post: {id} {JSON.stringify(data)}</div>;
  }
  