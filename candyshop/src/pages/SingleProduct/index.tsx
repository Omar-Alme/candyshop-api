import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeGetRequest } from "../../utils/api";
import { ProductDataProps } from "../../types";
import { urls } from "../../utils/urls";
// import Loader from "../../components/Loader";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";


const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();

  const [singleProductData, setSingleProductData] =
    useState<ProductDataProps | null>(null);


   const fetchSingleProduct = async () => {

    try {
      const url = `${urls.products}/${productId}`;

      const response = await makeGetRequest(url, {});
      if (response.status === 200) {
        setSingleProductData(response.data);
      } else {
        console.log("Error fetching single product");
      }
    } catch (err) {
      console.log(err);
    
    }
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  return (
   <Box py={5} display="flex" justifyContent="center">
      {singleProductData && singleProductData.id ? (
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <ProductCard data={singleProductData} singleProduct={true} />
          </Grid>
        </Grid>
      ) : (
        "No product found."
      )}
   </Box>
  );
};

export default SingleProduct
