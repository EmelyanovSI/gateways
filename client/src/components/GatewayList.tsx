import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';
import { getAllGateways } from '../services/gateway.service';
import { Gateway } from '../interfaces/gateway.interface';
import { getDateString } from '../utils';

const GatewayList: React.FC = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);

  useEffect(() => {
    getAllGateways()
      .then((response) => {
        setGateways(response.data);
      })
      .catch((error) => {
        console.error('Error fetching gateways:', error);
      });
  }, []);

  return (
    <Container>
      {gateways.map(({ serialNumber, name, ip, devices }) => (
        <Accordion key={serialNumber}>
          <AccordionSummary>
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
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography>No devices associated with this gateway.</Typography>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default GatewayList;
