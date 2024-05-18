"use client";
import * as React from "react";
import CustomButton from "../CustomButton";
import { Box, Badge, Drawer, Stack, Typography, Divider } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";


const styles = {
    img: {
      width: "100px",
      height: "100px",
      borderRadius: "10px",
    },
    mobileImg: {
      height: "200px",
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


const openDrawer = (anchor: cartDrawer) => {
    setDrawerState({ ...drawerState, [anchor]: true });
  };

  const closeDrawer = (anchor: cartDrawer) => {
    setDrawerState({ ...drawerState, [anchor]: false });
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
            //   color={theme.palette.primary.main}
          >
            Your Cart
          </Typography>
          <Typography
            variant="body2"
            // color={theme.palette.primary.main}
            pt={2}
            pl={1}
          >
            {/* {cart.cartquantity} */}
            items
          </Typography>
        </Stack>
        <CustomButton
          title="close"
          variant="outlined"
          sx={{ borderRadius: "10px" }}
          onClick={() => closeDrawer("right")}
        />
      </Stack>

</Box>
  );

  return (
    <React.Fragment>
      <Badge badgeContent={1} color="primary" sx={{ p: 0, cursor: "pointer" }}>
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