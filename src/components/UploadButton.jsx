import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { FaCloudUploadAlt } from "react-icons/fa";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadButton =({handleFileChange}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<FaCloudUploadAlt />}
    >
      Kép feltöltése
      <VisuallyHiddenInput
        type="file"
        accept='image/*'
        onChange={handleFileChange}
      />
    </Button>
  );
}

export default UploadButton