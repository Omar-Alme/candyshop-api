import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CustomButton from "../CustomButton";
import { Box, Chip, Stack } from "@mui/material";
import { ProductDataProps } from "../../types";
import { Link } from "react-router-dom";
import QuantityCounter from "../QuantityCounter";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const styles = {
    productCard: {
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
  },
    actionButton: {
        width: "100%",
        textTransform: "capitalize",
        fontSize: "1rem",
    },
    linkActionButton: {
        textDecoration: "none",
        width: "100%",
    },
};

const url = "https://www.bortakvall.se";




interface PropsTypes {
    data: ProductDataProps;
    singleProduct: boolean;
    handleAddtoCart: (args: ProductDataProps) => void;
    counter: number;
    setCounter: (value: number) => void;
  }
  
  const ProductCard: React.FC<PropsTypes> = ({
    data,
    singleProduct,
    handleAddtoCart,
    counter,
    setCounter,
  }) => {
    const product = useSelector((state: RootState) =>
      state.cart.products.find((p) => p.id === data.id)
    );
    return (
        <Card sx={styles.productCard}>
            <CardMedia 
                sx={{ height: 300 }} 
                image={
                    singleProduct
                        ? `${url}${data?.images?.large}`
                        : `${url}${data?.images?.thumbnail}`
                } 
                title= "Product Image"
            />
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {data?.name}
                </Typography>
                {  singleProduct && (
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        {data?.description}
                    </Typography>
                    )}
                {/* Map Tags */}
                <Stack direction="row" flexWrap="wrap">
                    {data?.tags?.map((tag) => (
                        <Box py={1} pr={1} key={tag?.id}>
                            <Chip label={tag.name} variant="outlined" />
                        </Box>
                    ))}
                </Stack>
                {/* Render price */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Price</Typography>
                    <Typography variant="body2">{`${data?.price} ${"Kr"}`}</Typography>
                </Stack>
                {/* Render quantity */}
                {/* <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Quantity</Typography>
                    <Typography variant="body2">{data?.stock_quantity}</Typography>
                </Stack> */}
                {/* Stock Status */}
                {/* <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Stock Status</Typography>
                    <Typography variant="body2">{data?.stock_status}</Typography>
                </Stack> */}
            </CardContent>
            <CardActions>
                <CustomButton
                    title="Add to Cart"
                    color="warning"
                    variant="contained"
                    size="small"
                    sx={styles.actionButton}
                    onClick={() => handleAddtoCart(data)}
                    disabled={
                        (product && product.quantity === data.stock_quantity) ||
                        data.stock_quantity === null
                    }
                />


                {!singleProduct ? (
                    <Link 
                        to={`/product/${data?.id}`}
                        style={styles.linkActionButton}
                    >
                        <CustomButton
                            title="Read More"
                            color="warning"
                            variant="outlined"
                            size="small"
                            sx={styles.actionButton}
                        />
                    </Link>
                ) : (
                    <QuantityCounter
                        data={data}
                        counter={counter}
                        setCounter={setCounter}
                    />
                )}
            </CardActions>
        </Card>
    );
}

export default ProductCard;