import React, { useEffect } from "react";
import { Loader, PrimaryButton, Title } from "../../../router";
import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { UseRedirectLoggedOutUser } from "../../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProductofUser } from "../../../redux/features/productSlice";
import { Table } from "../../../components/Table";
import { sellproductsbyuser } from "../../../redux/features/biddingSlice";

export const ProductList = () => {
  UseRedirectLoggedOutUser("/");
  const dispatch = useDispatch();
  const { userproducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductofUser());
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getAllProductofUser());
  };

    if (isLoading) {
      return <Loader />;
    }
    if (userproducts?.length === 0) {
      return (
      <div className="flex justify-center items-center h-auto w-auto">
        <h2 className="text-3xl text-gray-700">No Products Found</h2>
      </div>
      );
    }
  const handleSellProduct = async (productId) => {
   await dispatch(sellproductsbyuser({ productId: productId }));
    await  dispatch(getAllProductofUser());
    
  };

  return (
    <>
      <section className="shadow-s1 p-8 rounded-lg">
        <div className="flex justify-between">
          <Title level={5} className=" font-normal">
            Product Lists
          </Title>
          <NavLink to="/add">
            <PrimaryButton className="flex items-center gap-3 px-5 py-2 text-sm rounded-md transition-transform hover:scale-105">
              <AiOutlinePlus size={20} />
              <span>Create Product</span>
            </PrimaryButton>
          </NavLink>
        </div>
        <hr className="my-5" />
        <Table products={userproducts} handleSellProduct={handleSellProduct} handleDeleteProduct={handleDeleteProduct}  />
      </section>
    </>
  );
};
