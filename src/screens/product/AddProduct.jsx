import { CategoryDropDown, Caption, PrimaryButton, Title } from "../../router";

import { commonClassNameOfInput } from "../../components/common/Design";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createProduct } from "../../redux/features/productSlice";

const initialState = {
  title: "",
  description: "",
  price: "",
  height: "",
  lengthPic: "",
  width: "",
  mediumUsed: "",
  weight: "",
  category: null,
};


export const AddProduct = () => {
  UseRedirectLoggedOutUser("/login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState(initialState);
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const { title, description, price, height, lengthPic, width, mediumUsed, weight, category } = product;
    const { isSuccess } = useSelector((state) => state.product);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setProduct({...product, [name]: value });
    };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setProductImage("");
      setImagePreview(null);
    }
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("height", height);
      formData.append("lengthPic", lengthPic);
      formData.append("width", width);
      formData.append("mediumUsed", mediumUsed);
      formData.append("weight", weight);
      formData.append("image", productImage);
      formData.append("description", description);

      if (category) {
        formData.append("category", category.value);
      }
      const resultAction = await dispatch(createProduct(formData)).unwrap();
      if (resultAction) {
        navigate("/product");
      }
    };
  

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" value={product?.title} onChange={handleInputChange} name="title" className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>
          <div className="py-5">
            <Caption className="mb-2">Category *</Caption>
            <CategoryDropDown value={category} onChange={(selectedCategory) => setProduct({...product, category: selectedCategory})} className={`${commonClassNameOfInput}`} />
          </div>
          {category && (
            <>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Height (cm) </Caption>
              <input type="number" value={product?.height} onChange={handleInputChange} name="height" placeholder="height" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Length (cm) </Caption>
              <input type="number" value={product?.lengthPic} onChange={handleInputChange} name="lengthPic" placeholder="Length" className={`${commonClassNameOfInput}`} />
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Width (cm) </Caption>
              <input type="number" value={product?.width} onChange={handleInputChange} name="width" placeholder="width" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">
                Medium used <span className=" text-purple-400 italic">(Typically, pencil, ink, charcoal or other)</span>
              </Caption>
              <input type="text" value={product?.mediumUsed} onChange={handleInputChange} name="mediumUsed" placeholder="Medium used" className={commonClassNameOfInput} />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-1/2">
              <Caption className="mb-2">
                Weight of piece <span className=" text-purple-400 italic">(kg)</span>
              </Caption>
              <input type="number" value={product?.weight} onChange={handleInputChange} name="weight" placeholder="weight" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input type="number" value={product?.price} onChange={handleInputChange} name="price" className={`${commonClassNameOfInput}`} placeholder="Price" required />
            </div>
          </div>
          </>
          )}
          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea name="description" value={product?.description} onChange={handleInputChange} className={`${commonClassNameOfInput}`} cols="30" rows="5"></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image </Caption>
            <input type="file" className={`${commonClassNameOfInput}`} name="image" onChange={handleImageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
