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
    this.router.get(`${this.path}/:id`, this.gateway.getGatewayById);
    this.router.post(this.path, this.gateway.createGateway);
    this.router.put(`${this.path}/:id`, this.gateway.updateGateway);
    this.router.delete(`${this.path}/:id`, this.gateway.deleteGateway);
    this.router.post(`${this.path}/:id/devices`, this.gateway.addPeripheralDevice);
    this.router.delete(`${this.path}/:id/devices/:deviceId`, this.gateway.removePeripheralDevice);
  }
}
