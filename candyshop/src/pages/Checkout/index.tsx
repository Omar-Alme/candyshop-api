import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { makePostRequest } from "../../utils/api";
import { urls } from "../../utils/urls";
import { clearCart } from "../../redux/cartSlice";
import CustomButton from "../../components/CustomButton";
import QuantityCounter from "../../components/QuantityCounter";
import CustomTextField from "../../components/CustomTextField";

const styles = {
  paper: {
    padding: "16px",
  },
  productImage: {
    width: "150px",
    height: "100%",
    borderRadius: "10px",
  },
  helperText: {
    color: "red",
    paddingLeft: "15px",
  },
};

interface Inputs {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: number | string;
  customer_city: string;
  customer_email: string;
  customer_phone: string;
  order_total: number;
}
const Checkout = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>({
    defaultValues: {
      customer_first_name: "",
      customer_last_name: "",
      customer_phone: "",
      customer_email: "",
      customer_city: "",
      customer_address: "",
      customer_postcode: "",
    },
  });

  const [orderLoading, setOrderLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(1);

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const onSubmit = async (data: Inputs) => {
    const payload: Inputs = {
      customer_first_name: data.customer_first_name,
      customer_last_name: data.customer_last_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email,
      customer_city: data.customer_city,
      customer_address: data.customer_address,
      customer_postcode: data.customer_postcode,
      // products: cart.products,
      // subtotal: cart.subtotal,
      order_total: cart.total,
    };

    setOrderLoading(true);

    try {
      const response = await makePostRequest(urls.orders(0), payload);

      if (response.status === 200) {
        toast.success("Your order have successfully created", {
          position: "top-right",
          autoClose: 5000,
        });
        setOrderLoading(false);
        // router.push("/order-confirmation");
        // localStorage.removeItem("persist:cart");
        dispatch(clearCart());
      } else {
        toast.error(
          response.data.message
            ? response.data.message
            : "Something went wrong",
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
        setOrderLoading(false);
      }
    } catch (err) {
      console.error(err);
      setOrderLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Divider />
      <Container maxWidth="xl">
        <Grid container spacing={2} mb={4}>
          <Grid item xs={12} md={7}>
            <Typography variant="body1" mt={3} mb={1} fontWeight="500">
              Delivery information
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} order={{ xs: 3, md: 2 }}>
            <Typography variant="body1" mt={3} mb={1} fontWeight="500">
              Order Summary
            </Typography>
          </Grid>
          <Grid item xs={12} md={7} order={{ xs: 2, md: 3 }}>
            <Paper sx={styles.paper}>
              <form onSubmit={handleSubmit(onSubmit)} id="myForm">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="first_name"
                      rules={{ required: "First Name is required" }}
                      label="First Name"
                      size="small"
                      placeholder="Enter first name"
                      control={control}
                      helperText={errors.first_name?.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="last_name"
                      rules={{ required: "Last Name is required" }}
                      label="Last Name"
                      size="small"
                      placeholder="Enter last name"
                      control={control}
                      helperText={errors.last_name?.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="postcode"
                      rules={{ required: "Post Code is required" }}
                      label="Post Code"
                      size="small"
                      placeholder="Enter Post code"
                      control={control}
                      helperText={errors.postcode?.message}
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="mobile_number"
                      rules={{ required: false }}
                      label="Mobile Number"
                      size="small"
                      placeholder="Enter mobile number"
                      control={control}
                      helperText={errors.mobile_number?.message}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="email"
                      rules={{ required: "Email is required" }}
                      label="Email"
                      size="small"
                      placeholder="Enter email"
                      helperText={errors.email?.message}
                      control={control}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <CustomTextField
                      name="address"
                      rules={{ required: "Address is required" }}
                      label="Address"
                      size="small"
                      placeholder="Enter Address"
                      control={control}
                      helperText={errors.address?.message}
                      fullWidth
                      multiline
                      minRows={3}
                    />
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={5} order={{ xs: 3, md: 4 }}>
            <Paper sx={styles.paper}>
              {cart.cartquantity > 0 ? (
                cart.products.map((product) => (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    pb={2}
                    key={product.id}
                  >
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <img
                        src={`${"http://www.bortakvall.se"}${
                          product.images.large
                        }`}
                        style={styles.productImage}
                        alt="product image"
                      />
                      <Stack>
                        <Typography variant="body1">{product.name}</Typography>

                        <Typography variant="body1">
                          {`${"zł"} ${product.subtotal}`}
                        </Typography>
                      </Stack>
                    </Stack>
                    <QuantityCounter
                      data={product}
                      counter={quantity}
                      setCounter={setQuantity}
                    />
                  </Stack>
                ))
              ) : (
                <Typography variant="subtitle1" align="center">
                  There is no any product
                </Typography>
              )}
              {cart.cartquantity > 0 && (
                <React.Fragment>
                  <Box py={2}>
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      py={2}
                    >
                      <Typography variant="body1">Subtotal</Typography>
                      <Typography variant="body1" fontWeight="500">
                        {cart.subtotal}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      pb={2}
                    >
                      <Typography variant="body1">Delivery Charges</Typography>
                      <Typography variant="body1" fontWeight="500">
                        {cart.deliverycharges}
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                  <Box>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      pb={2}
                    >
                      <Typography variant="body1">Total</Typography>
                      <Typography variant="body1" fontWeight="500">
                        {cart.total}
                      </Typography>
                    </Stack>
                    <Divider />
                  </Box>
                  <CustomButton
                    title="confirm order"
                    variant="contained"
                    size="large"
                    sx={{ width: "100%", textTransform: "capitalize" }}
                    type="submit"
                    form="myForm"
                    endIcon={
                      orderLoading && (
                        <CircularProgress color="warning" size="1.3rem" />
                      )
                    }
                  />
                </React.Fragment>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Checkout;
