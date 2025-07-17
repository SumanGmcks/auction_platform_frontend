import { PrimaryButton, Caption, Title } from "../../router";
import { commonClassNameOfInput } from "../../components/common/Design";
import { UseRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllProduct, getProduct, selectProduct, updateProduct } from "../../redux/features/productSlice";
export const ProductEdit = () => {
   UseRedirectLoggedOutUser("/login");

   const { id } = useParams();
   const navigate = useNavigate();
    const dispatch = useDispatch();

    const productEdit = useSelector(selectProduct)
    const { isSuccess } = useSelector((state) => state.product);

       const [product, setProduct] = useState(productEdit);      
        const [productImage, setProductImage] = useState("");
        const [imagePreview, setImagePreview] = useState(null);

        useEffect(() => {
          dispatch(getProduct(id));
        }, [dispatch, id]);

        useEffect(() => {
          setProduct(productEdit || {});
          setImagePreview(productEdit && productEdit.image ? `${productEdit.image.filePath}` : null);
        }, [productEdit]);

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setProduct({ ...product, [name]: value });
        };

        const handleimageChange = (e) => {
          if (e.target.files && e.target.files[0]) {
            setProductImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
          } else {
            setProductImage("");
            setImagePreview(null);
          }
        };

        const saveProduct = async (e) => {
          e.preventDefault();

          const formData = new FormData();
          formData.append("title", product?.title);
          formData.append("height", product?.height);
          formData.append("lengthPic", product?.lengthPic);
          formData.append("width", product?.width);
          formData.append("mediumUsed", product?.mediumUsed);
          formData.append("weight", product?.weight);
          formData.append("price", product?.price);
          formData.append("description", product?.description);
          if (productImage) {
            formData.append("image", productImage);
          }
          await dispatch(updateProduct({ id, formData }));
        dispatch(getAllProduct())
          if (isSuccess) {
            navigate("/product");
          }
        };


  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Update Product
        </Title>
        <hr className="my-5" />
        <form onSubmit={saveProduct}>
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input type="text" name="title" value={product?.title || ""} onChange={handleInputChange} className={`${commonClassNameOfInput}`} placeholder="Title" required />
          </div>

          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Height (cm) </Caption>
              <input type="number" name="height" value={product?.height || ""} onChange={handleInputChange} placeholder="height" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Length (cm) </Caption>
              <input type="number" name="lengthPic" value={product?.lengthPic || ""} onChange={handleInputChange} placeholder="Length" className={`${commonClassNameOfInput}`} />
            </div>
          </div>
          <div className="flex items-center gap-5 my-4">
            <div className="w-1/2">
              <Caption className="mb-2">Width (cm) </Caption>
              <input type="number" name="width" value={product?.width || ""} onChange={handleInputChange} placeholder="width" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">
                Medium used <span className=" text-purple-400 italic">(Typically, pencil, ink, charcoal or other)</span>
              </Caption>
              <input type="text" name="mediumUsed" value={product?.mediumUsed || ""} onChange={handleInputChange} placeholder="Medium used" className={commonClassNameOfInput} />
            </div>
          </div>
          <div className="flex items-center gap-5 mt-4">
            <div className="w-1/2">
              <Caption className="mb-2">
                Weight of piece <span className=" text-purple-400 italic">(kg)</span>
              </Caption>
              <input type="number" name="weight" value={product?.weight || ""} onChange={handleInputChange} placeholder="weight" className={`${commonClassNameOfInput}`} />
            </div>
            <div className="w-1/2">
              <Caption className="mb-2">Price Range*</Caption>
              <input type="number" name="price" value={product?.price || ""} onChange={handleInputChange} className={`${commonClassNameOfInput}`} placeholder="Price" required />
            </div>
          </div>

          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea name="description" value={product?.description || ""} onChange={handleInputChange} className={`${commonClassNameOfInput}`} cols="30" rows="5"></textarea>
          </div>
          <div>
            <Caption className="mb-2">Image </Caption>
            <input type="file" className={`${commonClassNameOfInput}`} name="image" onChange={handleimageChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
          </div>
          <PrimaryButton type="submit" className="rounded-none my-5">
            Update
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};

