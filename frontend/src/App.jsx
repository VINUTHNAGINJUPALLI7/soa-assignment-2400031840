
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API = '/vaccinationcenter';

function App() {
  const [centers, setCenters] = useState([]);
  const [form, setForm] = useState({
    centerName: '',
    location: '',
    vaccineType: '',
    open: true,
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadCenters = async () => {
    try {
      const response = await axios.get(`${API}/displayall`);
      setCenters(response.data);
      setError('');
    } catch (err) {
      setError(
        'Cannot connect to the backend. Check that Spring Boot is running on port 9081.'
      );
    }
  };

  useEffect(() => {
    loadCenters();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === 'open' ? value === 'true' : value,
    }));
  };

  const resetForm = () => {
    setForm({
      centerName: '',
      location: '',
      vaccineType: '',
      open: true,
    });
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      if (editingId !== null) {
        await axios.put(`${API}/update/${editingId}`, form);
        setMessage('Vaccination center updated successfully!');
      } else {
        await axios.post(`${API}/add`, form);
        setMessage('Vaccination center added successfully!');
      }

      resetForm();
      await loadCenters();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to save center. Check the backend and form details.'
      );
    }
  };

  const handleEdit = (center) => {
    setForm({
      centerName: center.centerName,
      location: center.location,
      vaccineType: center.vaccineType,
      open: center.open,
    });
    setEditingId(center.id);
    setMessage('');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this center?')) {
      return;
    }

    try {
      await axios.delete(`${API}/delete/${id}`);
      setMessage('Vaccination center deleted successfully!');
      setError('');

      if (editingId === id) {
        resetForm();
      }

      await loadCenters();
    } catch (err) {
      setError('Unable to delete the vaccination center.');
    }
  };

  const filteredCenters = centers.filter((center) =>
    [
      center.centerName,
      center.location,
      center.vaccineType,
      String(center.id),
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="app-shell">
      <nav className="navbar navbar-dark topbar">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bold" href="#home">
            <span className="brand-icon">✚</span>
            VaxCare
          </a>
          <span className="text-white-50 small">
            Vaccination Center Management
          </span>
        </div>
      </nav>

      <main className="container py-4 py-md-5" id="home">
        <section className="welcome-panel mb-4">
          <div>
            <span className="eyebrow">HEALTHCARE MANAGEMENT</span>
            <h1>Vaccination Centers</h1>
            <p>
              Manage center details, locations and vaccine availability
              from one place.
            </p>
          </div>
          <div className="welcome-symbol">✚</div>
        </section>

        {message && (
          <div className="alert alert-success" role="status">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <section className="row g-3 mb-4">
          <div className="col-12 col-md-4">
            <div className="stat-card">
              <span className="stat-icon blue">✚</span>
              <div>
                <p>Total Centers</p>
                <h2>{centers.length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="stat-card">
              <span className="stat-icon green">✓</span>
              <div>
                <p>Open Centers</p>
                <h2>{centers.filter((center) => center.open).length}</h2>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="stat-card">
              <span className="stat-icon orange">◷</span>
              <div>
                <p>Closed Centers</p>
                <h2>{centers.filter((center) => !center.open).length}</h2>
              </div>
            </div>
          </div>
        </section>

        <section className="content-card mb-4">
          <div className="section-heading">
            <div>
              <h2>{editingId !== null ? 'Edit Center' : 'Add New Center'}</h2>
              <p>Enter the vaccination center information below.</p>
            </div>
            {editingId !== null && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={resetForm}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="centerName">
                  Center Name
                </label>
                <input
                  className="form-control"
                  id="centerName"
                  name="centerName"
                  value={form.centerName}
                  onChange={handleChange}
                  placeholder="Enter center name"
                  maxLength={100}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="location">
                  Location
                </label>
                <input
                  className="form-control"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Enter city or address"
                  maxLength={150}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="vaccineType">
                  Vaccine Type
                </label>
                <input
                  className="form-control"
                  id="vaccineType"
                  name="vaccineType"
                  value={form.vaccineType}
                  onChange={handleChange}
                  placeholder="Enter vaccine type"
                  maxLength={100}
                  required
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="open">
                  Center Status
                </label>
                <select
                  className="form-select"
                  id="open"
                  name="open"
                  value={String(form.open)}
                  onChange={handleChange}
                  required
                >
                  <option value="true">Open</option>
                  <option value="false">Closed</option>
                </select>
              </div>

              <div className="col-12 d-flex gap-2 mt-4">
                <button className="btn btn-primary px-4" type="submit">
                  {editingId !== null ? 'Update Center' : 'Add Center'}
                </button>
                <button
                  className="btn btn-light border px-4"
                  type="button"
                  onClick={resetForm}
                >
                  Clear
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="content-card">
          <div className="section-heading centers-heading">
            <div>
              <h2>All Vaccination Centers</h2>
              <p>View and manage your registered centers.</p>
            </div>
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={loadCenters}
            >
              ↻ Refresh
            </button>
          </div>

          <div className="search-box mb-3">
            <input
              className="form-control"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, location, vaccine or ID..."
              aria-label="Search vaccination centers"
            />
          </div>

          <div className="table-responsive">
            <table className="table align-middle center-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Center Name</th>
                  <th>Location</th>
                  <th>Vaccine Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCenters.map((center) => (
                  <tr key={center.id}>
                    <td>#{center.id}</td>
                    <td className="fw-semibold">{center.centerName}</td>
                    <td>{center.location}</td>
                    <td>{center.vaccineType}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          center.open ? 'status-open' : 'status-closed'
                        }`}
                      >
                        {center.open ? 'Open' : 'Closed'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleEdit(center)}
                          type="button"
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(center.id)}
                          type="button"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCenters.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center empty-state">
                      {search
                        ? 'No matching centers found.'
                        : 'No centers available. Add your first center above.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            Showing {filteredCenters.length} of {centers.length} centers
          </div>
        </section>

        <footer className="page-footer">
          Vaccination Center Management System · React + Spring Boot
        </footer>
      </main>
    </div>
  );
}

export default App;
