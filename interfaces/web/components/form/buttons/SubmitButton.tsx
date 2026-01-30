import "@styles/components/buttons/submit-button.scss"

export function SubmitButton({ formik, loading, text }: { formik: any, loading: boolean, text: string }) {
    return (
      <div className="submit">
        <button
          type="submit" 
          disabled={loading || formik.isSubmitting}
        >
          {loading ? 'Loading...': text}
        </button>
      </div>
    );
}