import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdExpandMore } from "react-icons/md";
import { formatPrice } from "../../utils";

function AdminCart() {
  const [data, setData] = useState("");
  const [dataArray, setDataArray] = useState("");
  const [dataItem, setDataItem] = useState("");

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

  const [openFormIndex, setOpenFormIndex] = useState(-1);
  const handleShowProducts = (e, index, item) => {
    e.preventDefault();
    const arr = Object.values(item).filter(
      (value) => typeof value === "object"
    );
    setDataItem(arr);
    setOpenFormIndex(index); // update open form index
    if (openFormIndex === index) {
      setOpenFormIndex(-1); // close product list if it's already open
    } else {
      setOpenFormIndex(index); // open product list for selected form
    }
  };

  return (
    <Container>
      {dataArray &&
        dataArray.map((item, index) => (
          <Form
            theme={theme}
            key={item.id}
            onClick={(e) => handleShowProducts(e, index, item)}
          >
            <div className="form_info">
              <InputGroup className="form_input--1">
                <Label>ID đơn hàng:</Label>
                <Input
                  type="text"
                  disabled={true}
                  defaultValue={item.id}
                  name="id"
                />
              </InputGroup>
              <InputGroup className="form_input--2">
                <Label>Tên khách:</Label>
                <Input
                  type="text"
                  disabled={true}
                  defaultValue={"Nguyễn Văn A"}
                  name="name"
                />
              </InputGroup>
              <InputGroup className="form_input--3">
                <Label>Tổng cộng:</Label>
                <Input
                  type="text"
                  disabled={true}
                  defaultValue={formatPrice(item.Total)}
                  name="total"
                />
              </InputGroup>
              <InputGroup className="form_input--4">
                <Label>Trạng thái:</Label>
                <Input
                  type="text"
                  disabled={true}
                  defaultValue={item.Status}
                  name="status"
                />
              </InputGroup>
            </div>
            <div className="form_expand">
              {openFormIndex === index ? "" : <MdExpandMore />}
            </div>
            <ProductsList className={openFormIndex === index ? "open" : ""}>
              {dataItem &&
                dataItem.map((x) => (
                  <Product key={x.id}>
                    {x.quantity} {x.title}
                  </Product>
                ))}
            </ProductsList>
          </Form>
        ))}
    </Container>
  );
}

export default AdminCart;
const Container = styled.div`
transition: all .3s ease-in-out;
  margin-top: 8vh;
  margin-left: 250px;
  font-size: 16px;
  overflow-y: scroll;
  padding: 20px;
  background: var(--color-background);

  min-height: 84vh;
  color: var(--color-white);
  @media (max-width: 1024px) {
    margin-left: 200px;
  }
  @media (max-width: 800px) {

    font-size: 14px;
  }
  @media (max-width: 768px) {
    margin-left: 0px;
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
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

const Form = styled.form`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  .form_info {
    justify-content: space-between;
    width: 100%;
    display: grid;
    .form_input--1 {
      grid-area: id;
    }
    .form_input--2 {
      grid-area: name;
    }
    .form_input--3 {
      grid-area: total;
    }
    .form_input--4 {
      grid-area: status;
    }
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "id id id status"
      "name name name total";
    gap: 12px;
  }
  .form_expand {
    position: absolute;
    bottom: 10px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${(props) => props.theme.text};
  background-color: ${(props) => props.theme.background};
`;

const Label = styled.label`
  margin-right: 10px;
  width: 180px;
  @media screen and (max-width: 600px) {
    width: 146px;
    margin-right: 4px;
  }
  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

const Input = styled.input`
  background-color: #333;
  width: 100%;
  overflow: hidden;
`;

const ProductsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0px 0px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-height: 0px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &.open {
    max-height: 84vh;
    padding: 10px 0 0;
    margin: 10px 0 0;
    border-top: 1px solid #444;
  }
`;

const Product = styled.li`
  margin-top: 5px;
`;

const theme = {
  background: "#333",
  text: "#fff",
  buttonBackground: "#4caf50",
  buttonBackgroundHover: "#3e8e41",
  buttonText: "#fff",
};
