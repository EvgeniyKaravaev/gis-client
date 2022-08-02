import React from "react";
import Input from "antd/lib/input/Input";



export const AddBoiler = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(
            evt.target.rso.value,
            evt.target.vidResourсe.value,
            evt.target.dataPostroiki.value,
            evt.target.dataReconstruction.value,
            evt.target.lon.value,
            evt.target.lat.value,
        );

        evt.target.rso.value = "";
        evt.target.vidResourсe.value = "";
        evt.target.dataPostroiki.value = "";
        evt.target.dataReconstruction.value = "";
        evt.target.lon.value = "";
        evt.target.lat.value = "";
    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h3>Редактировать данные источника теплосети</h3>
            <Input placeholder="РСО" name="rso" />
            <Input placeholder="Вид ресурса" name="vidResourсe" />
            <Input placeholder="Дата постройки" name="dataPostroiki" />
            <Input placeholder="Дата реконструкции" name="dataReconstruction" />
            <Input placeholder="Долгота" name="lon" />
            <Input placeholder="Широта" name="lat" />

            <button className="btn btn-light" onSubmit={handleOnSubmit}>Добавить</button>
            <hr />
        </form>
    );
};


