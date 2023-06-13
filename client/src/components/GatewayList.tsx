import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  CircularProgress
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getAllGateways, removePeripheralDevice } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { getDateString } from '../utils';

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
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default GatewayList;
