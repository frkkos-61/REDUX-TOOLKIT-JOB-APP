import React, { useEffect, useState } from "react";
import Input from "./../../pages/create/input";
import Select from "./../../pages/create/select";
import { sortOptions, statusOptions, typeOptions } from "../../utils/constants";
import api from "./../../utils/api";
import { useDispatch } from "react-redux";
import { setJobs } from "../../redux/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();

  const dispatch = useDispatch();

  /** Debounce
   * Bir fonksiyonun çok sık gerçekleşmesini önlemek için kullanılır. Her tuşa basıldığında arama yapmak yerine, kullanıcının yazmayı bitirmesini bekleyip, belirli bir süre geçtikten sonra arama yapar.
   * Bu işlem performansı arttırıp gereksiz ağ isteklerini ve renderlerı önler
   */

  useEffect(() => {
    //* her tuş vuruşunda bir sayaç başla
    //* ve sayaç bitiminde elde inputtaki metin state' aktarılacak
    const id = setTimeout(() => setDebouncedText(text), 1000);

    //* eğer süre bitmeden useEffect tekrar çalışırsa (yani yeni tuşa basılırsa) önceki sayacı iptal et
    return () => clearTimeout(id);
  }, [text]);

  //* filtrelere göre api' dan verileri al daha sonra reducer'ı güncelle
  useEffect(() => {
    const params = {
      q: debouncedText,
      status,
      type,
      _sort: sort === "a-z" || sort === "z-a" ? "company" : "date",
      _order: sort === "a-z" || sort === "En Eski" ? "asc" : "desc",
    };
    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => console.log(err));
  }, [debouncedText, status, type, sort]);

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>

      <form>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)} />
        <Select label="Durum" options={statusOptions} handleChange={(e) => setStatus(e.target.value)} />
        <Select label="Tür" options={typeOptions} handleChange={(e) => setType(e.target.value)} />
        <Select label="Sırala" options={sortOptions} handleChange={(e) => setSort(e.target.value)} />
      </form>
      <div className="wrapper">
        <button className="btnA">Filtreleri Sıfırla</button>
      </div>
    </div>
  );
};

export default Filter;
