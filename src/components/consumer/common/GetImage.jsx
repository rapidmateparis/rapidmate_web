import Bicycle from "../../../assets/images/Bicycle.png";
import Scooter from "../../../assets/images/Scooter.png";
import Car from "../../../assets/images/Car.png";
import Partner from "../../../assets/images/Partner.png";
import Van from "../../../assets/images/Van.png";
import Pickup from "../../../assets/images/Pickup.png";
import Truck from "../../../assets/images/Truck.png";
import Other from "../../../assets/images/Package.png";
import VehicleSelection from "./VehicleSelection";

const getImage = (vehicleData) => {
  switch (vehicleData?.vehicle_type_id || vehicleData?.id) {
    case 1:
      return Bicycle;
    case 2:
      return Scooter;
    case 3:
      return Car;
    case 4:
      return Partner;
    case 5:
      return Van;
    case 6:
      return Pickup;
    case 7:
      return Truck;
    default:
      return Other;
  }
};

export default getImage;
