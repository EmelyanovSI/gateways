import { Router } from 'express';
import { GatewayController } from '@controllers/gateway.controller';
import { Routes } from '@interfaces/routes.interface';

export class GatewayRoute implements Routes {
  public path = '/gateways';
  public router = Router();
  public gateway = new GatewayController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.gateway.getAllGateways);
    this.router.get(`${this.path}/:serialNumber`, this.gateway.getGatewayBySerialNumber);
    this.router.post(this.path, this.gateway.createGateway);
    this.router.put(`${this.path}/:serialNumber`, this.gateway.updateGateway);
    this.router.delete(`${this.path}/:serialNumber`, this.gateway.deleteGateway);
    this.router.post(`${this.path}/:serialNumber/devices`, this.gateway.addPeripheralDevice);
    this.router.delete(`${this.path}/:serialNumber/devices/:uid`, this.gateway.removePeripheralDevice);
  }
}
