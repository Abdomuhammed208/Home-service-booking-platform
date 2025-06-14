// import React, { useState } from 'react';
// import SwitchUser from './SwitchUser';
// import { useNavigate } from 'react-router-dom';

// function TaskerForm({ setUserType }) {
//     const navigate = useNavigate();
//     const [message, setMessage] = useState();
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         mobile: "",
//         password: "",
//         city: "",
//         gender: "",
//         service: "",
//         type: "individual",
//         company_name: "",
//     });
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [selectedLicense, setSelectedLicense] = useState(null);
//     const [licensePreviewUrl, setLicensePreviewUrl] = useState(null);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSelectedImage(file);
//             setPreviewUrl(URL.createObjectURL(file));
//         }
//     };

//     const handleLicenseChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setSelectedLicense(file);
//             setLicensePreviewUrl(URL.createObjectURL(file));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setMessage("");

//         try {
//             const formDataToSend = new FormData();
//             // Append all form fields
//             Object.keys(formData).forEach(key => {
//                 formDataToSend.append(key, formData[key]);
//             });
            
//             // Append the image if selected
//             if (selectedImage) {
//                 formDataToSend.append('profile_image', selectedImage);
//             }

//             // Append license if selected and type is company
//             if (formData.type === 'company' && selectedLicense) {
//                 formDataToSend.append('license', selectedLicense);
//             }

//             const response = await fetch("http://localhost:3000/tasker-signup", {
//                 method: "POST",
//                 body: formDataToSend,
//             });

//             const data = await response.json();
//             if (!response.ok) {
//                 setMessage(data.message || "Something went wrong.");
//             } else {
//                 setMessage(data.message);
//                 setFormData({ 
//                     name: "", 
//                     email: "", 
//                     mobile: "", 
//                     password: "", 
//                     city: "", 
//                     gender: "", 
//                     service: "",
//                     type: "individual",
//                     company_name: ""
//                 });
//                 navigate("/login");
//                 setSelectedImage(null);
//                 setPreviewUrl(null);
//                 setSelectedLicense(null);
//                 setLicensePreviewUrl(null);
//             }
//         } catch (err) {
//             console.error("Frontend error:", err);
//             setMessage("Could not connect to the server.");
//         }
//     };

//     return (
//         <div className="container">
//             <div className="signup-container">
//                 <h1 className="form-title">Sign up</h1>
//                 <SwitchUser setUserType={setUserType} />
//                 <form className="signup-form" onSubmit={handleSubmit}>
//                     <div className="profile-image-upload">
//                         {previewUrl && (
//                             <div className="image-preview">
//                                 <img src={previewUrl} alt="Profile preview" />
//                             </div>
//                         )}
//                         <div className="input-wrapper">
//                             <label className="file-input-label">
//                                 {selectedImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
//                                 <input
//                                     type="file"
//                                     accept="image/*"
//                                     onChange={handleImageChange}
//                                     className="file-input"
//                                 />
//                             </label>
//                         </div>
//                     </div>
//                     <div className="input-wrapper">
//                         <input className="input-field" placeholder="Name" type="text" onChange={handleChange} name="name" required />
//                     </div>
//                     <div className="input-wrapper">
//                         <input className="input-field" placeholder="Mobile no." type="text" onChange={handleChange} name="mobile" required />
//                     </div>
//                     <div className="input-wrapper">
//                         <input className="input-field" placeholder="Email" type="email" onChange={handleChange} name="email" required />
//                     </div>
//                     <div className="form-group">
//                         <div className="gender-options">
//                             <label className="gender-label">Gender: </label>
//                             <div className="radio-group">
//                                 <input type="radio" name="gender" value="male" id="male" className="gender-input" onChange={handleChange} />
//                                 <label htmlFor="male" className="radio-label">Male</label>
//                             </div>
//                             <div className="radio-group">
//                                 <input type="radio" name="gender" value="female" id="female" className="gender-input" onChange={handleChange} />
//                                 <label htmlFor="female" className="radio-label">Female</label>
//                             </div>
//                         </div>
//                         <div className="city-select-wrapper">
//                             <select name="city" onChange={handleChange} className="city-select">
//                                 <option value="">Select your city</option>
//                                 <option value="cyberjaya">Cyberjaya</option>
//                                 <option value="petalingjaya">Petaling Jaya</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="input-wrapper">
//                         <input name="service" className="input-field" type="text" placeholder="Service (e.g. Plumbing)" onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <div className="type-options">
//                             <label className="type-label">Type: </label>
//                             <div className="radio-group">
//                                 <input 
//                                     type="radio" 
//                                     name="type" 
//                                     value="individual" 
//                                     id="individual" 
//                                     className="type-input" 
//                                     onChange={handleChange}
//                                     checked={formData.type === "individual"}
//                                 />
//                                 <label htmlFor="individual" className="radio-label">Individual</label>
//                             </div>
//                             <div className="radio-group">
//                                 <input 
//                                     type="radio" 
//                                     name="type" 
//                                     value="company" 
//                                     id="company" 
//                                     className="type-input" 
//                                     onChange={handleChange}
//                                     checked={formData.type === "company"}
//                                 />
//                                 <label htmlFor="company" className="radio-label">Company</label>
//                             </div>
//                         </div>
//                     </div>

