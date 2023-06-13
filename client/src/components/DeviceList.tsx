import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { getDateString } from '../utils';
import { removePeripheralDevice } from '../services/gateway.service';
import { Device } from '../interfaces/device.interface';

interface DeviceListProps {
  devices: Device[];
  serialNumber: string;
  onDeviceRemoved: (serialNumber: string, uid: number) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({
  devices,
  serialNumber,
  onDeviceRemoved
}) => {
  const handleRemoveDevice = (uid: number) => {
    removePeripheralDevice(serialNumber, uid)
      .then(() => {
        onDeviceRemoved(serialNumber, uid);
      })
      .catch((error) => {
        console.error('Error removing peripheral device:', error);
      });
  };

  return (
    <>
      <Typography variant="h6">Devices:</Typography>
      {devices.length > 0 ? (
        <List>
          {devices.map(({ uid, vendor, status, dateCreated }) => (
            <ListItem
              key={uid}
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <ListItemText
                primary={`UID: ${uid}`}
                secondary={`Vendor: ${vendor}`}
                style={{ flex: 1 }}
              />
              <ListItemText
                primary={`Date created: ${getDateString(dateCreated)}`}
                secondary={`Status: ${status}`}
                style={{ flex: 1 }}
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveDevice(uid)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No devices associated with this gateway.</Typography>
      )}
    </>
  );
};

export default DeviceList;
