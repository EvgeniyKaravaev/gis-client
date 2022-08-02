import Input from "antd/lib/input/Input";
import React, { useState } from 'react';


export const Camera = (
    {
        camera,
        verch_block,
        niz_block,
        sredniy_block,
        sredniy_panel,
        dataPostroikiCamera,
        dataReconstructionCamera,
        id,
        onEdit,
        onDelete
    }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit(!isEdit);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    const handleOnEditSubmit = (evt) => {
        evt.preventDefault();
        onEdit(
            id,
            evt.target.camera.value,
            evt.target.verch_block.value,
            evt.target.niz_block.value,
            evt.target.sredniy_block.value,
            evt.target.sredniy_panel.value,
            evt.target.dataPostroikiCamera.value,
            evt.target.dataReconstructionCamera.value,
        );
        setIsEdit(!isEdit);
    };

    return (

        <div>

            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>

                    <Input placeholder="Камера" name="camera" defaultValue={camera} />
                    <Input placeholder="Верхний блок ТК" name="verch_block" defaultValue={verch_block} />
                    <Input placeholder="Нижний блок ТК" name="niz_block" defaultValue={niz_block} />
                    <Input placeholder="Средний блок ТК" name="sredniy_block" defaultValue={sredniy_block} />
                    <Input placeholder="Средняя панель ТК" name="sredniy_panel" defaultValue={sredniy_panel} />
                    <Input placeholder="Дата постройки" name="dataPostroikiCamera" defaultValue={dataPostroikiCamera} />
                    <Input placeholder="Дата реконструкции" name="dataReconstructionCamera" defaultValue={dataReconstructionCamera} />


                    <button className="btn btn-light" onSubmit={handleOnEditSubmit}>Сохранить</button>
                </form>
            ) : (
                <div>
                    <span className="camera">{camera}</span>
                    <span className="verch_block">{verch_block}</span>
                    <span className="niz_block">{niz_block}</span>
                    <span className="sredniy_block">{sredniy_block}</span>
                    <span className="sredniy_panel">{sredniy_panel}</span>
                    <span className="dataPostroikiCamera">{dataPostroikiCamera}</span>
                    <span className="dataReconstructionCamera">{dataReconstructionCamera}</span>
                    <div>
                        <button className="btn btn-light" onClick={handleEdit}>изменить</button>
                        <button className="btn btn-light" onClick={handleDelete}>удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};