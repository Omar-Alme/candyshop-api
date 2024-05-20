import CircularProgress from "@mui/material/CircularProgress";
import  Box  from "@mui/material/Box";

const Loader = () => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <CircularProgress color="secondary" />
        </Box>
    );
};

export default Loader;