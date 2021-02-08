import Acapulco from '../images/acapulco-port.svg';
import ColonCity from '../images/colon-city-port.svg';
import Dakar from '../images/dakar-port.svg';
import Halifax from '../images/halifax-port.svg';
import Lisbon from '../images/lisbon-port.svg';
import London from '../images/london-port.svg';
import NewYork from '../images/new-york-port.svg';
import Norfolk from '../images/norfolk-port.svg';
import SanFrancisco from '../images/sanfran-port.svg';
import SanLorenzo from '../images/sanlorenzo-port.svg';
import Shangai from '../images/shangai-port.svg';
import Taipei from '../images/TAIPEI-port.svg';
import Tangier from '../images/tangier-port.svg';
import Tokyo from '../images/tokyo-port.svg';

export const googleMapsApiKey = process.env.CSD_GOOGLE_API_KEY;

export const getPortImage = (portName: string) => {
  switch (portName) {
    case 'London':
    case 'London Gateway':
      return London;
    case 'New York':
      return NewYork;
    case 'Norfolk':
      return Norfolk;
    case 'Halifax':
      return Halifax;
    case 'Colon City':
      return ColonCity;
    case 'Tangier':
      return Tangier;
    case 'Lisbon':
      return Lisbon;
    case 'Dakar':
      return Dakar;
    case 'San Francisco':
      return SanFrancisco;
    case 'Acapulco':
      return Acapulco;
    case 'San Lorenzo':
      return SanLorenzo;
    case 'Tokyo':
      return Tokyo;
    case 'Taipei':
      return Taipei;
    case 'Shangai':
      return Shangai;
    default:
      return null;
  };
};
