import { Button, Grid, Slider, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ChangeEvent, useRef, useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { Form } from "react-router-dom";
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';

const minDistance = 1;
const minAmountValue = 0;
const maxAmountValue = 5000;

function valuetext(value: number) {
  return `$${value}`;
}

export default function TransactionFilters() {
  const [amount, setAmount] = useState<number[]>([minAmountValue, maxAmountValue]);
  const [date, setDate] = useState<string[]>(['', '']);

  const handleAmountSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
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

  const changeMinAmount = (newValue: number) => {
    setAmount([Math.min(newValue, amount[1] - minDistance), amount[1]]);
  }

  const changeMaxAmount = (newValue: number) => {
    setAmount([amount[0], Math.max(newValue, amount[0] + minDistance)]);
  }

  const handleFromDateChange = (newValue: any, context: PickerChangeHandlerContext<DateValidationError>) => {
    setDate([newValue.format('YYYY-MM-DD'), date[1]]);
  }

  const handleToDateChange = (newValue: any, context: PickerChangeHandlerContext<DateValidationError>) => {
    setDate([date[0], newValue.format('YYYY-MM-DD')]);
  }



  return (
    <Box>
      <Form>
        <Stack spacing={4}>
          <Box>
            <TextField id="description" name="description" label="Description" variant="outlined" />
          </Box>
          <Box>
            <Typography sx={{mb: 1.5}}>Amount:</Typography>
            <Grid container >
              <Grid item xs={12} md={6} sx={{ paddingRight: '8px' }} >
                <TextField id="amount_min" value={amount[0]} name="amount_min" label="Min" variant="outlined" onChange={handleAmountMinChange} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}>
                <TextField id="amount_max" value={amount[1]} name="amount_max" label="Max" variant="outlined" onChange={handleAmountMaxChange} />
              </Grid>
            </Grid>
            <Slider
              sx={{
                '& .MuiSlider-markLabel': {
                  transform: 'translateX(-100%)'
                },
                mt: 2
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
          <Box>
            <Typography sx={{mb: 1.5}}>Date:</Typography>
            <Grid container >
              <Grid item xs={12} md={6} sx={{ paddingRight: '8px' }} >
                <DatePicker onChange={handleFromDateChange} />
                <input type="hidden" name="from_date" value={date[0]} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}>
                <DatePicker onChange={handleToDateChange} />
                <input type="hidden" name="to_date" value={date[1]} />
              </Grid>
            </Grid>
          </Box>
          <Button type="submit" variant="outlined" sx={{ padding: '16px 32px', alignSelf: 'center', width: 'fit-content' }}>Apply</Button>
        </Stack>
      </Form>
    </Box>
  );
}