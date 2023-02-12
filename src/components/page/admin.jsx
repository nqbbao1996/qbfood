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
  const [data, setData] = useState("");
  const [refetch, setRefetch] = useState(false);

  return (
    <>
      <Cart login={false} />
      <Sidebar />
      <AdminProducts />

      <Footer />
    </>
  );
}

export default AdminPage;
