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
      {gateways.map((gateway) => (
        <Accordion key={gateway.serialNumber}>
          <AccordionSummary>
            <Typography>{gateway.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography variant="subtitle1">Serial Number: {gateway.serialNumber}</Typography>
              <Typography variant="subtitle1">IP Address: {gateway.ip}</Typography>
              <Typography variant="h6">Devices:</Typography>
              {gateway.devices.length > 0 ? (
                <List>
                  {gateway.devices.map((device) => (
                    <ListItem key={device.uid}>
                      <ListItemText primary={`UID: ${device.uid}`} secondary={`Vendor: ${device.vendor}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography>No devices associated with this gateway.</Typography>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default GatewayList;
