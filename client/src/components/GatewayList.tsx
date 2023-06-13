import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { addPeripheralDevice, getAllGateways, removePeripheralDevice } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { Device } from '../interfaces/device.interface';
import { getDateString } from '../utils';
import { DeviceStatus } from '../constants';

const GatewayList: React.FC = () => {
  const newDeviceInitialState: Device = {
    uid: 0,
    vendor: '',
    status: DeviceStatus.Offline
  };

  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newDevice, setNewDevice] = useState<Device>(newDeviceInitialState);

  useEffect(() => {
    fetchGateways();
  }, []);

  const fetchGateways = () => {
    setLoading(true);
    getAllGateways()
      .then((response) => {
        setGateways(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gateways:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveDevice = async (serialNumber: string, uid: number) => {
    try {
      await removePeripheralDevice(serialNumber, uid);
      fetchGateways();
    } catch (error) {
      console.error('Error removing peripheral device:', error);
    }
  };

  const handleAddDevice = async (serialNumber: string) => {
    try {
      await addPeripheralDevice(serialNumber, newDevice);
      setNewDevice(newDeviceInitialState);
      fetchGateways();
    } catch (error) {
      console.error('Error adding peripheral device:', error);
    }
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        gateways.map(({ serialNumber, name, ip, devices }) => (
          <Accordion key={serialNumber}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="subtitle1">Serial Number: {serialNumber}</Typography>
              <Typography variant="subtitle1">IP Address: {ip}</Typography>
              <Typography variant="h6">Devices:</Typography>
              {devices.length > 0 ? (
                <List>
                  {devices.map(({ uid, vendor, status, dateCreated }) => (
                    <ListItem key={uid}>
                      <ListItemText
                        primary={`UID: ${uid}`}
                        secondary={`Vendor: ${vendor}`}
                      />
                      <ListItemText
                        primary={`Date created: ${getDateString(dateCreated)}`}
                        secondary={`Status: ${status}`}
                      />
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveDevice(serialNumber, uid)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No devices associated with this gateway.</Typography>
              )}
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

              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => handleAddDevice(serialNumber)}
              >
                Add Device
              </Button>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default GatewayList;
