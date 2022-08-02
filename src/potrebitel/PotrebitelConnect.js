
import React, { useEffect, useState } from "react";
import { Potrebitel } from "./Potrebitel";
import { AddPotrebitel } from "./AddPotrebitel";
import { Input } from "antd";



export default function PotrebitelConnect() {
  const [boiler, setBoiler] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8089/api/auth/potrebitel/")
      .then((response) => response.json())
      .then((data) => setBoiler(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (street, numberDom) => {
    await fetch('http://localhost:8089/api/auth/potrebitel/save', {
      method: 'POST',
      body: JSON.stringify({
        street: street,
        numberDom: numberDom,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => { setBoiler((boiler) => [...boiler, data]) });
  };

  const onEdit = async (id, street, numberDom) => {
    await fetch(`http://localhost:8089/api/auth/potrebitel/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        street: street,
        numberDom: numberDom,

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
            user.street = street;
            user.numberDom = numberDom;
          }

          return user;
        });

        setBoiler((boiler) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`http://localhost:8089/api/auth/potrebitel/delete/${id}`, {
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

      <AddPotrebitel onAdd={onAdd} />

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
            <th scope="coll">Улица</th>
            <th scope="coll">Дом</th>
            <th scope="coll">Операции</th>
          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1 ? (filteredResults.map((user) => {
            return (
              <tr>
                <td>{user.street}</td>
                <td>{user.numberDom}</td>
                <td>
                  <Potrebitel id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>

            )
          })) : (
            boiler.map((user) => {
              return (
                <tr>
                  <td>{user.street}</td>
                  <td>{user.numberDom}</td>
                  <td>
                    <Potrebitel id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                  </td>
                </tr>

              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

