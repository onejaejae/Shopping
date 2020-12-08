import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

function RadioBox({ PriceList, handleFilter }) {
  const [Value, setValue] = useState(0);

  const handleToggle = (e) => {
      // RadioBox가 하나만 클릭되게 하려고
        setValue(e.target.value);
        handleFilter(e.target.value, "price");
  };

  const renderRadioBox = () =>
    PriceList &&
    PriceList.map((price) => (
      <React.Fragment key={price._id}>
        <Radio value={price._id} />
        <span>{price.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]} onChange>
        <Panel header="Price" key="1">
          <Radio.Group onChange={handleToggle} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
