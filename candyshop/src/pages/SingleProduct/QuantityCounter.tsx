import React from "react";
import CustomButton from "../../components/CustomButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { ProductDataProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateProductQuantity } from "../../redux/cartSlice";

interface ExtendedQuantityCounterProps {
  data: ProductDataProps;
  counter: number;
  setCounter: (value: number) => void;
}

const QuantityCounter: React.FC<ExtendedQuantityCounterProps> = (props) => {
  const { counter, setCounter, data } = props;
  const dispatch = useDispatch();

  const product = useSelector((state: RootState) =>
    state.cart.products.find((p) => p.id === data.id)
  );

  const handleIncrement = (id: number) => {
    if (product) {
      dispatch(
        updateProductQuantity({
          id,
          quantity: product && product?.quantity + 1,
        })
      );
    } else {
      setCounter(counter + 1);
    }
  };

  // const handleIncrement = () => {
  //   setCounter(counter + 1);
  // };

  const handleDecrement = (id: number) => {
    if (product && product?.quantity > 1) {
      dispatch(
        updateProductQuantity({
          id,
          quantity: product && product?.quantity - 1,
        })
      );
    } else {
      if (counter > 1) {
        setCounter(counter - 1);
      }
    }
  };

  // const handleDecrement = () => {
  //   if (counter > 1) {
  //     setCounter(counter - 1);
  //   }
  // };

  return (
    <ButtonGroup size="small">
      <CustomButton
        title="-"
        variant="outlined"
        onClick={() => handleDecrement(data.id)}
        sx={{ borderColor: "black" }}
      />

      <CustomButton
        title={product?.quantity || counter}
        variant="outlined"
        disabled={true}
        sx={{
          "&.Mui-disabled": {
            color: "black",
            borderColor: "black",
          },
        }}
      />
      <CustomButton
        title="+"
        variant="outlined"
        onClick={() => handleIncrement(data.id)}
        sx={{ borderColor: "black" }}
      />
    </ButtonGroup>
  );
};

export default QuantityCounter;
