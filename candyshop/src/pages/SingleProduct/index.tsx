import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeGetRequest } from "../../utils/api";
import { ProductDataProps } from "../../types";
import { urls } from "../../utils/urls";
import Loader from "../../components/Loader";
import { Box, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";



const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();

  const [singleProductData, setSingleProductData] =
    useState<ProductDataProps>();

  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();


  const fetchSingleProduct = async () => {
    setLoading(true);

    try {
      const url = `${urls.products}/${productId}`;

      const response = await makeGetRequest(url);
      if (response.status === 200) {
        setSingleProductData(response.data.data);
        setLoading(false);
      } else {
        console.log("Error fetching single product");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchSingleProduct();
  }, []);

  const handleAddtoCart = (data: ProductDataProps) => {
    dispatch(
      addProduct({
        ...data,
        quantity,
        total: 0,
        subtotal: 0,
      })
    );
  };

  return (
    <Box py={5} display="flex" justifyContent="center">
        {loading ? (
          <Loader />
        ) : singleProductData && singleProductData?.id ? (
            <Grid container justifyContent="center">
              <Grid 
                item 
                xs={12}
                sm={6} 
                md={4} 
                display="flex" 
                justifyContent="center"
              >
                <ProductCard 
                  data={singleProductData} 
                  singleProduct={true} 
                  handleAddtoCart={handleAddtoCart}
                  counter={quantity}
                  setCounter={setQuantity}
                />
              </Grid>
            </Grid>
        ) : (
          "No product found"
        )}
    </Box>
  );
};

export default SingleProduct;
