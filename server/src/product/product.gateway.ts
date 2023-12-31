import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { ProductCycleResponse } from "./models/product.response";
import { ProductStatus } from "src/entities/Product.entity";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class ProductGateway {
  @WebSocketServer()
  private server: Server;

  changeProductStatus(
    products: Array<ProductCycleResponse>
  ): Array<ProductCycleResponse> {
    this.server.emit("status", products);
    return products;
  }
}
