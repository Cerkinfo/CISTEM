import { useLanguage } from "@pkg/contexts/LanguageContext";
import "@styles/components/buttons/submit-button.scss"

export function SubmitButton({ formik, loading, text, textLoading }: { formik: any, loading: boolean, text: string, textLoading: string }) {
    const { t } = useLanguage();
    return (
      <div className="submit">
        <button
          type="submit" 
          disabled={loading || formik.isSubmitting}
        >
          {loading ? t(`${textLoading}`) : t(`${text}`)}
        </button>
      </div>
    );
}