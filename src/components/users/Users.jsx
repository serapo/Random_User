import mailSvg from "../../assets/mail.svg";
// import manSvg from "./assets/man.svg";
import womanSvg from "../../assets/woman.svg";
// import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "../../assets/growing-up-woman.svg";
import mapSvg from "../../assets/map.svg";
import phoneSvg from "../../assets/phone.svg";
import padlockSvg from "../../assets/padlock.svg";
import cwSvg from "../../assets/cw.svg";
import AddUser from "./AddUser";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
  const url = "https://randomuser.me/api/";
  // const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [property, setProperty] = useState("");
  const [userValue, setUserValue] = useState("");
  const [tableValue, setTableValue] = useState([]);

  const users = async () => {
    const { data } = await axios.get(url);
    // setUser(data.results[0]);
    setLoading(true);
    const {
      name: { title, first, last },
      email,
      dob: { age },
      location: { street },
      login: { password },
      picture: { medium },
      phone,
    } = data.results[0];

    const usersValue = {
      email,
      phone,
      age,
      name: title + " " + first + " " + last,
      street: street.name + " " + street.number,
      password,
      medium,
    };
    setUser(usersValue);
    setProperty("name");
    setUserValue(usersValue.name);
  };

  useEffect(() => {
    users();
  }, []);

  if (!loading) {
    return <h1>Loading</h1>;
  }

  const handleChange = (e) => {
    if (e.target.classList.contains("iconImg")) {
      setProperty(e.target.alt);
      setUserValue(user[e.target.alt]);
    }
  };

  const handleChangeUser = () => {
    users();
  };

  const handleAddUser = () => {
    setTableValue([...tableValue, user]);
  };

  // console.log(tableValue);
  return (
    <>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container">
          <img src={user.medium} alt="random user" className="user-img" />
          <p className="user-title">My {property} is</p>
          <p className="user-value">{userValue}</p>
          <div className="values-list" onMouseOver={handleChange}>
            <button className="icon" data-label="name">
              <img src={womanSvg} alt="name" id="iconImg" className="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="email" id="iconImg" className="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img
                src={womanAgeSvg}
                alt="age"
                id="iconImg"
                className="iconImg"
              />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="street" id="iconImg" className="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img
                src={phoneSvg}
                alt="phone"
                id="iconImg"
                className="iconImg"
              />
            </button>
            <button className="icon" data-label="password">
              <img
                src={padlockSvg}
                alt="password"
                id="iconImg"
                className="iconImg"
              />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button" onClick={handleChangeUser}>
              new user
            </button>
            <button className="btn" type="button" onClick={handleAddUser}>
              add user
            </button>
          </div>

          <table className="table">
            <thead>
              <tr className="head-tr">
                <th className="th">Firstname</th>
                <th className="th">Email</th>
                <th className="th">Phone</th>
                <th className="th">Age</th>
              </tr>
            </thead>
            <tbody>
              <AddUser tableValue={tableValue} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;