import React from "react";
import Input from "antd/lib/input/Input";



export const AddCamera = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(
            evt.target.camera.value,
            evt.target.verch_block.value,
            evt.target.niz_block.value,
            evt.target.sredniy_block.value,
            evt.target.sredniy_panel.value,
            evt.target.dataPostroikiCamera.value,
            evt.target.dataReconstructionCamera.value,
        );
        evt.target.camera.value = "";
        evt.target.verch_block.value = "";
        evt.target.niz_block.value = "";
        evt.target.sredniy_block.value = "";
        evt.target.sredniy_panel.value = "";
        evt.target.dataPostroikiCamera.value = "";
        evt.target.dataReconstructionCamera.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Редактировать данные узла теплосети</h3>
            <Input placeholder="Камера" name="camera" />
            <Input placeholder="Верхний блок ТК" name="verch_block" />
            <Input placeholder="Нижний блок ТК" name="niz_block" />
            <Input placeholder="Средний блок ТК" name="sredniy_block" />
            <Input placeholder="Средняя панель ТК" name="sredniy_panel" />
            <Input placeholder="Дата постройки" name="dataPostroikiCamera" />
            <Input placeholder="Дата реконструкции" name="dataReconstructionCamera" />


            <button className="btn btn-light" onSubmit={handleOnSubmit}>Добавить</button>
            <hr />
        </form>
    );
};


