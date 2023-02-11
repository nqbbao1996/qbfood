import AdminProducts from "../Admin";
import Cart from "../Cart";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ConfirmModal from "../Form/AddFood/AddNewFood";
import Form from "../Form/AddFood/AddNewFood";
import StickySuccessAlert from "../../utils/alert";

function AdminPage() {
  const params = useParams();
  const [data, setData] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/${params.id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getFoods();
  }, [params, refetch]);
  console.log(data);
  return (
    <>
      <Cart />
      <Sidebar />
      <AdminProducts
        data={data}
        reLoad={() => {
          setRefetch(!refetch);
        }}
      />

      <Footer />
    </>
  );
}

export default AdminPage;
