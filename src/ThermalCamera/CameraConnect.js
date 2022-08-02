
import React, { useEffect, useState } from "react";

import { AddCamera } from './AddCamera';
import { Camera } from './Camera';

import { Input } from "antd";


export default function CameraConnect() {
  const [boiler, setBoiler] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8089/api/auth/termCamera/")
      .then((response) => response.json())
      .then((data) => setBoiler(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (camera, verch_block, niz_block, sredniy_block, sredniy_panel, dataPostroikiCamera, dataReconstructionCamera) => {
    await fetch('http://localhost:8089/api/auth/termCamera/save', {
      method: 'POST',
      body: JSON.stringify({
        camera: camera,
        verch_block: verch_block,
        niz_block: niz_block,
        sredniy_block: sredniy_block,
        sredniy_panel: sredniy_panel,
        dataPostroikiCamera: dataPostroikiCamera,
        dataReconstructionCamera: dataReconstructionCamera,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => { setBoiler((boiler) => [...boiler, data]) });
  };

  const onEdit = async (id, camera, verch_block, niz_block, sredniy_block, sredniy_panel, dataPostroikiCamera, dataReconstructionCamera) => {
    await fetch(`http://localhost:8089/api/auth/termCamera/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        camera: camera,
        verch_block: verch_block,
        niz_block: niz_block,
        sredniy_block: sredniy_block,
        sredniy_panel: sredniy_panel,
        dataPostroikiCamera: dataPostroikiCamera,
        dataReconstructionCamera: dataReconstructionCamera,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setBoiler((boiler) => [...boiler, data]);
        const updatedUsers = boiler.map((user) => {
          if (user.id === id) {
            user.id = id;
            user.camera = camera;
            user.verch_block = verch_block;
            user.niz_block = niz_block;
            user.sredniy_block = sredniy_block;
            user.sredniy_panel = sredniy_panel;
            user.dataPostroikiCamera = dataPostroikiCamera;
            user.dataReconstructionCamera = dataReconstructionCamera;
          }

          return user;
        });

        setBoiler((boiler) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`http://localhost:8089/api/auth/termCamera/delete/${id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (response.status !== 200) {
          return;
        } else {
          setBoiler(
            boiler.filter((user) => {
              return user.id !== id;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = boiler.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(boiler)
    }
  }

  return (
    <div>

      <AddCamera onAdd={onAdd} />

      <form className='search__form'>
        <h5>Поиск объектов</h5>
        <Input
          type='text'
          placeholder='Поиск....'
          className='search__input'
          onChange={(e) => searchItems(e.target.value)} />
      </form>

      <hr />

      <table className="table table-bordered border-success">
        <thead>
          <tr>
            <th scope="coll">Камера</th>
            <th scope="coll">Верхний блок</th>
            <th scope="coll">Нижний блок</th>
            <th scope="coll">Средний блок</th>
            <th scope="coll">Средняя панель</th>
            <th scope="coll">Дата постройки</th>
            <th scope="coll">Дата реконструкции</th>
            <th scope="coll">Операции</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1 ? (filteredResults.map((user) => {
            return (
              <tr>
                <td>{user.camera}</td>
                <td>{user.verch_block}</td>
                <td>{user.niz_block}</td>
                <td>{user.sredniy_block}</td>
                <td>{user.sredniy_panel}</td>
                <td>{user.dataPostroikiCamera}</td>
                <td>{user.dataReconstructionCamera}</td>
                <td>
                  <Camera id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            )
          })) : (
            boiler.map((user) => {
              return (
                <tr>
                  <td>{user.camera}</td>
                  <td>{user.verch_block}</td>
                  <td>{user.niz_block}</td>
                  <td>{user.sredniy_block}</td>
                  <td>{user.sredniy_panel}</td>
                  <td>{user.dataPostroikiCamera}</td>
                  <td>{user.dataReconstructionCamera}</td>
                  <td>
                    <Camera id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>

  );
}


