import Input from "antd/lib/input/Input";
import React, { useState } from 'react';


export const Boiler = (
    {
        rso,
        vidResourсe,
        dataPostroiki,
        dataReconstruction,
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
            evt.target.rso.value,
            evt.target.vidResourсe.value,
            evt.target.dataPostroiki.value,
            evt.target.dataReconstruction.value,

        );
        setIsEdit(!isEdit);
    };

    return (

        <div>

            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>

                    <Input placeholder="РСО" name="rso" defaultValue={rso} />
                    <Input placeholder="Вид ресурса" name="vidResourсe" defaultValue={vidResourсe} />
                    <Input placeholder="Дата постройки" name="dataPostroiki" defaultValue={dataPostroiki} />
                    <Input placeholder="Дата реконструкции" name="dataReconstruction" defaultValue={dataReconstruction} />

                    <button className="btn btn-light" onSubmit={handleOnEditSubmit}>Сохранить</button>
                </form>
            ) : (
                <div>
                    <span className="rso">{rso}</span>
                    <span className="vidResourсe">{vidResourсe}</span>
                    <span className="dataPostroiki">{dataPostroiki}</span>
                    <span className="dataReconstruction">{dataReconstruction}</span>
                    <div>
                        <button className="btn btn-light" onClick={handleEdit}>изменить</button>
                        <button className="btn btn-light" onClick={handleDelete}>удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};