import { Button, Grid, Slider, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Form } from "react-router-dom";

const minDistance = 1;
const minAmountValue = 0;
const maxAmountValue = 5000;

function valuetext(value: number) {
  return `$${value}`;
}

export default function TransactionFilters() {
  const [amount, setAmount] = React.useState<number[]>([minAmountValue, maxAmountValue]);

  const handleAmountSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      changeMinAmount(newValue[0]);
    } else {
      changeMaxAmount(newValue[1]);
    }
  };

  const handleAmountMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value);
    changeMinAmount(isNaN(newValue) ? 0 : newValue);
  };

  const handleAmountMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? minAmountValue : Number(event.target.value);
    changeMaxAmount(isNaN(newValue) ? maxAmountValue : newValue);
  }

  const changeMinAmount = (
    newValue: number
  ) => {
    setAmount([Math.min(newValue, amount[1] - minDistance), amount[1]]);
  }

  const changeMaxAmount = (
    newValue: number
  ) => {
    setAmount([amount[0], Math.max(newValue, amount[0] + minDistance)]);
  }

  return (
    <Box>
      <Form>
        <Stack spacing={2}>
          <TextField id="description" name="description" label="Description" variant="outlined" />
          <Grid container >
            <Grid item xs={12} md={6} sx={{paddingRight: '8px'}} >
              <TextField id="amount_min" value={amount[0]} name="amount_min" label="Min" variant="outlined" onChange={handleAmountMinChange} />
            </Grid>
            <Grid item xs={12} md={6} sx={{paddingLeft: '8px'}}>
              <TextField id="amount_max" value={amount[1]} name="amount_max" label="Max" variant="outlined" onChange={handleAmountMaxChange} />
            </Grid>
          </Grid>
          <Box>
            <Slider
              sx={{
                '& .MuiSlider-markLabel': {
                  transform: 'translateX(-100%)'
                }
              }}
              getAriaLabel={() => 'Minimum distance'}
              value={amount}
              onChange={handleAmountSliderChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              min={minAmountValue}
              max={maxAmountValue}
              marks={[
                {
                  value: 0,
                  label: minAmountValue
                },
                {
                  value: maxAmountValue,
                  label: maxAmountValue
                }
              ]}
            />
          </Box>
          <Button type="submit" variant="outlined" sx={{ padding: '16px 32px', alignSelf: 'center', width: 'fit-content' }}>Apply</Button>
        </Stack>
      </Form>
    </Box>
  );
}