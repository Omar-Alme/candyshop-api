import React, {useEffect, useState} from "react";
import { makeGetRequest } from "../../utils/api";
import { urls } from "../../utils/urls";
import { ProductDataProps } from "../../types";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard";


const Products = () => {
    const [productData, setProductData] = useState<{
        data: ProductDataProps[];
    }>();

    const fetchProducts = async () => {

        try {
            const response = await makeGetRequest(urls.products, {});
            if (response.status === 200) {
                setProductData(response.data);
            } else {
                console.log("Error fetching products");
            }
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log("productData", productData);

    return (
        <Box py={5} display="flex" justifyContent="center">

            <React.Fragment>
                <Grid container spacing={2} justifyContent="center">
                    {productData &&
                     productData.data &&
                     productData?.data?.length > 0 ? (
                        productData?.data.map((data: ProductDataProps) => (
                            <Grid item key={data.id} xs={6} md={3} display="flex" justifyContent="center">
                                <ProductCard data={data} />
                            </Grid>
                        ))
                    ) : (
                        <Typography variant="h6" component="div">
                            No products found
                            </Typography>
                    )}
                </Grid>
            </React.Fragment>
        </Box>
    );
};

export default Products;