//                     {formData.type === "company" && (
//                         <div className="company-fields">
//                             <div className="input-wrapper">
//                                 <input 
//                                     className="input-field" 
//                                     placeholder="Company Name" 
//                                     type="text" 
//                                     onChange={handleChange} 
//                                     name="company_name" 
//                                     required 
//                                 />
//                             </div>
//                             <div className="license-upload">
//                                 {licensePreviewUrl && (
//                                     <div className="license-preview">
//                                         <img src={licensePreviewUrl} alt="License preview" />
//                                     </div>
//                                 )}
//                                 <div className="input-wrapper">
//                                     <label className="file-input-label">
//                                         {selectedLicense ? 'Change License' : 'Upload License'}
//                                         <input
//                                             type="file"
//                                             accept="image/*,.pdf"
//                                             onChange={handleLicenseChange}
//                                             className="file-input"
//                                             required
//                                         />
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     <div className="input-wrapper">
//                         <input className="input-field" placeholder="Password" type="password" onChange={handleChange} name="password" required />
//                     </div>
//                     {message && <p style={{ color: 'red' }}>{message}</p>}
//                     <button className="signup-button" type="submit">Sign up</button>
//                 </form>
//                 <p className="sign-up-text">
//                     I have an account?
//                     <a href="/login"> Login</a>
//                 </p>
//             </div>
//         </div>
//     );
// }

// export default TaskerForm;
import React, { useState } from 'react';
import SwitchUser from './SwitchUser';
import { useNavigate } from 'react-router-dom';

