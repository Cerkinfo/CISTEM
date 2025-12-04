import { useLanguage } from "@pkg/contexts/LanguageContext";

export function SubmitButton({ formik, loading, text, textLoading }: { formik: any, loading: boolean, text: string, textLoading: string }) {
    const { t } = useLanguage();
    return (
        <button
          className="btn-form btn-form--secondary"
          type="submit" 
          disabled={loading || formik.isSubmitting}
        >
          {loading ? t(`${textLoading}`) : t(`${text}`)}
        </button>
    );
}