import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate import
import '../styles/ScreenshotUploader.css'; // CSS 파일을 import

function UploadPage() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]); // 미리보기 URL 상태 추가
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    // 미리보기 URL 생성
    const urls = files.map(file => URL.createObjectURL(file));
    console.log(urls)
    setPreviewUrls(urls);

    // 이미지 경로 콘솔 로그 출력
    console.log("Selected image URLs:", urls[0]);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
        alert("Please select files to upload.");
        return;
    }

    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("files", selectedFiles[i]);
    }

    try {
        const response = await axios.post("http://localhost:8000/upload/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        // 업로드 성공 후 결과 페이지로 이동
        navigate("/results", { state: { results: response.data.results, clusterCounts: response.data.cluster_counts } });
    } catch (error) {
        console.error("Error uploading files:", error);
        alert("Error uploading files.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="uploader-container">
        <input 
          type="file" 
          id="file-input" // id 추가
          multiple 
          className="file-input" 
          onChange={handleFileChange} 
        />
        <label className="file-label" htmlFor="file-input">
          Select Files
        </label>
        <button 
          className="upload-button" 
          onClick={handleUpload} 
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <div className="preview-container" style={{ marginTop: "20px", display: 'flex', flexWrap: 'wrap' }}>
          {previewUrls.map((url, index) => (
            <div key={index} className="image-box">
              <img src={url} alt={`Preview ${index}`} className="preview-image" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
