import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminDashboard() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    replied: 0,
    unique_senders: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      loadDashboard();
    }
  }, [authToken, statusFilter]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Login failed");
        return;
      }

      setAuthToken(result.token);
      localStorage.setItem("authToken", result.token);
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message || "Connection error");
    } finally {
      setLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      // Load both stats and messages
      const [statsResponse, messagesResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
        fetch(`${API_BASE_URL}/admin/messages`, {
          headers: { Authorization: `Bearer ${authToken}` },
        }),
      ]);

      if (!statsResponse.ok || !messagesResponse.ok) {
        throw new Error("Failed to load data");
      }

      const statsData = await statsResponse.json();
      const messagesData = await messagesResponse.json();

      setStats({
        total: messagesData.pagination?.total || 0,
        unread:
          messagesData.messages?.filter((m) => m.status === "unread").length ||
          0,
        replied:
          messagesData.messages?.filter((m) => m.status === "replied").length ||
          0,
        unique_senders: new Set(
          messagesData.messages?.map((m) => m.email) || [],
        ).size,
      });
      setMessages(messagesData.messages || []);
    } catch (error) {
      console.error("Dashboard error:", error);
      setAuthToken(null);
      localStorage.removeItem("authToken");
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("authToken");
    setMessages([]);
    setSelectedMessage(null);
  };

  if (!authToken) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Admin Dashboard</h1>
          <p>Portfolio Contact Messages</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <nav className="dashboard-navbar">
        <div className="navbar-container">
          <h2 className="navbar-brand">Dashboard</h2>
          <div className="navbar-right">
            <span className="user-email">Admin</span>
            <button className="btn btn-secondary" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <div
              className={`nav-item ${activeSection === "overview" ? "active" : ""}`}
              onClick={() => setActiveSection("overview")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">📊</span>
              <span>Overview</span>
            </div>
            <div
              className={`nav-item ${activeSection === "messages" ? "active" : ""}`}
              onClick={() => setActiveSection("messages")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">📧</span>
              <span>Messages</span>
              <span className="badge">{stats.unread || 0}</span>
            </div>
            <div
              className={`nav-item ${activeSection === "settings" ? "active" : ""}`}
              onClick={() => setActiveSection("settings")}
              style={{ cursor: "pointer" }}
            >
              <span className="nav-icon">⚙️</span>
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        <main className="main-content">
          <section
            className={`section ${activeSection === "overview" ? "active" : ""}`}
          >
            <h1>Dashboard Overview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Total Messages</div>
                <div className="stat-value">{stats.total || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Unread</div>
                <div className="stat-value unread">{stats.unread || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Replied</div>
                <div className="stat-value replied">{stats.replied || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Unique Senders</div>
                <div className="stat-value">{stats.unique_senders || 0}</div>
              </div>
            </div>

            <div className="content-grid">
              <div className="chart-card">
                <h3>Budget Distribution</h3>
                <div id="budgetChart" className="chart">
                  <svg width="100%" height="250" style={{ minHeight: "250px" }}>
                    {/* Simple bar chart showing message status distribution */}
                    {stats.total > 0 ? (
                      <>
                        {/* Y-axis */}
                        <line
                          x1="30"
                          y1="20"
                          x2="30"
                          y2="220"
                          stroke="#ddd"
                          strokeWidth="2"
                        />
                        {/* X-axis */}
                        <line
                          x1="30"
                          y1="220"
                          x2="280"
                          y2="220"
                          stroke="#ddd"
                          strokeWidth="2"
                        />

                        {/* Bars */}
                        {/* Unread */}
                        <rect
                          x="50"
                          y={220 - (stats.unread / stats.total) * 180}
                          width="40"
                          height={(stats.unread / stats.total) * 180}
                          fill="#3b82f6"
                        />
                        <text x="50" y="235" textAnchor="middle" fontSize="12">
                          Unread
                        </text>
                        <text
                          x="70"
                          y={220 - (stats.unread / stats.total) * 180 - 5}
                          textAnchor="middle"
                          fontSize="11"
                          fill="#3b82f6"
                          fontWeight="bold"
                        >
                          {stats.unread || 0}
                        </text>

                        {/* Read */}
                        <rect
                          x="110"
                          y={
                            220 -
                            ((stats.total - stats.unread - stats.replied) /
                              stats.total) *
                              180
                          }
                          width="40"
                          height={
                            ((stats.total - stats.unread - stats.replied) /
                              stats.total) *
                            180
                          }
                          fill="#6b7280"
                        />
                        <text x="130" y="235" textAnchor="middle" fontSize="12">
                          Read
                        </text>
                        <text
                          x="130"
                          y={
                            220 -
                            ((stats.total - stats.unread - stats.replied) /
                              stats.total) *
                              180 -
                            5
                          }
                          textAnchor="middle"
                          fontSize="11"
                          fill="#6b7280"
                          fontWeight="bold"
                        >
                          {stats.total - stats.unread - stats.replied || 0}
                        </text>

                        {/* Replied */}
                        <rect
                          x="170"
                          y={220 - (stats.replied / stats.total) * 180}
                          width="40"
                          height={(stats.replied / stats.total) * 180}
                          fill="#10b981"
                        />
                        <text x="190" y="235" textAnchor="middle" fontSize="12">
                          Replied
                        </text>
                        <text
                          x="190"
                          y={220 - (stats.replied / stats.total) * 180 - 5}
                          textAnchor="middle"
                          fontSize="11"
                          fill="#10b981"
                          fontWeight="bold"
                        >
                          {stats.replied || 0}
                        </text>
                      </>
                    ) : (
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy="0.3em"
                        fill="#999"
                      >
                        No data yet
                      </text>
                    )}
                  </svg>
                </div>
              </div>
              <div className="recent-card">
                <h3>Recent Submissions</h3>
                <div className="recent-list">
                  {messages.slice(0, 5).map((msg) => (
                    <div key={msg.id} className="recent-item">
                      <div className="recent-item-title">{msg.name}</div>
                      <div className="recent-item-email">{msg.email}</div>
                      <div className="recent-item-date">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`section ${activeSection === "messages" ? "active" : ""}`}
          >
            {!selectedMessage ? (
              <>
                <h1>Contact Messages</h1>
                <div className="filters">
                  <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="messages-list">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`message-item ${msg.status === "unread" ? "unread" : ""}`}
                      onClick={() => setSelectedMessage(msg)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="message-info">
                        <div className="message-name">{msg.name}</div>
                        <div className="message-email">{msg.email}</div>
                        <div className="message-date">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className={`message-status ${msg.status}`}>
                        {msg.status}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedMessage(null)}
                >
                  ← Back to Messages
                </button>
                <div className="message-detail">
                  <h2>{selectedMessage.name}</h2>
                  <div className="detail-section">
                    <div className="detail-label">Email</div>
                    <div className="detail-value">{selectedMessage.email}</div>
                  </div>
                  {selectedMessage.company && (
                    <div className="detail-section">
                      <div className="detail-label">Company</div>
                      <div className="detail-value">
                        {selectedMessage.company}
                      </div>
                    </div>
                  )}
                  {selectedMessage.budget && (
                    <div className="detail-section">
                      <div className="detail-label">Budget</div>
                      <div className="detail-value">
                        {selectedMessage.budget}
                      </div>
                    </div>
                  )}
                  <div className="detail-section">
                    <div className="detail-label">Date</div>
                    <div className="detail-value">
                      {new Date(
                        selectedMessage.created_at,
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="detail-section">
                    <div className="detail-label">Message</div>
                    <div className="message-content">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section
            className={`section ${activeSection === "settings" ? "active" : ""}`}
          >
            <div className="settings-card">
              <h3>Account Information</h3>
              <p>
                Email: <span>admin@example.com</span>
              </p>
              <p>
                Last Login: <span>N/A</span>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
