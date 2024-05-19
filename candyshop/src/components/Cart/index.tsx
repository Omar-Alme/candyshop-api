"use client";
import * as React from "react";
import CustomButton from "../CustomButton";
import { Box, Badge, Drawer, Stack, Typography, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeProduct } from "../../redux/cartSlice";
import QuantityCounter from "../QuantityCounter";


const styles = {
    img: {
        width: "150px",
        height: "100%",
        borderRadius: "10px",
    },
    mobileImg: {
        height: "100%",
        width: "100%",
        borderRadius: "10px",
    },
    colorBox: {
        width: "25px",
        height: "25px",
        borderRadius: "7px",
    },
};

type cartDrawer = string;

const Cart = () => {
    const [drawerState, setDrawerState] = React.useState({
        right: false,
    });

    const [quantity, setQuantity] = React.useState<number>(1);
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart);

    const handleProductRemove = (id: number) => {
        dispatch(removeProduct({ id }));
    };


    const openDrawer = (anchor: cartDrawer) => {
        setDrawerState({ ...drawerState, [anchor]: true });
    };

    const closeDrawer = (anchor: cartDrawer) => {
        setDrawerState({ ...drawerState, [anchor]: false });
    };

    const handleToCart = (val: string) => {
        console.log(val);
        window.location.href = val;
        setDrawerState({ ...drawerState, ["right"]: false });
    };

    const cartList = (anchor: cartDrawer) => (
        <Box
        sx={{
            width: {
            sm: 500,
            xs: 270,
            },
        }}
        onMouseEnter={() => openDrawer(anchor)}
        pt={3}
        px={2}
        >
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row">
                    <Typography
                        variant="h5"
                        color="primary"
                    >
                        Your Cart
                    </Typography>
                    <Typography
                        variant="body2"
                        pt={2}
                        pl={1}
                    >
                        {cart.cartquantity} items
                    </Typography>
                </Stack>

                <CustomButton
                title="close"
                variant="outlined"
                sx={{ borderRadius: "10px", textTransform: "capitalize" }}
                onClick={() => closeDrawer("right")}
                />
            </Stack>

            {cart.cartquantity > 0 ? (
                cart.products.map((product, index) => (
                    <Box key={index}>
                        <Box display={{ xs: "block", sm: "none" }} mt={4}>
                            <img
                                src={`${"http://www.bortakvall.se"}${product.images.large}`}
                                style={styles.mobileImg}
                                alt="product"
                            />
                        </Box>
                        <Stack direction="row" mt={4} justifyContent="space-between">
                            <Stack direction="row" spacing={2}>
                                <Box display={{ xs: "none", sm: "block" }}>
                                    <img
                                        src={`${"http://www.bortakvall.se"}${product.images.thumbnail}`}
                                        style={styles.img}
                                        alt="product"
                                    />
                                </Box>
                                <Stack>
                                <Typography variant="subtitle1">{product.name}</Typography>
                                </Stack>
                            </Stack>
                            <Stack justifyContent="space-between">
                                <Typography 
                                    variant="subtitle1"
                                    display="flex"
                                    justifyContent="flex-end"
                                >
                                    {`${product.subtotal} Kr`}
                                </Typography>

                                <CustomButton
                                    title="Remove"
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    sx={{ borderRadius: "10px", textTransform: "capitalize"}}
                                    onClick={() => handleProductRemove(product.id)}
                                />

                                <Box pt={{ xs: 2, md: 0 }}>
                                    <QuantityCounter 
                                        data={product}
                                        counter={quantity}
                                        setCounter={setQuantity}
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                    </Box>
                ))
            ) : (
                <Typography variant="subtitle1" align="center">
                    No items in cart
                </Typography>
            )}
            {cart.cartquantity > 0 && (
                <React.Fragment>
                    <Box pt={4}>
                        <Divider />
                        <Stack py={2}>
                            <Stack 
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                >
                                <Typography variant="body2">Subtotal</Typography>
                                <Typography variant="subtitle1">
                                    {`${cart.subtotal} kr`}
                                </Typography>
                            </Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="body2">Delivery Charges</Typography>
                                <Typography variant="subtitle1">
                                    {`${cart.deliverycharges} kr`}
                                </Typography>
                            </Stack>
                        </Stack>
                        <Divider />
                        <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        pt={2}
                        >
                            <Typography variant="body2">Total</Typography>
                            <Typography variant="h5">{`${cart.total} kr`}</Typography>
                        </Stack>
                    </Box>

                    <Box py={2}>
                        <CustomButton
                            title="Proceed to Checkout"
                            variant="contained"
                            size="large"
                            sx={{ width: "100%", textTransform: "capitalize", borderRadius: "10px"}}
                            onClick={() => handleToCart("/checkout")}
                        />
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );

return (
    <React.Fragment>
        <Badge 
            badgeContent={cart.cartquantity}
            onClick={() => openDrawer("right")}
            onMouseEnter={() => openDrawer("right")} 
            color="primary" 
            sx={{ p: 0, cursor: "pointer" }}
            >
                <ShoppingBagIcon />
        </Badge>

        <Drawer
            anchor={"right"}
            open={drawerState["right"]}
            onClose={() => closeDrawer("right")}
            onMouseLeave={() => closeDrawer("right")}
        >
            {cartList("right")}
        </Drawer>
    </React.Fragment>
    );
};

export default Cart;