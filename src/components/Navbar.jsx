import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

import ArrowImg from "../assets/images/Arrow.png";
import BrandImg from "../assets/images/Brand.png";
import PersonalImg from "../assets/images/Personal.png";
import SettingImg from "../assets/images/Setting.png";

function Navbar() {
  const { pathname } = useLocation();

  const active = (path) => (pathname === path ? "active" : "");

  return (
    <div className="Navbar">
      <Link to="/home">
        <img src={ArrowImg} className="brand" alt="arrow" />
      </Link>
      <Link to="/home">
        <img src={BrandImg} className="brand" alt="brand" />
      </Link>
      <Link to="/introduce">
        <button className={`Introduce ${active("/introduce")}`}>
          GIỚI THIỆU CHUNG
        </button>
      </Link>
      <Link to="/translate">
        <button className={`Translate ${active("/translate")}`}>
          DỊCH THUẬT
        </button>
      </Link>
      <Link to="/learning">
        <button className={`Learning ${active("/learning")}`}>TỪ ĐIỂN</button>
      </Link>
      <Link to="/asking">
        <button className={`Asking ${active("/asking")}`}>GIẢI ĐÁP</button>
      </Link>
      <Link to="/personal">
        <img src={PersonalImg} className="Personal" alt="personal" />
      </Link>
      <Link to="/settings">
        <img src={SettingImg} className="setting" alt="setting" />
      </Link>
    </div>
  );
}

export default Navbar;