function TaskerForm({ setUserType }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    city: "",
    gender: "",
    service: "",
    type: "individual",
    company_name: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedLicense, setSelectedLicense] = useState(null);
  const [licensePreviewUrl, setLicensePreviewUrl] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleLicenseChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedLicense(file);
      setLicensePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      if (selectedImage) {
        formDataToSend.append('profile_image', selectedImage);
      }
      if (formData.type === 'company' && selectedLicense) {
        formDataToSend.append('license', selectedLicense);
      }

      const response = await fetch("http://localhost:3000/tasker-signup", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      navigate("/login", { state: { succefulMessage: "Account has been registered successfully" } });
      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
      } else {
        setMessage(data.message);
        setFormData({
          name: "", email: "", mobile: "", password: "",
          city: "", gender: "", service: "", type: "individual", company_name: ""
        });
        setSelectedImage(null);
        setPreviewUrl(null);
        setSelectedLicense(null);
        setLicensePreviewUrl(null);
      }
    } catch (err) {
      console.error("Frontend error:", err);
      setMessage("Could not connect to the server.");
    }
  };

  const styles = {
    container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", backgroundColor: "#f9fafb", padding: "1rem", fontFamily: "sans-serif" },
    formBox: { backgroundColor: "#fff", padding: "2rem", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", maxWidth: "500px", width: "100%" },
    title: { fontSize: "2rem", fontWeight: "bold", marginBottom: "1.5rem", textAlign: "center" },
    inputWrapper: { marginBottom: "1rem" },
    input: { width: "100%", padding: "12px 16px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1rem" },
    select: { width: "100%", padding: "12px 16px", borderRadius: "5px", border: "1px solid #ddd", fontSize: "1rem" },
    fileInputLabel: { display: "block", backgroundColor: "#4f46e5", color: "white", padding: "10px 16px", borderRadius: "5px", cursor: "pointer", textAlign: "center", marginBottom: "1rem" },
    fileInputHidden: { display: "none" },
    previewImage: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "1rem" },
    button: { width: "100%", padding: "12px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "5px", fontSize: "1rem", marginTop: "1rem", cursor: "pointer" },
    switchText: { marginTop: "1rem", fontSize: "0.9rem", textAlign: "center" },
    link: { color: "#4f46e5", marginLeft: "5px", textDecoration: "none" },
    error: { color: "red", marginBottom: "1rem", textAlign: "center" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h1 style={styles.title}>Sign Up</h1>
        <SwitchUser setUserType={setUserType} />
        <form onSubmit={handleSubmit}>
          {previewUrl && <div style={{ textAlign: "center" }}><img src={previewUrl} alt="Profile" style={styles.previewImage} /></div>}
          <label style={styles.fileInputLabel}>
            {selectedImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
            <input type="file" accept="image/*" onChange={handleImageChange} style={styles.fileInputHidden} />
          </label>

          <div style={styles.inputWrapper}><input style={styles.input} placeholder="Name" name="name" type="text" onChange={handleChange} required /></div>
          <div style={styles.inputWrapper}><input style={styles.input} placeholder="Mobile no." name="mobile" type="text" onChange={handleChange} required /></div>
          <div style={styles.inputWrapper}><input style={styles.input} placeholder="Email" name="email" type="email" onChange={handleChange} required /></div>

          <div style={styles.inputWrapper}>
            <label>Gender:</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label><input type="radio" name="gender" value="male" onChange={handleChange} /> Male</label>
              <label><input type="radio" name="gender" value="female" onChange={handleChange} /> Female</label>
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <select name="city" onChange={handleChange} style={styles.select} required>
              <option value="">Select your city</option>
              <option value="cyberjaya">Cyberjaya</option>
              <option value="petalingjaya">Petaling Jaya</option>
            </select>
          </div>

          <div style={styles.inputWrapper}><input style={styles.input} placeholder="Service (e.g. Plumbing)" name="service" type="text" onChange={handleChange} /></div>

          <div style={styles.inputWrapper}>
            <label>Type:</label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <label><input type="radio" name="type" value="individual" checked={formData.type === "individual"} onChange={handleChange} /> Individual</label>
              <label><input type="radio" name="type" value="company" checked={formData.type === "company"} onChange={handleChange} /> Company</label>
            </div>
          </div>

          {formData.type === "company" && (
            <>
              <div style={styles.inputWrapper}><input style={styles.input} placeholder="Company Name" name="company_name" type="text" onChange={handleChange} required /></div>

              {licensePreviewUrl && <div style={{ textAlign: "center" }}><img src={licensePreviewUrl} alt="License" style={styles.previewImage} /></div>}
              <label style={styles.fileInputLabel}>
                {selectedLicense ? 'Change License' : 'Upload License'}
                <input type="file" accept="image/*,.pdf" onChange={handleLicenseChange} style={styles.fileInputHidden} required />
              </label>
            </>
          )}

          <div style={styles.inputWrapper}><input style={styles.input} placeholder="Password" name="password" type="password" onChange={handleChange} required /></div>

          {message && <p style={styles.error}>{message}</p>}
          <button style={styles.button} type="submit">Sign Up</button>

          <p style={styles.switchText}>I have an account?<a href="/login" style={styles.link}>Login</a></p>
        </form>
      </div>
    </div>
  );
}

export default TaskerForm;
