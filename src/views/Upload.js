import {
  Button,
  Grid,
  Typography,
  CircularProgress,
  Slider,
} from '@mui/material';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
// import {useNavigate} from 'react-router-dom';
import useForm from '../hooks/FormHooks';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {appID} from '../utils/variables';

const Upload = () => {
  const [preview, setPreview] = useState('logo192.png');
  const alkuarvot = {
    title: '',
    description: '',
  };

  const filterarvot = {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
  };

  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      console.log('doUpload');
      // lisätään filttert descriptioniin
      const desc = {
        description: inputs.description,
        filters: filterInputs,
      };
      const token = localStorage.getItem('token');
      const formdata = new FormData();
      formdata.append('title', inputs.title);
      formdata.append('description', JSON.stringify(desc));
      formdata.append('file', inputs.file);
      const mediaData = await postMedia(formdata, token);
      const tagData = await postTag(
        {file_id: mediaData.file_id, tag: appID},
        token
      );
      confirm(tagData.message) && navigate('/home');
    } catch (err) {
      alert(err.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    alkuarvot
  );

  const {inputs: filterInputs, handleInputChange: handleSliderChange} = useForm(
    null,
    filterarvot
  );

  useEffect(() => {
    if (inputs.file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreview(reader.result);
      });
      reader.readAsDataURL(inputs.file);
    }
  }, [inputs.file]);

  console.log(inputs, filterInputs);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" variant="h2" gutterBottom>
            Upload
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator
              fullWidth
              placeholder="title"
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
            <TextValidator
              fullWidth
              placeholder="description"
              name="description"
              onChange={handleInputChange}
              value={inputs.description}
            />

            <TextValidator
              fullWidth
              type="file"
              name="file"
              accept="image/*, video/*, audio/*"
              onChange={handleInputChange}
            />
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                fullWidth
                color="primary"
                type="submit"
                variant="contained"
              >
                Upload
              </Button>
            )}
          </ValidatorForm>
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={3}>
          <img
            style={{
              width: '100%',
              height: '50vh',
              filter: `
              brightness(${filterInputs.brightness}%)
              contrast(${filterInputs.contrast}%)
              saturate(${filterInputs.saturation}%)
              sepia(${filterInputs.sepia}%)`,
            }}
            src={preview}
            alt="preview"
          />
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Slider
              name="brightness"
              min={0}
              max={200}
              step={1}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
              defaultValue={filterarvot.brightness}
            />
            <Slider
              name="contrast"
              min={0}
              max={200}
              step={1}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
              defaultValue={filterarvot.contrast}
            />
            <Slider
              name="saturation"
              min={0}
              max={200}
              step={1}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
              defaultValue={filterarvot.saturation}
            />
            <Slider
              name="sepia"
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="on"
              onChange={handleSliderChange}
              defaultValue={filterarvot.sepia}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Upload;
