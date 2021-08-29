import React, {useState} from 'react';

const Search = (props)=>{
  const [searchValue, setSearchValue] = useState("");
  //stateと、それを更新するsetState。をフックであるuseStateで定義。()内が初期値。

  const handleSearchInputChanges = (e)=>{ //入力した値を表示するメソッド
    setSearchValue(e.target.value)
  }

  const resetInputField = ()=>{ //入力値をリセットするメソッド
    setSearchValue("");
  }

  const callSearchFunction = (e)=>{ //検索するメソッド
    e.preventDefault(); //デフォルト動作のsubmitを阻害
    props.search(searchValue);
    resetInputField();
  }


  return(
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
      />
      <input onClick={callSearchFunction} type="submit" value="SEARCH" />
    </form>
  );
};

export default Search;