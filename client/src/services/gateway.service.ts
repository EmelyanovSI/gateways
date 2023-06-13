import axios from '../axios';
import { Gateway } from '../interfaces/gateway.interface';
import { Device } from '../interfaces/device.interface';
import { Response } from '../interfaces/response.interface';

const path = '/gateways';

export const getAllGateways = async (): Promise<Response<Gateway[]>> => {
  try {
    const response = await axios.get(`${path}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching gateways: ${error}`);
  }
};

export const getGatewayBySerialNumber = async (serialNumber: string): Promise<Response<Gateway>> => {
  try {
    const response = await axios.get(`${path}/${serialNumber}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching gateway with serial number ${serialNumber}: ${error}`);
  }
};

export const createGateway = async (gateway: Gateway): Promise<Response<Gateway>> => {
  try {
    const response = await axios.post(`${path}`, gateway);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating gateway: ${error}`);
  }
};

export const updateGateway = async (serialNumber: string, gateway: Gateway): Promise<Response<Gateway>> => {
  try {
    const response = await axios.put(`${path}/${serialNumber}`, gateway);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating gateway with serial number ${serialNumber}: ${error}`);
  }
};

export const deleteGateway = async (serialNumber: string): Promise<Response<Gateway>> => {
  try {
    const response = await axios.delete(`${path}/${serialNumber}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error deleting gateway with serial number ${serialNumber}: ${error}`);
  }
};

export const addPeripheralDevice = async (serialNumber: string, device: Device): Promise<Response<Gateway>> => {
  try {
    const response = await axios.post(`${path}/${serialNumber}/devices`, device);
    return response.data;
  } catch (error) {
    throw new Error(`Error adding peripheral device to gateway with serial number ${serialNumber}: ${error}`);
  }
};

export const removePeripheralDevice = async (serialNumber: string, uid: number): Promise<Response<Gateway>> => {
  try {
    const response = await axios.delete(`${path}/${serialNumber}/devices/${uid}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error removing peripheral device with UID ${uid} from gateway with serial number ${serialNumber}: ${error}`);
  }
};
