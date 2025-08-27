import BG from '../../assets/icons/countries/BG';
import CZ from '../../assets/icons/countries/CZ';
import DE from '../../assets/icons/countries/DE';
import DK from '../../assets/icons/countries/DK';
import ES from '../../assets/icons/countries/ES';
import FI from '../../assets/icons/countries/FI';
import FR from '../../assets/icons/countries/FR';
import GB from '../../assets/icons/countries/GB';
import HU from '../../assets/icons/countries/HU';
import IT from '../../assets/icons/countries/IT';
import LT from '../../assets/icons/countries/LT';
import LV from '../../assets/icons/countries/LV';
import NL from '../../assets/icons/countries/NL';
import NO from '../../assets/icons/countries/NO';
import PL from '../../assets/icons/countries/PL';
import RO from '../../assets/icons/countries/RO';
import SK from '../../assets/icons/countries/SK';
import SE from '../../assets/icons/countries/SE';
import UA from '../../assets/icons/countries/UA';
import AT from '../../assets/icons/countries/AT';
import BE from '../../assets/icons/countries/BE';
import CH from '../../assets/icons/countries/CH';
import EE from '../../assets/icons/countries/EE';
import IE from '../../assets/icons/countries/IE';
import HR from '../../assets/icons/countries/HR';
import SI from '../../assets/icons/countries/SI';
import PT from '../../assets/icons/countries/PT';
import GR from '../../assets/icons/countries/GR';
import AL from '../../assets/icons/countries/AL';
import AD from '../../assets/icons/countries/AD';
import AR from '../../assets/icons/countries/AR';
import AM from '../../assets/icons/countries/AM';
import AZ from '../../assets/icons/countries/AZ';
import BY from '../../assets/icons/countries/BY';
import BA from '../../assets/icons/countries/BA';
import CA from '../../assets/icons/countries/CA';
import CL from '../../assets/icons/countries/CL';
import CY from '../../assets/icons/countries/CY';
import GE from '../../assets/icons/countries/GE';
import XK from '../../assets/icons/countries/XK';
import LI from '../../assets/icons/countries/LI';
import LU from '../../assets/icons/countries/LU';
import MA from '../../assets/icons/countries/MA';
import MX from '../../assets/icons/countries/MX';
import MD from '../../assets/icons/countries/MD';
import MC from '../../assets/icons/countries/MC';
import ME from '../../assets/icons/countries/ME';
import MK from '../../assets/icons/countries/MK';
import PE from '../../assets/icons/countries/PE';
import RS from '../../assets/icons/countries/RS';
import TR from '../../assets/icons/countries/TR';
import US from '../../assets/icons/countries/US';
import Earth from '../../assets/icons/countries/earth';
import VA from '../../assets/icons/countries/VA';

const flags: Record<string, React.ComponentType> = {
  BG,
  CZ,
  DE,
  DK,
  ES,
  FI,
  FR,
  GB,
  HU,
  IT,
  LT,
  LV,
  NL,
  NO,
  PL,
  RO,
  SK,
  SE,
  UA,
  AT,
  BE,
  CH,
  EE,
  IE,
  HR,
  SI,
  PT,
  GR,
  AD,
  BY,
  BA,
  CA,
  CL,
  CY,
  GE,
  MA,
  MX,
  MD,
  MC,
  ME,
  MK,
  PE,
  RS,
  TR,
  US,
  XK,
  AL,
  AR,
  AM,
  AZ,
  LI,
  LU,
  VA,
};

const FlagIcon = ({ countryCode }: { countryCode: string }) => {
  const CountryFlag = flags[countryCode];

  return CountryFlag ? <CountryFlag /> : <Earth />;
};

export default FlagIcon;
