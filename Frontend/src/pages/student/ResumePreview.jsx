import { useEffect, useMemo, useState } from "react";
import { generateResumeHTML } from "../../services/aiService";
import { mapDataToTemplate } from "../../utils/mapDataToTemplate";

const ResumePreview = ({ data, selectedTemplate }) => {
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("loading");

  const previewPayload = useMemo(
    () => ({
      ...mapDataToTemplate(data),
      template_type: selectedTemplate,
    }),
    [data, selectedTemplate]
  );

  useEffect(() => {
    let isActive = true;

    setStatus("loading");

    generateResumeHTML(previewPayload)
      .then((resumeHtml) => {
        if (!isActive) return;
        setHtml(resumeHtml);
        setStatus("ready");
      })
      .catch(() => {
        if (!isActive) return;
        setHtml("");
        setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, [previewPayload]);

  return (
    <div id="resume-preview" className="bg-white shadow overflow-hidden">
      {status === "loading" && (
        <div className="p-6 text-sm text-gray-600">Loading preview...</div>
      )}

      {status === "error" && (
        <div className="p-6 text-sm text-red-600">
          Preview failed. Check that the AI service is running on port 8000.
        </div>
      )}

      {status === "ready" && (
        <iframe
          title="Resume preview"
          srcDoc={html}
          className="w-full bg-white"
          style={{ height: "900px", border: 0 }}
        />
      )}
    </div>
  );
};

export default ResumePreview;
