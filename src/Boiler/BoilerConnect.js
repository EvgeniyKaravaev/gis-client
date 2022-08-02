
import React, { useEffect, useState } from "react";
import { Boiler } from "./Boiler";
import { AddBoiler } from "./AddBoiler";
import { Input } from "antd";




export default function BoilerConnect() {
  const [boiler, setBoiler] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8089/api/auth/boiler/")
      .then((response) => response.json())
      .then((data) => setBoiler(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (rso, vidResourсe, dataPostroiki, dataReconstruction) => {
    await fetch('http://localhost:8089/api/auth/boiler/save', {
      method: 'POST',
      body: JSON.stringify({
        rso: rso,
        vidResourсe: vidResourсe,
        dataPostroiki: dataPostroiki,
        dataReconstruction: dataReconstruction,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => { setBoiler((boiler) => [...boiler, data]) });
  };

  const onEdit = async (id, rso, vidResourсe, dataPostroiki, dataReconstruction) => {
    await fetch(`http://localhost:8089/api/auth/boiler/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        rso: rso,
        vidResourсe: vidResourсe,
        dataPostroiki: dataPostroiki,
        dataReconstruction: dataReconstruction,
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
            user.rso = rso;
            user.vidResourсe = vidResourсe;
            user.dataPostroiki = dataPostroiki;
            user.dataReconstruction = dataReconstruction;
          }

          return user;
        });

        setBoiler((boiler) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`http://localhost:8089/api/auth/boiler/delete/${id}`, {
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

      <AddBoiler onAdd={onAdd} />

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
            <th scope="coll">РСО</th>
            <th scope="coll">Вид ресурса</th>
            <th scope="coll">Дата постройки</th>
            <th scope="coll">Дата реконструкции</th>
            <th scope="coll">Операции</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1 ? (filteredResults.map((user) => {
            return (
              <tr>
                <td>{user.rso}</td>
                <td>{user.vidResourсe}</td>
                <td>{user.dataPostroiki}</td>
                <td>{user.dataReconstruction}</td>
                <td>
                  <Boiler id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            )
          })) : (
            boiler.map((user) => {
              return (
                <tr>
                  <td>{user.rso}</td>
                  <td>{user.vidResourсe}</td>
                  <td>{user.dataPostroiki}</td>
                  <td>{user.dataReconstruction}</td>
                  <td>
                    <Boiler id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
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


