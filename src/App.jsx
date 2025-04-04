import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Create from "./pages/create/index";
import Header from "./components/header/index";
import api from "./utils/api.js";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "./redux/slices/jobSlice.js";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //* reducera yüklemenin başladığını haber ver :)
    dispatch(setLoading());

    //* api isteğini at
    api
      //* başarılı/başarısız verilerin geldiğini haber ver
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
