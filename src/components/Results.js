import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ResultsPage.css'; // Import the CSS file here

const ResultsPage = () => {
    const location = useLocation();
    const { results: initialResults, clusterCounts } = location.state || { results: [], clusterCounts: {} };
    const [results, setResults] = useState(initialResults);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clusterData, setClusterData] = useState(clusterCounts);

    const categoryMap = {
        0: '패션',
        1: '지도',
        2: '동물',
        3: '음식'
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    console.log(results);

    return (
        <div className="results-container">
            {results.length === 0 ? (
                <p>결과가 없습니다.</p>
            ) : (
                Object.keys(clusterData).map((clusterKey) => {
                    const clusterResults = results.filter(
                        (result) => result.cluster === parseInt(clusterKey)
                    );
                    const categoryName = categoryMap[clusterKey] || '기타'; // Default to '기타' if no matching category

                    return (
                        <div className="cluster" key={clusterKey}>
                            <div className="cluster-header">
                                <h2>{categoryName}</h2>
                            </div>
                            <div className="image-gallery">
                                {clusterResults.map((result, index) => {
                                    const imageUrl = `http://localhost:8000/images/screenshot/${result.image}`;
                                    return (
                                        <div className="image-container" key={index}>
                                            {result.image ? (
                                                <img
                                                    src={imageUrl}
                                                    alt={`결과 이미지 ${index + 1}`}
                                                />
                                            ) : (
                                                <p>이미지 없음</p>
                                            )}
                                            <p className="tags">
                                                태그: {Array.isArray(result.tags)
                                                    ? result.tags.join(', ')
                                                    : result.tags || '태그 없음'}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ResultsPage;
