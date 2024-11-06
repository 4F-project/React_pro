import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddImageModal.css';

const AddImageModal = ({ isOpen, onClose, onAddImages }) => {
    const [newImages, setNewImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        console.log("Image selected:", e.target.files);  // 파일 선택 시 콘솔 로그
        const files = Array.from(e.target.files);
        setNewImages(files);
    };

    const handleUpload = async () => {
        if (newImages.length === 0) {
            alert('추가할 이미지를 선택해주세요.');
            console.log("No images selected for upload.");  // 업로드할 이미지가 없을 때 콘솔 로그
            return;
        }

        console.log("Starting upload...");  // 업로드 시작 시 콘솔 로그
        setLoading(true);
        setError(''); // 업로드 시 에러 메시지 초기화
        const formData = new FormData();
        newImages.forEach((image, index) => {
            formData.append('files', image);
            console.log(`Added image ${index + 1}:`, image.name);  // 각 이미지 추가 시 콘솔 로그
        });

        try {
            console.log("Sending API request to upload images...");  // API 요청 시작 시 로그
            const response = await axios.post('http://localhost:8000/upload/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log("API response received:", response);  // API 응답 수신 시 로그

            if (response.status === 200) {
                console.log("Upload successful:", response.data);  // 업로드 성공 시 콘솔 로그
                onAddImages(response.data.results); // 부모 컴포넌트로 새로운 결과 전달
                handleClose(); // 업로드 후 모달 닫기
            } else {
                console.error('Upload failed with status:', response.status);  // 실패 시 상태 코드 로그
                setError(`이미지 업로드 실패 - 상태 코드: ${response.status}`);
            }
        } catch (error) {
            if (error.response) {
                console.error('Upload failed - Server responded with error:', error.response);  // 서버 오류 응답 로그
                setError(`서버 오류: ${error.response.status} - ${error.response.data.error || '알 수 없는 오류'}`);
            } else if (error.request) {
                console.error('Upload failed - No response from server:', error.request);  // 요청 전송 실패 시 로그
                setError('서버에서 응답이 없습니다.');
            } else {
                console.error('Error setting up request:', error.message);  // 기타 설정 오류 로그
                setError('요청 설정 중 오류가 발생했습니다.');
            }
        } finally {
            console.log("Upload process completed.");  // 업로드 프로세스 완료 시 콘솔 로그
            setLoading(false);
        }
    };

    // 모달 닫을 때 상태 초기화
    const handleClose = () => {
        console.log("Closing modal and resetting state.");  // 모달 닫기 및 상태 초기화 시 콘솔 로그
        setNewImages([]); // 업로드할 이미지 상태 초기화
        setError(''); // 에러 메시지 초기화
        onClose();
    };

    if (!isOpen) {
        console.log("Modal is closed.");  // 모달이 닫혀 있는 경우 콘솔 로그
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>추가 이미지 업로드</h2>
                
                <input 
                    type="file" 
                    id="file-upload"
                    accept="image/*" 
                    multiple 
                    onChange={handleImageChange} 
                    style={{ display: 'none' }}
                />
                <label htmlFor="file-upload" className="file-upload-label common-button">파일 선택</label>
                
                {/* 미리보기 컨테이너 */}
                <div className="preview-container">
                    {newImages.map((image, index) => (
                        <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`미리보기 ${index + 1}`}
                            className="preview-image"
                        />
                    ))}
                </div>
                
                <button 
                    onClick={handleUpload} 
                    disabled={loading} 
                    className="common-button"
                >
                    {loading ? '업로드 중...' : '업로드'}
                </button>
                
                {error && <p className="error-message">{error}</p>}

                <button onClick={handleClose} className="close-button">&times;</button>
            </div>
        </div>
    );
};

export default AddImageModal;
