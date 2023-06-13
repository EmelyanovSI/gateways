import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { addPeripheralDevice } from '../services/gateway.service';
import { Device } from '../interfaces/device.interface';
import { DeviceStatus } from '../constants';

interface Props {
  serialNumber: string;
  onDeviceAdded: () => void;
}

const AddDeviceForm: React.FC<Props> = ({ serialNumber, onDeviceAdded }) => {
  const newDeviceInitialState: Device = {
    uid: 0,
    vendor: '',
    status: DeviceStatus.Offline
  };

  const [newDevice, setNewDevice] = useState<Device>(newDeviceInitialState);

  const handleAddDevice = async () => {
    try {
      await addPeripheralDevice(serialNumber, newDevice);
      setNewDevice(newDeviceInitialState);
      onDeviceAdded();
    } catch (error) {
      console.error('Error adding peripheral device:', error);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <TextField
          label="UID"
          type="number"
          fullWidth
          value={newDevice.uid}
          onChange={(e) =>
            setNewDevice((prevDevice) => ({ ...prevDevice, uid: +e.target.value }))
          }
          inputProps={{ min: 0 }}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          label="Vendor"
          fullWidth
          value={newDevice.vendor}
          onChange={(e) =>
            setNewDevice((prevDevice) => ({ ...prevDevice, vendor: e.target.value }))
          }
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={newDevice.status}
            onChange={(e) =>
              setNewDevice((prevDevice) => ({
                ...prevDevice,
                status: e.target.value as DeviceStatus
              }))
            }
          >
            {Object.values(DeviceStatus).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddDevice}
          fullWidth
        >
          Add Device
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddDeviceForm;
