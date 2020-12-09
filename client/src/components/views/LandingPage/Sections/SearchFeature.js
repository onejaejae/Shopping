import React, { useState} from 'react'
import { Input } from 'antd';
const { Search } = Input;

function SearchFeature({ handleSearch }) {
    const [SearchValue, setSearchValue] = useState("")

    const searchHandler = (e) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value)
    }

    return (
        <Search placeholder="Search By Typing..." onChange={ searchHandler } style={{ width: 200 }} value={SearchValue} />
    )
}

export default SearchFeature
