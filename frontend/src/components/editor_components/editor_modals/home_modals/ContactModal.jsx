import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';

const ContactModal = ({ isOpen, onClose }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    title: "",
    subtitle: "",
    bgColor: "",
    textColor: "",
    divsBgColor: "",
    divsTextColor: "",
    card1: {
      icon: "",
      title: "",
      description: ""
    },
    card2: {
      icon: "",
      title: "",
      description: ""
    }
  });

  useEffect(() => {
    fetch(`${apiUrl}/home/contact/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setData({ ...data, [field]: value });
  };

  const handleCardChange = (card, field, value) => {
    setData({
      ...data,
      [card]: {
        ...data[card],
        [field]: value,
      },
    });
  };

  const handleColorChange = (colorField, value) => {
    setData({ ...data, [colorField]: value });
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (card) => (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setData({
          ...data,
          [card]: {
            ...data[card],
            icon: base64String,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiUrl}/home/contact/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Data updated successfully");
        onClose();
      } else {
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box w-full max-w-lg relative">
        <button onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>

        <h3 className="font-bold text-lg mb-4">Edit Contact Information</h3>

        <div className="mb-4">
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Subtitle</label>
          <textarea
            value={data.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Subtitle"
          />
        </div>

        {/* Card 1 */}
        <div className="mb-4">
          <label className="block mb-1">Card 1 Icon</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload('card1')}
            className="file-input file-input-bordered w-full"
          />
          {data.card1.icon && <img src={`data:image/png;base64,${data.card1.icon}`} alt="Card 1 Icon" className="w-16 h-16 mt-2" />}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 1 Title</label>
          <input
            type="text"
            value={data.card1.title}
            onChange={(e) => handleCardChange('card1', 'title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Card 1 Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 1 Description</label>
          <textarea
            value={data.card1.description}
            onChange={(e) => handleCardChange('card1', 'description', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Card 1 Description"
          />
        </div>

        {/* Card 2 */}
        <div className="mb-4">
          <label className="block mb-1">Card 2 Icon</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload('card2')}
            className="file-input file-input-bordered w-full"
          />
          {data.card2.icon && <img src={`data:image/png;base64,${data.card2.icon}`} alt="Card 2 Icon" className="w-16 h-16 mt-2" />}
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 2 Title</label>
          <input
            type="text"
            value={data.card2.title}
            onChange={(e) => handleCardChange('card2', 'title', e.target.value)}
            className="input input-bordered w-full"
            placeholder="Card 2 Title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Card 2 Description</label>
          <textarea
            value={data.card2.description}
            onChange={(e) => handleCardChange('card2', 'description', e.target.value)}
            className="textarea textarea-bordered w-full"
            placeholder="Card 2 Description"
          />
        </div>

        <button onClick={handleSubmit} className="btn btn-success text-white">Submit</button>
      </div>
    </dialog>
  );
};

export default ContactModal;
