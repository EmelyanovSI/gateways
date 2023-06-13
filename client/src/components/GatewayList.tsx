import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  Divider,
  Typography
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { getAllGateways } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
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
              <DeviceList
                devices={devices}
                serialNumber={serialNumber}
                onDeviceRemoved={fetchGateways}
              />
              <Divider variant="middle" />
              <br />
              <AddDeviceForm serialNumber={serialNumber} onDeviceAdded={fetchGateways} />
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default GatewayList;
