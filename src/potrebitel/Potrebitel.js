import Input from "antd/lib/input/Input";
import React, { useState } from 'react';

export const Potrebitel = (
    {
        street,
        numberDom,
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
            evt.target.street.value,
            evt.target.numberDom.value,

        );
        setIsEdit(!isEdit);
    };

    return (

        <div>

            {isEdit ? (
                <form onSubmit={handleOnEditSubmit}>

                    <Input placeholder="Улица" name="street" defaultValue={street} />
                    <Input placeholder="Дом" name="numberDom" defaultValue={numberDom} />

                    <button className="btn btn-light" onSubmit={handleOnEditSubmit}>Сохранить</button>
                </form>
            ) : (
                <div>
                    <span className="street">{street}</span>
                    <span className="numberDom">{numberDom}</span>
                    <div>
                        <button className="btn btn-light" onClick={handleEdit}>изменить</button>
                        <button className="btn btn-light" onClick={handleDelete}>удалить</button>
                    </div>
                </div>
            )}
        </div>
    );
};