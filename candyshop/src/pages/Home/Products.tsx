import React, {useEffect, useState} from "react";
import { makeGetRequest } from "../../utils/api";
import { urls } from "../../utils/urls";
import Loader from "../../components/Loader";
import { ProductDataProps } from "../../types";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";


const Products = () => {
    const [productData, setProductData] = useState<{
        data: ProductDataProps[];
    }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        setLoading(true);

        try {
            const response = await makeGetRequest(urls.products);
            if (response.status === 200) {
                setProductData(response.data);
                setLoading(false);
            } else {
                console.log("Error fetching products");
                setLoading(false);
            }
        } catch (err) {
            console.error("Error fetching products", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
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
            ) : (
            <React.Fragment>
                <Grid container spacing={2} justifyContent="center">
                    {productData &&
                     productData.data &&
                     productData?.data?.length > 0 ? (
                        productData?.data.map((data: ProductDataProps) => (
                            <Grid 
                                item 
                                key={data.id} 
                                xs={6} 
                                md={3} 
                                display="flex" 
                                justifyContent="center"
                            >
                                <ProductCard 
                                    data={data} 
                                    singleProduct={false}
                                    handleAddtoCart={handleAddtoCart}
                                    counter={quantity}
                                    setCounter={setQuantity} 
                                    />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" component="div">
                            No products found
                        </Typography>
                    )}
                </Grid>
            </React.Fragment>
            )}
        </Box>
    );
};

export default Products;