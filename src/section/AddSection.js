import React from "react";
import Input from "antd/lib/input/Input";




export const AddSection = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(
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
        evt.target.startSection.value = "";
        evt.target.finishSection.value = "";
        evt.target.lengthSection.value = "";
        evt.target.iznosSection.value = "";
        evt.target.diameterTrub.value = "";
        evt.target.vidTeplonositel.value = "";
        evt.target.dataPostroiki.value = "";
        evt.target.dataReconstruction.value = "";
        evt.target.tipTruboprovoda.value = "";
        evt.target.lon.value = "";
        evt.target.lat.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Редактировать данные участка теплосети</h3>
            <Input placeholder="Начало участка" name="startSection" />
            <Input placeholder="Конец участка" name="finishSection" />
            <Input placeholder="Длина участка (км)" name="lengthSection" />
            <Input placeholder="Износ %" name="iznosSection" />
            <Input placeholder="Диаметр труб" name="diameterTrub" />
            <Input placeholder="Вид теплоносителя" name="vidTeplonositel" />
            <Input placeholder="Дата постройки" name="dataPostroiki" />
            <Input placeholder="Дата реконструкции" name="dataReconstruction" />
            <Input placeholder="Тип трубопровода" name="tipTruboprovoda" />
            <Input placeholder="Долгота" name="lon" />
            <Input placeholder="Широта" name="lat" />

            <button className="btn btn-light" onSubmit={handleOnSubmit}>Добавить</button>
            <hr />
        </form>
    );
};


