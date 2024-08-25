import Search from "./Search";
import Accordion from "./accordion/Accordion";
import celebrities from "../utils/celebrities.json";
import { useState } from "react";

const Body = () => {
  const [celebList, setCelebList] = useState(celebrities);
  const [selected, setSelected] = useState(null);
  const [editMode, setEditMode] = useState(false)  
  const [filteredCelebrityList, setFilteredCelebrityList] = useState(celebList);

  console.log("Celebritys' list from the JSON =>", celebList);


  return (
    <div className="container">
      <Search
        data={{
          celebList
        }}
        handler={{
          setCelebList,
          setFilteredCelebrityList
        }}
      />
      {
        Array.isArray(filteredCelebrityList) && filteredCelebrityList?.length > 0 && filteredCelebrityList?.map((celeb, index) => (
          <Accordion
            data={{
              celeb,
              selected,
              editMode,
              celebList
            }}
            handler={{
              setSelected,
              setEditMode,
              setCelebList,
              setFilteredCelebrityList
            }}
            itemKey={celeb?.id}
            key={celeb?.id}
          />
        ))
      }
    </div>
  );
};

export default Body;
