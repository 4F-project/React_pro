// src/components/LoadingModal.js
import React from 'react';
import '../styles/LoadingModal.css'; // 모달 스타일 추가
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome CSS 추가

const LoadingModal = ({ isOpen }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <i className="fas fa-spinner fa-spin loading-icon"></i>
                <h2>업로드 중이에요!</h2>
                <p>이미지를 분류하고 있습니다!!</p>
            </div>
        </div>
    );
};

export default LoadingModal;
