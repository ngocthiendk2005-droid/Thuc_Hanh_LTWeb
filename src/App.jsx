import "./App.css";

const products = [
  {
    id: 1,
    name: "Áo Blazer Linen",
    price: "2.450.000₫",
    originalPrice: "3.100.000₫",
    tag: "Bán Chạy",
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
  },
  {
    id: 2,
    name: "Đầm Midi Silk",
    price: "3.200.000₫",
    originalPrice: null,
    tag: "Mới",
    img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600&q=80",
  },
  {
    id: 3,
    name: "Túi Tote Canvas",
    price: "890.000₫",
    originalPrice: "1.200.000₫",
    tag: "Sale",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  },
  {
    id: 4,
    name: "Giày Loafer Da",
    price: "1.750.000₫",
    originalPrice: null,
    tag: "Mới",
    img: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=600&q=80",
  },
];

const categories = [
  {
    name: "Áo",
    img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&q=80",
  },
  {
    name: "Váy & Đầm",
    img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80",
  },
  {
    name: "Túi Xách",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
  },
  {
    name: "Giày Dép",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
  },
  {
    name: "Phụ Kiện",
    img: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&q=80",
  },
];

export default function App() {
  return (
    <div className="app">
      {/* ── TOP BAR ── */}
      <div className="topbar">
        <span>Miễn phí vận chuyển cho đơn từ 500K</span>
        <span className="topbar-divider">|</span>
        <span>Đổi trả trong 30 ngày</span>
      </div>

      {/* ── NAVBAR ── */}
      <header className="navbar">
        <nav className="nav-left">
          <a href="#">Bộ Sưu Tập</a>
          <a href="#">Sale</a>
          <a href="#">Thương Hiệu</a>
        </nav>

        <a href="#" className="logo">
          LUXURY
        </a>

        <div className="nav-right">
          <button className="icon-btn" aria-label="Tìm kiếm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <button className="icon-btn" aria-label="Yêu thích">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="icon-btn cart-btn" aria-label="Giỏ hàng">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="cart-count">3</span>
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=85"
            alt="Hero"
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Bộ Sưu Tập Xuân Hè 2025</p>
          <h1 className="hero-title">
            Phong Cách
            <br />
            <em>Định Nghĩa Bạn</em>
          </h1>
          <p className="hero-desc">
            Khám phá những thiết kế tinh tế, chắt lọc từ vải cao cấp.
            <br />
            Thời trang là ngôn ngữ — hãy để phong cách lên tiếng.
          </p>
          <div className="hero-actions">
            <a href="#" className="btn-primary">
              Khám Phá Ngay
            </a>
            <a href="#" className="btn-ghost">
              Xem Lookbook
            </a>
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Cuộn xuống</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            "Hàng Mới Về",
            "Miễn Phí Vận Chuyển",
            "Đổi Trả Dễ Dàng",
            "Hàng Chính Hãng",
            "Thanh Toán An Toàn",
            "Hàng Mới Về",
            "Miễn Phí Vận Chuyển",
            "Đổi Trả Dễ Dàng",
            "Hàng Chính Hãng",
            "Thanh Toán An Toàn",
          ].map((t, i) => (
            <span key={i}>
              {t} <span className="marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section">
        <div className="section-header">
          <p className="section-label">Danh Mục</p>
          <h2 className="section-title">Tìm Phong Cách Của Bạn</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <a key={cat.name} href="#" className="category-card">
              <div className="category-img-wrap">
                <img src={cat.img} alt={cat.name} />
              </div>
              <span className="category-name">{cat.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="section section-alt">
        <div className="section-header">
          <p className="section-label">Nổi Bật</p>
          <h2 className="section-title">Sản Phẩm Được Yêu Thích</h2>
          <a href="#" className="section-link">
            Xem tất cả →
          </a>
        </div>
        <div className="products-grid">
          {products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} />
                <span
                  className={`product-tag tag-${p.tag === "Sale" ? "sale" : p.tag === "Mới" ? "new" : "hot"}`}
                >
                  {p.tag}
                </span>
                <div className="product-actions">
                  <button>♡ Yêu thích</button>
                  <button>🛍 Thêm vào giỏ</button>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <div className="product-pricing">
                  <span className="product-price">{p.price}</span>
                  {p.originalPrice && (
                    <span className="product-original">{p.originalPrice}</span>
                  )}
                </div>
                <div className="product-rating">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i}>{s}</span>
                  ))}
                  <span className="rating-count">(128)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANNER ── */}
      <section className="banner">
        <div className="banner-img-wrap">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1400&q=80"
            alt="Banner"
          />
          <div className="banner-overlay" />
        </div>
        <div className="banner-content">
          <p className="banner-eyebrow">Ưu Đãi Đặc Biệt</p>
          <h2 className="banner-title">
            Giảm Đến
            <br />
            <strong>40%</strong>
          </h2>
          <p className="banner-desc">Chỉ trong tuần này — đừng bỏ lỡ!</p>
          <a href="#" className="btn-primary">
            Mua Ngay
          </a>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section why-section">
        <div className="section-header">
          <p className="section-label">Cam Kết</p>
          <h2 className="section-title">Tại Sao Chọn LUXURY?</h2>
        </div>
        <div className="why-grid">
          {[
            {
              icon: "🚚",
              title: "Giao Hàng Nhanh",
              desc: "Miễn phí vận chuyển toàn quốc cho đơn từ 500K",
            },
            {
              icon: "🔄",
              title: "Đổi Trả Dễ Dàng",
              desc: "Hoàn tiền 100% trong vòng 30 ngày nếu không hài lòng",
            },
            {
              icon: "💎",
              title: "Hàng Chính Hãng",
              desc: "Cam kết 100% sản phẩm chính hãng, chất lượng cao cấp",
            },
            {
              icon: "🎁",
              title: "Quà Tặng Cao Cấp",
              desc: "Gói quà miễn phí — ấn tượng từ cái nhìn đầu tiên",
            },
          ].map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-icon">{item.icon}</div>
              <h3 className="why-title">{item.title}</h3>
              <p className="why-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="newsletter">
        <div className="newsletter-inner">
          <p className="section-label" style={{ color: "var(--gold)" }}>
            Ưu Đãi Độc Quyền
          </p>
          <h2 className="newsletter-title">Đăng Ký Nhận Tin</h2>
          <p className="newsletter-desc">
            Nhận ưu đãi độc quyền và cập nhật bộ sưu tập mới nhất trước mọi
            người.
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Nhập email của bạn..." />
            <button>Đăng Ký</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">LUXURY</div>
            <p>
              Thời trang cao cấp — phong cách sống tinh tế.
              <br />
              Được tin dùng bởi hơn 50,000 khách hàng.
            </p>
            <div className="footer-socials">
              {["Facebook", "Instagram", "TikTok", "Pinterest"].map((s) => (
                <a key={s} href="#">
                  {s}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-links">
            {[
              {
                title: "Mua Sắm",
                links: ["Hàng Mới", "Bán Chạy", "Sale", "Thương Hiệu"],
              },
              {
                title: "Hỗ Trợ",
                links: ["Liên Hệ", "FAQ", "Đổi Trả", "Theo Dõi Đơn Hàng"],
              },
              {
                title: "Công Ty",
                links: ["Về Chúng Tôi", "Blog", "Tuyển Dụng", "Chính Sách"],
              },
            ].map((col) => (
              <div key={col.title} className="footer-col">
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 LUXURY. Tất cả quyền được bảo lưu.</p>
          <div className="payment-icons">
            {["VISA", "Mastercard", "VNPay", "Momo", "ZaloPay"].map((p) => (
              <span key={p} className="payment-badge">
                {p}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
