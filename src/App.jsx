import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Swal from "sweetalert2";
import Pagination from "./components/Pagination";
import "./App.css";
import CardProducts from "./components/CardProducts";
import CardSearch from "./components/CardSearch";

function App() {
  //pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSearch, setdataSearch] = useState(null);

  const [isloading, setIsloading] = useState(true);
  const [idUpdate, setidUpdate] = useState(0);
  const [product, setProduct] = useState({
    image: "",
    name: "",
    purchaseprice: 0,
    sellprice: 0,
    stock: 0,
  });

  const [dataUpdate, setDataUpdate] = useState({
    image: "",
    name: "",
    purchaseprice: 0,
    sellprice: 0,
    stock: 0,
  });
  const [dataProduct, setDataProduct] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await axios.get(
          "https://api.npoint.io/f69187f3f78096da69e8"
        );
        if (response) {
          setDataProduct(response.data);
          setIsloading(false);
        }
        setDataProduct(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let group;
  let currentPost;
  let producFilter;

  if (isloading) {
    return <div>Loading...</div>;
  } else {
    producFilter = dataProduct;
    currentPost = producFilter.slice(firstPostIndex, lastPostIndex);
    group = Math.ceil(dataProduct.length / postPerPage);
  }

  const deleteData = (id) => {
    console.log(id, "ini idinya mas ");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempPosts = [...dataProduct];
        tempPosts.splice(id, 1);
        setDataProduct(tempPosts);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const deleteDataSearch = (id) => {
    console.log(id, "ini idinya srcnya mas ");
    console.log(dataSearch, "data mas ");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let tempPosts = [...dataSearch];
        tempPosts.splice(id, 1);
        setDataProduct(tempPosts);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleOnChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: blobUrl,
      }));
    } else {
      setProduct((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const updateOnChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      const blobUrl = URL.createObjectURL(file);
      setDataUpdate((prev) => ({
        ...prev,
        [e.target.name]: blobUrl,
      }));
    } else {
      setDataUpdate((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleKeyPress = (event) => {
    if (!/\d/.test(event.key)) {
      event.preventDefault();
      alert("inputan harus angka");
    }
  };

  const tambahProduct = (e) => {
    e.preventDefault();
    const namaProdukBaru = product.name;
    // Memeriksa apakah nama produk baru sudah ada dalam data produk yang ada
    const namaProdukSudahAda = dataProduct.some(
      (produk) => produk.name === namaProdukBaru
    );
    console.log(namaProdukBaru);
    // Jika nama produk sudah ada, tampilkan pesan error atau lakukan tindakan yang sesuai
    if (namaProdukSudahAda) {
      alert("Nama produk sudah ada!");
      // Tambahkan kode untuk menampilkan pesan error atau melakukan tindakan yang sesuai
      return; // Hentikan eksekusi fungsi tambahProduct
    }
    // Jika nama produk belum ada, tambahkan produk baru ke data produk
    setDataProduct((prev) => [product, ...prev]);
  };
  const updateProduct = (e) => {
    e.preventDefault();
    let tempPosts = [...dataProduct];
    tempPosts.splice(idUpdate, 1, dataUpdate);
    setDataProduct(tempPosts);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const results = dataProduct.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setdataSearch(results);
    console.log(dataSearch);
  };

  return (
    <>
      <div>
        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white text-zinc-800">
            <h3 className="text-xl font-bold mb-5">Update Product</h3>
            <form onSubmit={(e) => updateProduct(e)}>
              <div className="flex flex-col items-center gap-5 w-full h-full bg-white justify-center">
                <div className="flex flex-row-reverse gap-3">
                  <label
                    className="bg-zinc-800 text-white p-3 px-14 w-28 "
                    for="imageUpdate"
                  >
                    Image
                  </label>
                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md "
                    type="file"
                    placeholder="Foto"
                    onChange={updateOnChange}
                    name="image"
                    hidden
                    accept="image/png, image/jpeg"
                    id="imageUpdate"
                    required
                  />

                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-full"
                    type="text"
                    placeholder="Nama Produk"
                    onChange={updateOnChange}
                    name="name"
                  />
                </div>
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Beli"
                  onChange={updateOnChange}
                  name="purchaseprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Jual"
                  onChange={updateOnChange}
                  name="sellprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Stok Barang"
                  onChange={updateOnChange}
                  name="stock"
                />
                <div className="modal-action">
                  <button
                    type="submit"
                    value="Update Product"
                    className="btn p-4 px-10 bg-zinc-800 text-white rounded-lg "
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
      </div>

      <div>
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-white text-zinc-800">
            <h3 className="text-xl font-bold mb-5">Update Product</h3>
            <form onSubmit={(e) => tambahProduct(e)}>
              <div className="flex flex-col items-center gap-5 w-full h-full bg-white justify-center">
                <div className="flex flex-row-reverse gap-3">
                  <label
                    className="bg-zinc-800 text-white p-3 px-14 "
                    for="image"
                  >
                    Image
                  </label>
                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md "
                    type="file"
                    placeholder="Foto"
                    onChange={handleOnChange}
                    name="image"
                    hidden
                    accept="image/png, image/jpeg"
                    id="image"
                  />

                  <input
                    className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-full"
                    type="text"
                    placeholder="Nama Produk"
                    onChange={handleOnChange}
                    name="name"
                  />
                </div>
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Beli"
                  onChange={handleOnChange}
                  name="purchaseprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Harga Jual"
                  onChange={handleOnChange}
                  name="sellprice"
                />
                <input
                  className="px-2 py-2 border-2 border-blue-200 rounded-md bg-white w-2/3"
                  type="text"
                  onKeyPress={handleKeyPress}
                  placeholder="Stok Barang"
                  onChange={handleOnChange}
                  name="stock"
                />
                <input
                  type="submit"
                  value="Tambah Product"
                  className="p-4 px-10 bg-zinc-800 text-white rounded-lg "
                />
              </div>
            </form>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_8">
            Close
          </label>
        </div>
      </div>

      <div>
        <div className="w-full h-full flex-col flex items-center justify-center">
          <p className="text-medium text-3xl pb-5 text-zinc-900">
            Assigment task
          </p>
          <label
            onClick={() => setidUpdate(index)}
            htmlFor="my_modal_8"
            className="bg-blue-600 text-white p-2 px-3 rounded-md"
          >
            Add Product
          </label>
        </div>
        <div className="mt-10">
          <div>
            <input
              type="text"
              name="search"
              className="mb-5 bg-white border-2 border-blue-300 p-1 px-4 w-1/3 rounded-md"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
              value={searchTerm}
            />
          </div>
          {searchTerm != "" ? (
            <CardSearch
              dataSearch={dataSearch}
              update={updateProduct}
              setidUpdate={setidUpdate}
              deleteData={deleteDataSearch}
            />
          ) : (
            <CardProducts
              post={currentPost}
              update={updateProduct}
              setidUpdate={setidUpdate}
              deleteData={deleteData}
            />
          )}
          <div className="mt-5">
            <Pagination
              group={group}
              currentPage={currentPage}
              setPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
