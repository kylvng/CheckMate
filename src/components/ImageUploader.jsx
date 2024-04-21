import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_APP_API_KEY; 

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setLoading(true);
  
      try {
        // Read the file as binary data
        const reader = new FileReader();
        reader.onload = async (event) => {
          const binaryData = String(event.target.result);
  
          // Create a FormData object and append the binary data
          const formData = new FormData();
          console.log(binaryData);
          formData.append('image', binaryData);
  
          // Send the FormData object containing the binary image data
          const response = await axios.post('http://localhost:3000/foodvisor-analysis', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Api-Key ${apiKey}`
            }
          });
  
          // Handle the response
          setFoodInfo(response.data);
          console.log('Food information:', response.data);
        };
        reader.readAsBinaryString(file);
      } catch (error) {
        console.error('Error analyzing image:', error);
      }
  
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {loading && <p>Loading...</p>}
      {selectedImage && (
        <div>
          <h2>Selected Image</h2>
          <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', maxHeight: '400px' }} />
          {foodInfo && (
            <div>
              <h2>Food Information</h2>
              <ul>
                {foodInfo.foods.map((food, index) => (
                  <li key={index}>{food.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUploader;
