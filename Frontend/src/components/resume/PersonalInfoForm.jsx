function PersonalInfoForm({ handleChange }) {

  return (

    <div className="form-section">

      <h3 className="text-xl font-semibold text-border border-b border-border pb-4 mb-6">
        Personal Information
      </h3>

      <div className="form-row">

        <div className="form-group">
          <label>Full Name</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="fullName" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="email" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="phone" onChange={handleChange}/>
        </div>

      </div>


      <div className="form-row">

        <div className="form-group">
          <label>LinkedIn</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="linkedin" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>GitHub</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="github" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Portfolio</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="portfolio" onChange={handleChange}/>
        </div>

      </div>

      <div className="form-row">

        <div className="form-group">
          <label>Location</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="location" onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>summary</label>
          <input className="border border-border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-primary outline-none" name="summary" onChange={handleChange}/>
        </div>


      </div>

    </div>

  );

}

export default PersonalInfoForm;
