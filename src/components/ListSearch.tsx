import React, { useState, useEffect } from "react";
import { Input } from "antd";
const { Search } = Input;
import { useRouter, useSearchParams } from "next/navigation";
import { LSTI_SEARCH_PARAM_KEY } from "@/constant";

export default function ListSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");

  // 从 URL 参数中获取初始值
  useEffect(() => {
    const val = searchParams.get(LSTI_SEARCH_PARAM_KEY) || "";
    setSearchText(val);
  }, [searchParams]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  
  const onSearch = () => {
    router.push(`?${LSTI_SEARCH_PARAM_KEY}=${searchText}`);
  };

  return (
    <Search
      placeholder="请输入"
      className="mb-2"
      style={{ width: "200px" }}
      size="large"
      onChange={onChange}
      value={searchText}
      onSearch={onSearch}
    />
  );
}
