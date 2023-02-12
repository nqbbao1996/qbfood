import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import StickySuccessAlert from "../../utils/alert";
import AddFood from "../Form/AddFood/AddNewFood";
import EditFood from "../Form/AddFood/EditFood";
import ConfirmationModal from "../Form/Confirm";
import { formatPrice } from "../../utils";
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
import { database } from "../../firebase";

function AdminProducts() {
  const params = useParams();
  const [id, setID] = useState("");
  const [isAddFood, setIsAddFood] = useState(false);
  const [isEditFood, setIsEditFood] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [refetchAPI, setRefetchAPI] = useState(false);
  const [dataEdit, setDataEdit] = useState("");
  const [apiStatus, setApiStatus] = useState(false);

  const [datas, setDatas] = useState("");
  const [dataArray, setDataArray] = useState("");

  {
    if (params.lenght > 0) {
      console.log("có");
    } else {
      console.log("không");
    }
  }
  //get firebase
  const dbRef = ref(getDatabase());
  useEffect(() => {
    get(child(dbRef, `${params.id}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setDatas(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [params, refetchAPI]);

  //covert to array
  useEffect(() => {
    const array = Object.values(datas);
    setDataArray(array);
  }, [datas]);

  return (
    <>
      <Container>
        <button
          onClick={() => {
            setIsAddFood(true);
          }}
          className="addbtn"
        >
          Thêm mới
        </button>
        {dataArray &&
          dataArray.map((item) => (
            <div key={item.id} className="item">
              <img className="item1" src={item.img} alt="" />
              <p className="my-auto item2">Tên món: {item.title} </p>
              <p className="my-auto item3">Giá: {formatPrice(item.price)}</p>
              <i className="my-auto item4">{item.description}</i>
              <button
                onClick={() => {
                  setIsEditFood(true);
                  setDataEdit(item);
                }}
                className="item5"
              >
                sửa
              </button>
              <button
                onClick={() => {
                  setID(item.id);
                  setIsConfirm(true);
                }}
                className="item6"
              >
                xóa
              </button>
            </div>
          ))}
      </Container>

      {isAddFood && (
        <AddFood
          isShow={isAddFood}
          onClose={() => setIsAddFood(false)}
          refetch={() => setRefetchAPI(!refetchAPI)}
        />
      )}
      {isEditFood && (
        <EditFood
          data={dataEdit}
          isShow={isEditFood}
          onClose={() => setIsEditFood(false)}
          refetch={() => setRefetchAPI(!refetchAPI)}
        />
      )}
      {isConfirm && (
        <ConfirmationModal
          id={id}
          isShow={isConfirm}
          onClose={() => setIsConfirm(false)}
          refetch={() => setRefetchAPI(!refetchAPI)}
        />
      )}
      <StickySuccessAlert apiStatus={refetchAPI} />
    </>
  );
}

export default AdminProducts;

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

  .addbtn{
    width: 140px;
    margin-bottom: 20px;
    &:hover {
      background: #444;
    }

  }
  .item1 {
    grid-area: img;
    margin-right: 20px;
  }

  .item2 {
    grid-area: title;
  }

  .item3 {
    grid-area: price;
  }

  .item4 {
    grid-area: des;
    overflow: hidden;
    max-height: 46px;
   
  }

  .item5 {
    grid-area: fix;
  }

  .item6 {
    grid-area: del;
  }

  .item {
    background: #333;
    padding: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
    grid-template-areas:
      "img title title title price fix"
      "img des des des des del";
    gap: 12px;

    .my-auto {
      margin: auto 0px;
    }

    &:hover {
      background: #444;
    }

    @media screen and (max-width: 600px) {
      font-size: 14px;
    }
    @media screen and (max-width: 768px) {
      grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
    }
  }

  img {
    width: 100px;
    height: -webkit-fill-available;
    @media screen and (max-width: 768px) {
      margin: auto;
      height: unset;
    }
  }

  button {
    padding: 4px;
    width: 40px;
    height: 40px;
    border-radius: 14px;
    &:hover {
      background: #555;
    }
  }
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
