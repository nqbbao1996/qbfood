import {
  getDatabase,
  ref,
  child,
  get,
  Database,
  set,
  update,
  push,
  remove,
  once,
} from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";

function AdminCart() {
  const [data, setData] = useState("");
  const [dataArray, setDataArray] = useState("");
  //get firebase
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, "carts/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setData(snapshot.val());
        } else {
          console.log("No available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //covert to array
  useEffect(() => {
    const array = Object.values(data);
    setDataArray(array);
  }, [data]);
  console.log("carts", data);

  return <Container className="Container"> available at 15/02/2023</Container>;
}

export default AdminCart;
const Container = styled.div`
transition: all .3s ease-in-out;
  margin-top: 8vh;
  margin-left: 250px;
  max-height: 84px;
  overflow-y: scroll;
  padding: 20px;
  background: var(--color-background);

  min-height: 84vh;
  color: var(--color-white);
  @media (max-width: 1024px) {
    margin-left: 200px;
  }
  @media (max-width: 768px) {
    margin-left: 0px;
  }

  
  scrollbar-width: thin;
  scrollbar-color: #666666 #333333;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #333333;
}

::-webkit-scrollbar-thumb {
  background-color: #666666;
  border-radius: 10px;
}

`;
