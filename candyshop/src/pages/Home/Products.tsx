import React, {useEffect, useState} from "react";
import { makeGetRequest } from "../../utils/api";
import { urls } from "../../utils/urls";
import Loader from "../../components/Loader";
import { ProductDataProps } from "../../types";
import { Box, Grid, Typography, Stack } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import Filters from "./Filters";


const Products = () => {
    const [productData, setProductData] = useState<{
        data: ProductDataProps[];
    }>();

    const [loading, setLoading] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const [tagId, setTagId] = useState<number | null>(null);

    const [productsByTag, setProductsByTag] = useState<{
        data: any;
    }>();
    const [productsByTagLoading, setProductsByTagLoading] =
        useState<boolean>(false);
    
   
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

    const fetchProductsByTag = async () => {
        setProductsByTagLoading(true);

        try {
            const url = `${urls.productsTags}/${tagId}/`;
            const response = await makeGetRequest(url);
            if (response.status === 200) {
                setProductsByTag(response.data);
                setProductsByTagLoading(false);
            } else {
                setProductsByTagLoading(false);
            }
        } catch (err) {
            console.error(err);
            setProductsByTagLoading(false);
        }
    };

    useEffect(() => {
        if (tagId) {
            fetchProductsByTag();
        } else {
            fetchProducts();
        }
    }, [tagId]);

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
        <Box>
            {loading || productsByTagLoading ? (
                <Stack alignItems="center" py={5}>
                    <Loader />
                </Stack>
            ) : (
            <React.Fragment>
                <Stack alignItems="end" p={1}>
                    <Filters setTagId={setTagId} />
                </Stack>
                {productsByTag ? (
                    <Grid 
                        container 
                        spacing={2} 
                        justifyContent="center"
                        display="flex"
                        py={5}
                    >
                        {productsByTag &&
                        productsByTag.data &&
                        productsByTag?.data?.products &&
                        productsByTag?.data?.products?.length > 0 ? (
                            productsByTag?.data?.products.map((data: any) => (
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
                            <Typography align="center" my={4}>
                                No products found
                            </Typography>
                        )}
                    </Grid>
                ) : (
                    <Grid 
                    container 
                    spacing={2} 
                    justifyContent="center"
                    display="flex"
                    py={5}
                    >
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
                            <Typography align="center" my={4}>
                                No products found
                            </Typography>
                        )}
                    </Grid>
                )}
            </React.Fragment>
            )}
        </Box>
    );
};

export default Products;