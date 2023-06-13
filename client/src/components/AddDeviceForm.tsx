import React, { useState } from 'react';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl
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
    <>
      <TextField
        label="UID"
        value={newDevice.uid}
        onChange={(e) =>
          setNewDevice((prevDevice) => ({ ...prevDevice, uid: +e.target.value }))
        }
      />
      <TextField
        label="Vendor"
        value={newDevice.vendor}
        onChange={(e) =>
          setNewDevice((prevDevice) => ({ ...prevDevice, vendor: e.target.value }))
        }
      />
      <FormControl>
        <InputLabel>Status</InputLabel>
        <Select
          value={newDevice.status}
          onChange={(e) =>
            setNewDevice((prevDevice) => ({ ...prevDevice, status: e.target.value as DeviceStatus }))
          }
        >
          {Object.values(DeviceStatus).map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAddDevice}
      >
        Add Device
      </Button>
    </>
  );
};

export default AddDeviceForm;
