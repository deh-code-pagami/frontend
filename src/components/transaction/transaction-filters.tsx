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
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<number[]>([minAmountValue, maxAmountValue]);
  const [date, setDate] = useState<string[]>(['', '']);
  const [dateDisplay, setDateDisplay] = useState<(Dayjs|null)[]>([null, null])

  const onAmountSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setAmount([Math.min(newValue[0], amount[1] - minDistance), amount[1]]);
    } else {
      setAmount([amount[0], Math.max(newValue[1], amount[0] + minDistance)]);
    }
  };

  const onAmountMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value === '' ? 0 : Number(event.target.value);
    newValue = isNaN(newValue) ? maxAmountValue : newValue;
    setAmount([Math.min(newValue, amount[1] - minDistance), amount[1]]);
  };

  const onAmountMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value === '' ? minAmountValue : Number(event.target.value);
    newValue = isNaN(newValue) ? maxAmountValue : newValue;
    setAmount([amount[0], Math.max(newValue, amount[0] + minDistance)]);
  }

  const resetFilters = () => {
    setDescription('');
    setAmount([minAmountValue, maxAmountValue]);
    setDateDisplay([null, null]);
    setDate(['', '']);
  }

  return (
    <Box>
      <Form>
        <Stack spacing={4}>
          <Box>
            <TextField value={description} id="description" name="description" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)} />
          </Box>
          <Box>
            <Typography sx={{ mb: 1.5 }}>Amount:</Typography>
            <Grid container >
              <Grid item xs={12} md={6} sx={{ paddingRight: '8px' }} >
                <TextField id="amount_min" value={amount[0]} name="amount_min" label="Min" variant="outlined" onChange={onAmountMinChange} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}>
                <TextField id="amount_max" value={amount[1]} name="amount_max" label="Max" variant="outlined" onChange={onAmountMaxChange} />
              </Grid>
            </Grid>
            <Slider
              sx={{
                '& .MuiSlider-markLabel': {
                  transform: 'translateX(-100%)'
                },
                mt: 2,
                mb: 0
              }}
              getAriaLabel={() => 'Minimum distance'}
              value={amount}
              onChange={onAmountSliderChange}
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
            <Typography sx={{ mb: 1.5 }}>Date:</Typography>
            <Grid container >
              <Grid item xs={12} md={6} sx={{ paddingRight: '8px' }} >
                <DatePicker
                  value={dateDisplay[0]} 
                  onChange={(v: any) => { setDate([v.format('YYYY-MM-DD'), date[1]]); setDateDisplay([v, dateDisplay[1]])} } />
                <input type="hidden" name="from_date" value={date[0]} />
              </Grid>
              <Grid item xs={12} md={6} sx={{ paddingLeft: '8px' }}>
                <DatePicker
                  value={dateDisplay[1]}
                  onChange={(v: any) => {setDate([date[0], v.format('YYYY-MM-DD')]); setDateDisplay([dateDisplay[0], v]); }} />
                <input type="hidden" name="to_date" value={date[1]} />
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Button type="button" onClick={resetFilters} variant="outlined" color='error' sx={{ padding: '16px 32px', alignSelf: 'center', width: '100%' }}>Reset</Button>
              </Grid>
              <Grid item xs={6}>
                <Button type="submit" variant="outlined" sx={{ padding: '16px 32px', alignSelf: 'center', width: '100%' }}>Apply</Button>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Form>
    </Box>
  );
}