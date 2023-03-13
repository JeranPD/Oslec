import { useState, useEffect } from "react";
import { FormRow, Alert } from "../Index.js";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/AdminProfile";
const AdminProfile = () => {
  const { admin, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(admin?.name);
  const [email, setEmail] = useState(admin?.email);
  const [lastName, setLastName] = useState(admin?.lastName);
  const [password, setPassword] = useState(admin?.password);
  const [location, setLocation] = useState(admin?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({
      name,
      email,
      lastName,
      location,
    });
  };

  useEffect(() => {
    document.title = "Admin Profile";
  }, []);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <div className="btn-container">
            <button
              className="btn btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Please Wait" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AdminProfile;
