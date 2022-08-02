import React from "react";
import Input from "antd/lib/input/Input";


export const AddPotrebitel = ({ onAdd }) => {
    const handleOnSubmit = (evt) => {
        evt.preventDefault();
        onAdd(
            evt.target.street.value,
            evt.target.numberDom.value,
            evt.target.lon.value,
            evt.target.lat.value,

        );
        evt.target.street.value = "";
        evt.target.numberDom.value = "";
        evt.target.lon.value = "";
        evt.target.lat.value = "";

    };

    return (
        <form onSubmit={handleOnSubmit}>
            <h5>Операции с объектами теплосети</h5>

            <Input placeholder="Улица" name="street" />
            <Input placeholder="Дом" name="numberDom" />
            <Input placeholder="Долгота" name="lon" />
            <Input placeholder="Широта" name="lat" />

            <button className="btn btn-light" onSubmit={handleOnSubmit}>Добавить</button>
            <hr />
        </form>
    );
};


