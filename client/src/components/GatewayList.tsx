import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Container,
  Divider,
  Typography
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { getAllGateways } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { Device } from '../interfaces/device.interface';
import AddDeviceForm from './AddDeviceForm';
import DeviceList from './DeviceList';

const GatewayList: React.FC = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleDeviceRemoved = (serialNumber: string, uid: number) => {
    const updatedGateways = gateways.map((gateway) => {
      if (gateway.serialNumber === serialNumber) {
        const updatedDevices = gateway.devices.filter((device) => device.uid !== uid);
        return { ...gateway, devices: updatedDevices };
      }
      return gateway;
    });
    setGateways(updatedGateways);
  };

  const handleDeviceAdded = (serialNumber: string, newDevice: Device) => {
    const updatedGateways = gateways.map((gateway) => {
      if (gateway.serialNumber === serialNumber) {
        const updatedDevices = [...gateway.devices, newDevice];
        return { ...gateway, devices: updatedDevices };
      }
      return gateway;
    });
    setGateways(updatedGateways);
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Container sx={{ mt: 2 }}>
          {gateways.map(({ serialNumber, name, ip, devices }) => (
            <Accordion key={serialNumber}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle1">Serial Number: {serialNumber}</Typography>
                <Typography variant="subtitle1">IP Address: {ip}</Typography>
                <DeviceList
                  devices={devices}
                  serialNumber={serialNumber}
                  onDeviceRemoved={handleDeviceRemoved}
                />
                <Divider variant="middle" />
                <br />
                <AddDeviceForm
                  serialNumber={serialNumber}
                  onDeviceAdded={handleDeviceAdded}
                />
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      )}
    </>
  );
};

export default GatewayList;
