import { Grid, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import { Button, Select } from '../../../ui/core';

const StateMedicalCouncil = ({ setDoSearch }) => {
  // const [Value, setValue] = useState([]);
  const {
    formState: { errors },
    getValues,
    // handleSubmit,
    register,
    // setValue,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      Statemedicalcouncil: '',
    },
  });
  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={12}>
        <Typography
          bgcolor="grey1.light"
          p={1}
          component="div"
          color="tabHighlightedBackgroundColor.main"
          variant="h3"
        >
          Browse by State medical council*
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Select
          sx={{
            color: 'inputTextColor.main',
          }}
          fullWidth
          error={errors.Statemedicalcouncil?.message}
          name="Statemedicalcouncil"
          label="Select State medical council"
          placeholder="Select State medical council"
          defaultValue={getValues().Statemedicalcouncil}
          {...register('Statemedicalcouncil', {
            required: 'state medical council is required',
          })}
          options={[
            {
              label: '-',
              value: '-',
            },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="secondary" onClick={() => setDoSearch(true)}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default StateMedicalCouncil;
