import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../fetchData";

function UserPage() {
  const { username } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUser(username)
      .then(({user}) => {
        setUser(user)
      })
      .catch((err) => {
        if (err.message.includes("timeout")) {
          navigate("/timeout");
        } else {
          navigate("/page-not-found");
        }
      });
  }, []);

  return (
    <>
    <h2>My Profile</h2>
    <p>Name: {user.name}</p>
    <p>Username: {user.username}</p>
    </>
  );
}

export default UserPage;
