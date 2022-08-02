
import React, { useEffect, useState } from "react";
import { Section } from "./Section";
import { AddSection } from "./AddSection";
import { Input } from "antd";



export default function SectionConnect() {
  const [boiler, setBoiler] = useState([]);

  const [searchInput, setSearchInput] = useState('');

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch("http://localhost:8089/api/auth/section/")
      .then((response) => response.json())
      .then((data) => setBoiler(data))
      .catch((error) => console.log(error));
  };

  const onAdd = async (startSection, finishSection, lengthSection, iznosSection, diameterTrub, vidTeplonositel, dataPostroiki, dataReconstruction, tipTruboprovoda, lon, lat) => {
    await fetch('http://localhost:8089/api/auth/section/save', {
      method: 'POST',
      body: JSON.stringify({
        startSection: startSection,
        finishSection: finishSection,
        lengthSection: lengthSection,
        iznosSection: iznosSection,
        diameterTrub: diameterTrub,
        vidTeplonositel: vidTeplonositel,
        dataPostroiki: dataPostroiki,
        dataReconstruction: dataReconstruction,
        tipTruboprovoda: tipTruboprovoda,
        lon: lon,
        lat: lat,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => { setBoiler((boiler) => [...boiler, data]) });
  };

  const onEdit = async (id, startSection, finishSection, lengthSection, iznosSection, diameterTrub, vidTeplonositel, dataPostroiki, dataReconstruction, tipTruboprovoda, lon, lat) => {
    await fetch(`http://localhost:8089/api/auth/section/update`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        startSection: startSection,
        finishSection: finishSection,
        lengthSection: lengthSection,
        iznosSection: iznosSection,
        diameterTrub: diameterTrub,
        vidTeplonositel: vidTeplonositel,
        dataPostroiki: dataPostroiki,
        dataReconstruction: dataReconstruction,
        tipTruboprovoda: tipTruboprovoda,
        lon: lon,
        lat: lat,
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
            user.startSection = startSection;
            user.finishSection = finishSection;
            user.lengthSection = lengthSection;
            user.iznosSection = iznosSection;
            user.diameterTrub = diameterTrub;
            user.vidTeplonositel = vidTeplonositel;
            user.dataPostroiki = dataPostroiki;
            user.dataReconstruction = dataReconstruction;
            user.tipTruboprovoda = tipTruboprovoda;
            user.lon = lon;
            user.lat = lat;
          }

          return user;
        });

        setBoiler((boiler) => updatedUsers);
      })
      .catch((error) => console.log(error));
  };

  const onDelete = async (id) => {
    await fetch(`http://localhost:8089/api/auth/section/delete/${id}`, {
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

      <AddSection onAdd={onAdd} />

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
            <th scope="coll">Начало участка</th>
            <th scope="coll">Конец участка</th>
            <th scope="coll">Длина (км)</th>
            <th scope="coll">Износ (%)</th>
            <th scope="coll">Диаметр</th>
            <th scope="coll">Вид теплоносителя</th>
            <th scope="coll">Дата постройки</th>
            <th scope="coll">Дата реконструкции</th>
            <th scope="coll">Тип трубопровода</th>
            <th scope="coll">Операции</th>

          </tr>
        </thead>
        <tbody>
          {searchInput.length > 1 ? (filteredResults.map((user) => {
            return (
              <tr>
                <td>{user.startSection}</td>
                <td>{user.finishSection}</td>
                <td>{user.lengthSection}</td>
                <td>{user.iznosSection}</td>
                <td>{user.diameterTrub}</td>
                <td>{user.vidTeplonositel}</td>
                <td>{user.dataPostroiki}</td>
                <td>{user.dataReconstruction}</td>
                <td>{user.tipTruboprovoda}</td>

                <td>
                  <Section id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
                </td>
              </tr>
            )
          })) : (
            boiler.map((user) => {
              return (
                <tr>
                  <td>{user.startSection}</td>
                  <td>{user.finishSection}</td>
                  <td>{user.lengthSection}</td>
                  <td>{user.iznosSection}</td>
                  <td>{user.diameterTrub}</td>
                  <td>{user.vidTeplonositel}</td>
                  <td>{user.dataPostroiki}</td>
                  <td>{user.dataReconstruction}</td>
                  <td>{user.tipTruboprovoda}</td>

                  <td>
                    <Section id={user.id} key={user.id} onEdit={onEdit} onDelete={onDelete} />
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

