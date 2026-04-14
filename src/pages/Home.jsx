import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

import BrandImg from "../assets/images/Brand.png";
import LogoImg from "../assets/images/Logo.png";

function Home() {
  return (
    <>
      <Navbar />

      <div className="main-content">
        <div className="content-wrapper">
          {/* Section 1 — Giới thiệu */}
          <div className="f1">
            <div className="left">
              <img src={BrandImg} className="Brand1" alt="brand" />
              <p>
                Ngôn ngữ ký hiệu hay ngôn ngữ dấu hiệu, thủ ngữ là ngôn ngữ dùng
                những biểu hiện của bàn tay thay cho âm thanh của tiếng nói.
                Ngôn ngữ ký hiệu do người điếc tạo ra nhằm giúp họ có thể giao
                tiếp với nhau trong cộng đồng của mình và tiếp thu tri thức của
                xã hội...
              </p>
              <Link to="/introduce">
                <button>Xem thêm</button>
              </Link>
            </div>
            <div className="right">
              <img src={LogoImg} alt="logo" />
            </div>
          </div>

          {/* Section 2 — Câu hỏi thường gặp */}
          <div className="f2">
            <h2>CÁC CÂU HỎI THƯỜNG GẶP</h2>
            <div className="ques">
              <p>Mình có thể học NNKH trên website này được không ?</p>
              <p>
                NNKH của Việt Nam có khác với NNKH được sử dụng trên thế giới
                không ?
              </p>
              <p>
                NNKH của Việt Nam có khác với NNKH được sử dụng trên thế giới
                không ?
              </p>
            </div>
          </div>

          {/* Section 3 — Chính sách bảo mật */}
          <div className="f3">
            <h2>CHÍNH SÁCH BẢO MẬT</h2>
          </div>

          {/* Section 4 — Điều khoản sử dụng */}
          <div className="f4">
            <h2>ĐIỀU KHOẢN SỬ DỤNG</h2>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
