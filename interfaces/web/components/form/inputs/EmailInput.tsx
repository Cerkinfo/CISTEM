export function EmailInput({ formik }: { formik: any } ) {
    return (
        <div className="form-group">
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            className="form-control"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-message" style={{color: 'red'}}>{formik.errors.email}</div>
          )}
        </div>
    )
}