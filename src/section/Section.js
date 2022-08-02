import Input from "antd/lib/input/Input";
import React, { useState } from 'react';



export const Section = (
    {
        startSection,
        finishSection,
        lengthSection,
        iznosSection,
        diameterTrub,
        vidTeplonositel,
        dataPostroiki,
        dataReconstruction,
        tipTruboprovoda,
        lon,
        lat,
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
            evt.target.startSection.value,
            evt.target.finishSection.value,
            evt.target.lengthSection.value,
            evt.target.iznosSection.value,
            evt.target.diameterTrub.value,
            evt.target.vidTeplonositel.value,
            evt.target.dataPostroiki.value,
            evt.target.dataReconstruction.value,
            evt.target.tipTruboprovoda.value,
            evt.target.lon.value,
            evt.target.lat.value,
        );
        setIsEdit(!isEdit);
    };

    return (

        <div>

            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>

                    <Input placeholder="Начало участка" name="startSection" defaultValue={startSection} />
                    <Input placeholder="Конец участка" name="finishSection" defaultValue={finishSection} />
                    <Input placeholder="Длина участка (км)" name="lengthSection" defaultValue={lengthSection} />
                    <Input placeholder="Износ %" name="iznosSection" defaultValue={iznosSection} />
                    <Input placeholder="Диаметр труб" name="diameterTrub" defaultValue={diameterTrub} />
                    <Input placeholder="Вид теплоносителя" name="vidTeplonositel" defaultValue={vidTeplonositel} />
                    <Input placeholder="Дата постройки" name="dataPostroiki" defaultValue={dataPostroiki} />
                    <Input placeholder="Дата реконструкции" name="dataReconstruction" defaultValue={dataReconstruction} />
                    <Input placeholder="Тип трубопровода" name="tipTruboprovoda" defaultValue={tipTruboprovoda} />
                    <Input placeholder="Долгота" name="lon" defaultValue={lon} />
                    <Input placeholder="Широта" name="lat" defaultValue={lat} />

                    <button className="btn btn-light" onSubmit={handleOnEditSubmit}>Сохранить</button>
                </form>
            ) : (
                <div>
                    <span className="startSection">{startSection}</span>
                    <span className="finishSection">{finishSection}</span>
                    <span className="lengthSection">{lengthSection}</span>
                    <span className="iznosSection">{iznosSection}</span>
                    <span className="diameterTrub">{diameterTrub}</span>
                    <span className="vidTeplonositel">{vidTeplonositel}</span>
                    <span className="dataPostroiki">{dataPostroiki}</span>
                    <span className="dataReconstruction">{dataReconstruction}</span>
                    <span className="tipTruboprovoda">{tipTruboprovoda}</span>
                    <span className="lon">{lon}</span>
                    <span className="lat">{lat}</span>


                    <div>
                        <button className="btn btn-light" onClick={handleEdit}>изменить</button>
                        <button className="btn btn-light" onClick={handleDelete}>удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};