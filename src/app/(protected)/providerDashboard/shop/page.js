"use client";
import "./shop.css";
export default function ShopPage() {
  return (
    <div className="dashboard-shop">
      <h2>Shop Details</h2>

      <div className="shop-info">
        <p><strong>Shop Name:</strong> ABC Services</p>
        <p><strong>Provider:</strong> Muhammad Umar</p>
        <p><strong>Phone:</strong> 0300-0000000</p>
        <p><strong>Email:</strong> example@gmail.com</p>
        <p><strong>Address:</strong> Okara, Punjab</p>
        <p><strong>Category:</strong> Electrician</p>
        <p><strong>Services:</strong> AC Repair, Wiring</p>
        <p><strong>Pricing:</strong> Adjustable</p>
        <p><strong>Timing:</strong> 9AM - 6PM</p>
      </div>

      <div className="shop-images">
        <h3>Shop / Work Proof</h3>
        <div className="images-grid">
          <div className="img-placeholder">Image</div>
          <div className="img-placeholder">Image</div>
        </div>
      </div>

      <div className="shop-actions">
        <button>Edit</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
}