"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRestaurantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_restaurant_dto_1 = require("./create-restaurant.dto");
class UpdateRestaurantDto extends (0, swagger_1.PartialType)(create_restaurant_dto_1.CreateRestaurantDto) {
}
exports.UpdateRestaurantDto = UpdateRestaurantDto;
//# sourceMappingURL=update-restaurant.dto.js.map