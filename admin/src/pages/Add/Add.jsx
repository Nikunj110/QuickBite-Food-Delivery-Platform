import React, { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useEffect } from "react";
import {useNavigate } from "react-router-dom";

const Add = ({url}) => {
  const navigate=useNavigate();
  const {token,admin} = useContext(StoreContext);
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData,{headers:{token}});
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(()=>{
    if(!admin && !token){
      toast.error("Please Login First");
       navigate("/");
    }
  },[])
  return (
    <div className="w-full">
      <form onSubmit={onSubmitHandler} className="max-w-3xl mx-auto p-6 bg-white rounded-xl border border-neutral-200 shadow-sm">
        <div className="mb-5">
          <p className="font-medium text-neutral-900 mb-2">Upload image</p>
          <label htmlFor="image" className="block">
            <img className="w-32 h-32 object-cover rounded-lg border border-neutral-200" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="preview" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="mb-5">
          <p className="font-medium text-neutral-900 mb-2">Product name</p>
          <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20" onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="mb-5">
          <p className="font-medium text-neutral-900 mb-2">Product description</p>
          <textarea className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20" onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here" required></textarea>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
          <div>
            <p className="font-medium text-neutral-900 mb-2">Product category</p>
            <select className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20" name="category" required onChange={onChangeHandler} value={data.category}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div>
            <p className="font-medium text-neutral-900 mb-2">Product price</p>
            <input className="w-full border border-neutral-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-black/20" onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-neutral-800">ADD</button>
      </form>
    </div>
  );
};

export default Add;
