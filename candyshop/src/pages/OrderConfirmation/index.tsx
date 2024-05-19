import { Container, Paper, Stack, Typography } from '@mui/material';
import blacktick from "../../assets/images/blacktick.png";


const OrderConfirmation = () => {
  const storedUserData = localStorage.getItem("user");

  let userData = null;

  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  }

  return (
    <Container maxWidth="md" sx={{ marginBottom: "100px", marginTop: "50px" }}>
      <Paper elevation={3}>
        <Stack alignItems="center" justifyContent="center" py={5}>
          <img
            src={blacktick}
            alt="image"
            style={{ width: "150px", height: "150" }}
          />
          <Typography fontWeight="500" gutterBottom>
            Thank you for your order{" "}
            {`${userData?.customer_first_name} ${userData?.customer_last_name}`}
          </Typography>
          <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Your order {userData?.id} is confirmed!
          </Typography>
          <Typography align="center" fontWeight="500" gutterBottom>
            You will recieve your order within 3 to 7 working days
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;
