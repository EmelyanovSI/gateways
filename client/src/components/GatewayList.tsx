import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container, Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { getAllGateways, removePeripheralDevice } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { getDateString } from '../utils';
import AddDeviceForm from './AddDeviceForm';

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

  const handleRemoveDevice = async (serialNumber: string, uid: number) => {
    try {
      await removePeripheralDevice(serialNumber, uid);
      fetchGateways();
    } catch (error) {
      console.error('Error removing peripheral device:', error);
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
                    <ListItem key={uid} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
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
