import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';
const { Panel } = Collapse;

function CheckBox({ ContientsList, handleFilter }) {
    const [Checked, setChecked] = useState([]);

    const handleToggle = ( _id ) => {
        
        // 누른 것의 Index를 구하고
        // Checked 배열에서 _id가 없다면 currentIndex는 -1이 된다.
        const currentIndex = Checked.indexOf(_id)

        // 전체 Checked된 State에서 현재 누른 CheckBox가 이미 있다면
        
        const newChecked = [...Checked];

        // Checked 배열에서 _id가 없다면
        // state에 넣어준다
        if(currentIndex === -1){
            newChecked.push(_id);
        }
        // Checked 배열에서 _id가 있다면
        // 빼주고
        else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilter(newChecked, "continents");
    }

    const renderCheckBoxLists = () => 
        ContientsList && ContientsList.map((contient) => (
            <React.Fragment key={contient._id}>
                <Checkbox onChange={() => handleToggle(contient._id)} checked={Checked.indexOf(contient._id) !== -1} />
                <span>{contient.name}</span>
            </React.Fragment>
    ))
    

    return (
        <div> 
            <Collapse defaultActiveKey={['1']} onChange>
                <Panel header="Contients" key="1">
                    {renderCheckBoxLists()}
                </Panel>
            </Collapse>
        </div>   
    )
}

export default CheckBox
