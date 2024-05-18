import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CustomButton from "../CustomButton";
import { Box, Chip, Stack } from "@mui/material";
import { ProductDataProps } from "../../types";

const styles = {
    productCard: {
        maxWidth: 345,
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
  },
};

const ProductCard: React.FC<{ data: ProductDataProps; }> = ({ data }) => {
    console.log("url", `www.bortakvall.se${data.images.thumbnail}`);

    return (
        <Card sx={styles.productCard}>
            <img 
                src={`www.bortakvall.se${data.images.thumbnail}`} 
                alt="Candy Image"
                style={{ width: "100%", height: "auto" }}
                crossOrigin="anonymous" 
            />
            <CardMedia 
                sx={{ height: 140 }} 
                image={`www.bortakvall.se${data.images.thumbnail}`} 
                title={data.name} 
            />
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {data.name}
                </Typography>
                {/* Map Tags */}
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {data.tags.map((tag) => (
                        <Box py={1} pr={1} key={tag.id}>
                            <Chip label={tag.name} variant="outlined" />
                        </Box>
                    ))}
                </Stack>
                {/* Render price */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Price</Typography>
                    <Typography variant="body2">{`${data.price} ${"Kr"}`}</Typography>
                </Stack>
                {/* Render quantity */}
                {/* <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Quantity</Typography>
                    <Typography variant="body2">{data.stock_quantity}</Typography>
                </Stack> */}
                {/* Stock Status */}
                {/* <Stack direction="row" justifyContent="space-between" alignItems="center" pt={1}>
                    <Typography variant="body1">Stock Status</Typography>
                    <Typography variant="body2">{data.stock_status}</Typography>
                </Stack> */}
            </CardContent>
            <CardActions>
                <CustomButton
                    title="Add to Cart"
                    color="primary"
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%" }}
                />
                <CustomButton
                    title="Read More"
                    color="primary"
                    variant="contained"
                    size="medium"
                    sx={{ width: "100%" }}
                />
            </CardActions>
        </Card>
    );
}

export default ProductCard;