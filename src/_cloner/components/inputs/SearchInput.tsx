import React, { useState } from "react";
import { Input, InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface FuzzySearchProps<T> {
  data: T[];
  keys: string[];
  threshold?: number;
  setResults: any;
}

const SearchInput = <T extends {}>({
  data,
  keys,
  setResults,
}: FuzzySearchProps<T>) => {

  const [query, setQuery] = useState("");

  const handleInputChange: InputProps['onChange'] = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  
    if (inputValue === "") {
      setResults(data);
    } else {
      const terms = inputValue.split(/\s+/).filter(Boolean);

      const pattern = terms.map((term) => term.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")).join('.*');

      const regex = new RegExp(pattern, 'i');

      const filteredResults = data.filter((item: any) => {
        const itemText = keys.map((key) => String(item[key])).join(" ");
        return regex.test(itemText);
      });

      setResults(filteredResults);
    }
  };

  return (
    <>
      <Input
        value={query}
        onChange={handleInputChange}
        suffix={<SearchOutlined />}
        allowClear
        className="!font-peyda-bold"
        placeholder="جستجو..."
      />
    </>
  );
};

export default SearchInput;
